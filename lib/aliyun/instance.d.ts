import { VpsInstance } from '../core/vps-instance';
export declare class AliyunVpsInstance implements VpsInstance {
    publicIp: string;
    privateIp: string;
    hostname: string;
    service: string;
    id: string;
    region: string;
    zone: string;
    cpu: number;
    memory: number;
    status: string;
    constructor(raw: any);
}
