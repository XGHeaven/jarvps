import Table from 'easy-table'
import { pathExistsSync, readFileSync, writeFileSync } from 'fs-extra'
import { prompt } from 'inquirer'
import { dump, load } from 'js-yaml'
import * as os from 'os'
import * as path from 'path'
import { pick } from 'ramda'
import sshConfig from 'ssh-config'
import * as logger from 'winston'
import { AliyunService } from './aliyun'
import { Service, VpsInstance } from './core'
import { QCloudService } from './qcloud'
import { sshConnect } from './ssh'

interface ServiceCreater {
  create(options: any): Service
}

const services: Map<string, ServiceCreater> = new Map()
services.set('aliyun', AliyunService)
services.set('qcloud', QCloudService)

export interface JarVpsOptions {
  configPath: string
}

export interface AccountConfig {
  service: string,
  [name: string]: any
}

export interface JarVpsConfig {
  vpses: VpsInstance[]
  accounts: AccountConfig[]
}

function AutoSave(target: object, key: string, desc: PropertyDescriptor) {
  const func = desc.value
  async function autoSaveHandle(this: JarVps, ...args: any[]) {
    const result = await func.apply(this, args)
    this.save()
    return result
  }
  desc.value = autoSaveHandle
  return desc
}

export class JarVps {
  private config: JarVpsConfig = {
    accounts: [],
    vpses: [],
  }
  constructor(private options: JarVpsOptions) {
    logger.info('use config file %s', options.configPath)
    if (pathExistsSync(this.options.configPath)) {
      const source = readFileSync(this.options.configPath, 'utf8')
      const data = load(source)
      if (!data) {
        logger.error('Cannot parse config file.')
        logger.error('Location: %s', options.configPath)
        logger.info('Use default config.')
      } else {
        this.config = data as JarVpsConfig
        this.save()
      }
    } else {
      this.save()
    }

    // TODO: validate config
  }

  @AutoSave
  addAccount(service: string, options: {}) {
    this.config.accounts = this.config.accounts || []
    this.config.accounts.push({
      ...options,
      service,
    })
  }

  listAccount() {
    console.log(Table.print(this.config.accounts.map(account => {
      const {service, ...config} = account
      return {service, config: JSON.stringify(config)}
    })))
  }

  @AutoSave
  removeAccount() {
    return prompt({
      type: 'checkbox',
      name: 'accounts',
      choices: this.config.accounts.map((account, index) => ({
        name: `${account.service}`,
        value: index,
      })),
      message: 'Please chose your account to remove',
    }).then((value: any) => {
      const accountsId = value.accounts as number[]
      this.config.accounts = this.config.accounts.filter((_, index) => !accountsId.includes(index))
      logger.info(`Please run "${process.argv[0]} vps fetch" to update vps list`)
    })
  }

  @AutoSave
  async refetchVpses() {
    const accounts = this.config.accounts
    const vpses: VpsInstance[] = []
    for (const account of accounts) {
      const serviceName = account.service
      const serviceCreater = services.get(serviceName)
      if (!serviceCreater) {
        console.log(`Cannot found ${serviceName} service`)
        continue
      }
      const service = serviceCreater.create(account)

      vpses.push(...await service.getAllVps())
    }
    this.config.vpses = vpses
    return vpses
  }

  listVpses(includeSshConfig: boolean = false) {
    const vpses = this.config.vpses || []
    const picker = pick(['id', 'service', 'hostname', 'publicIp', 'cpu', 'memory', 'status'])
    const datasource = vpses.map(picker)
    datasource.forEach((data: any, index: number) => {
      data.index = index
    })
    const sshConfigPath = path.join(os.homedir(), '.ssh', 'config')
    console.log('From Service')
    console.log(Table.print(datasource))
    const sshDatesource = []
    if (includeSshConfig && pathExistsSync(sshConfigPath)) {
      const configString = readFileSync(sshConfigPath, 'utf8')
      const config = sshConfig.parse(configString)
      console.log(config)
      for (const item of config) {
        if (item.param.toLowerCase() === 'host' && item.value !== '*') {
          const ssh = {
            id: item.value,
            user: 'root',
            address: 'unknown',
          }
          for (const line of item.config) {
            switch (line.param.toLowerCase()) {
              case 'hostname':
              ssh.address = line.value
              break
              case 'user':
              ssh.user = line.user
              break
            }
          }
          sshDatesource.push(ssh)
        } else {
          continue
        }
      }

      console.log()
      console.log('From SSH config')
      console.log(Table.print(sshDatesource))
    }
  }

  async jumpServer() {
    const vpses: VpsInstance[] = this.config.vpses
    prompt({
      type: 'list',
      name: 'id',
      choices: vpses.map(vps => ({
        name: `${vps.hostname ? vps.hostname : '[no hostname]'}(${vps.id}) - ${vps.publicIp} \tfrom: ${vps.service}`,
        value: vps.id,
      })),
      message: 'Please choice your vps',
    }).then((value: any) => {
      this.ssh(value.id)
    })
  }

  ssh(indexOrId: string | number) {
    let vps
    const vpses: VpsInstance[] = this.config.vpses
    if (typeof indexOrId === 'string') {
      vps = vpses.find(v => v.id === indexOrId)
    } else {
      vps = vpses[indexOrId]
    }
    if (!vps) {
      return console.log('out of bound')
    }

    sshConnect(vps.publicIp, 'root')
  }

  save() {
    writeFileSync(this.options.configPath, dump(this.config))
  }
}
