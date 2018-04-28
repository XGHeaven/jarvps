import { VpsInstance } from '../core'

export class QCloudVpsInstance implements VpsInstance {
  readonly publicIp: string
  readonly privateIp: string
  readonly hostname: string
  readonly service: string = 'qcloud'
  readonly id: string
  readonly region: string
  readonly zone: string
  readonly cpu: number
  readonly memory: number
  readonly status: string

  constructor(raw: any) {
    this.publicIp = raw.PublicIpAddresses[0]
    this.privateIp = raw.PrivateIpAddresses[0]
    this.hostname = raw.InstanceName
    this.id = raw.InstanceId
    this.region = raw.Placement.Region
    this.zone = raw.Placement.Zone
    this.cpu = raw.CPU
    this.memory = raw.Memory * 1024
    this.status = 'unknown'
  }
}
