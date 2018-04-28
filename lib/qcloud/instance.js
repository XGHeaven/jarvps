"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QCloudVpsInstance {
    constructor(raw) {
        this.service = 'qcloud';
        this.publicIp = raw.PublicIpAddresses[0];
        this.privateIp = raw.PrivateIpAddresses[0];
        this.hostname = raw.InstanceName;
        this.id = raw.InstanceId;
        this.region = raw.Placement.Region;
        this.zone = raw.Placement.Zone;
        this.cpu = raw.CPU;
        this.memory = raw.Memory * 1024;
        this.status = 'unknown';
    }
}
exports.QCloudVpsInstance = QCloudVpsInstance;
