import ora from 'ora'
import QCloud from 'qcloudapi-sdk'
import { Service, VpsInstance } from '../core'
import { QCloudVpsInstance } from './instance'

export class QCloudService extends Service {

  static create(options: any): QCloudService {
    return new QCloudService(options.secretId, options.secretKey)
  }

  api: any
  constructor(secretId: string, secretKey: string) {
    super()
    this.api = new QCloud({
      SecretId: secretId,
      SecretKey: secretKey,
      serviceType: 'cvm',
    })
  }

  async request(data: any, opts?: any, extra?: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this.api.request(data, opts, (e: Error, body: any) => {
        if (e) {
          return reject(e)
        }
        resolve(body)
      }, extra)
    })
  }

  async getAllVps(): Promise<VpsInstance[]> {
    const spinner = ora('start fetch vpses from qcloud')
    spinner.start()
    const regions = await this.getAllRegion()
    const vpsesGroup = []
    for (const region of regions) {
      spinner.text = `fetch vpses within region ${region.regionName}`
      vpsesGroup.push(await this.getVpsWithRegion(region.regionCode))
    }
    const result: VpsInstance[] = []
    for (const vpses of vpsesGroup) {
      result.push(...vpses)
    }
    spinner.succeed('fetch vpses from qcloud')
    return result
  }

  async getVpsWithRegion(region: string): Promise<VpsInstance[]> {
    const vpses = await this.request({
      Action: 'DescribeInstances',
      Region: region,
      Version: '2017-03-12',
    })

    if (!vpses.Response.Error) {
      vpses.Response.InstanceSet.forEach((v: any) => {
        v.Placement.Region = region
      })
      return vpses.Response.InstanceSet.map((vps: any) => new QCloudVpsInstance(vps))
    }

    return []
  }

  async getAllRegion(): Promise<any[]> {
    const region = await this.request({
      Action: 'DescribeRegions',
      Region: 'gz', // 奇葩的 API，说是不需要写地域，其实还是要写
    })

    return region.regionSet
  }
}
