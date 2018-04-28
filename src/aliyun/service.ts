import Aliyun from '@alicloud/pop-core'
import ora from 'ora'
import { Service } from '../core/service'
import { VpsInstance } from '../core/vps-instance'
import { AliyunVpsInstance } from './instance'

export class AliyunService extends Service {

  static create(options: any): AliyunService {
    return new AliyunService(options.accessKey, options.accessSecret)
  }

  client: Aliyun

  constructor(accessKey: string, accessSecret: string) {
    super()
    this.client = new Aliyun({
      accessKeyId: accessKey,
      apiVersion: '2014-05-26',
      endpoint: 'http://ecs.aliyuncs.com',
      secretAccessKey: accessSecret,
    })
  }

  async getAllVps(): Promise<VpsInstance[]> {
    const spinner = ora('fetch vpses from aliyun')
    spinner.start()
    const regions = await this.getAllRegion()
    const vpsesGroup =  []
    for (const region of regions) {
      spinner.text = `fetch vpses within ${region.LocalName}`
      vpsesGroup.push(await this.getVpsWithRegion(region.RegionId))
    }
    spinner.succeed('fetch vpses from aliyun')
    return [].concat(...vpsesGroup.map((vpses: any) => vpses.map((vps: any) => new AliyunVpsInstance(vps))))
  }

  async getVpsWithRegion(region: string): Promise<any[]> {
    const vpses = await this.client.request('DescribeInstances', {
      RegionId: region,
    }, {})
    return vpses.Instances.Instance
  }

  async getAllRegion(): Promise<any[]> {
    const region = await this.client.request('DescribeRegions', {}, {})
    return region.Regions.Region
  }
}
