import { VpsInstance } from '../core/vps-instance'

export class AliyunVpsInstance implements VpsInstance {
  publicIp: string
  privateIp: string
  hostname: string
  service: string = 'aliyun'
  id: string
  region: string
  zone: string
  cpu: number
  memory: number
  status: string

  constructor(raw: any) {
    this.publicIp = raw.PublicIpAddress.IpAddress[0]
    this.privateIp = raw.VpcAttributes.PrivateIpAddress.IpAddress[0]
    this.hostname = raw.HostName
    this.id = raw.InstanceId
    this.region = raw.RegionId
    this.zone = raw.ZoneId
    this.cpu = raw.Cpu
    this.memory = raw.Memory
    this.status = raw.Status
  }
}
