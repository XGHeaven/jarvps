import { VpsInstance } from '../core';
export declare class QCloudVpsInstance implements VpsInstance {
    readonly publicIp: string;
    readonly privateIp: string;
    readonly hostname: string;
    readonly service: string;
    readonly id: string;
    readonly region: string;
    readonly zone: string;
    readonly cpu: number;
    readonly memory: number;
    readonly status: string;
    constructor(raw: any);
}
