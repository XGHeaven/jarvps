"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AliyunVpsInstance {
    constructor(raw) {
        this.service = 'aliyun';
        this.publicIp = raw.PublicIpAddress.IpAddress[0];
        this.privateIp = raw.VpcAttributes.PrivateIpAddress.IpAddress[0];
        this.hostname = raw.HostName;
        this.id = raw.InstanceId;
        this.region = raw.RegionId;
        this.zone = raw.ZoneId;
        this.cpu = raw.Cpu;
        this.memory = raw.Memory;
        this.status = raw.Status;
    }
}
exports.AliyunVpsInstance = AliyunVpsInstance;
