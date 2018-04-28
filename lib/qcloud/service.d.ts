import { Service, VpsInstance } from '../core';
export declare class QCloudService extends Service {
    static create(options: any): QCloudService;
    api: any;
    constructor(secretId: string, secretKey: string);
    request(data: any, opts?: any, extra?: any): Promise<any>;
    getAllVps(): Promise<VpsInstance[]>;
    getVpsWithRegion(region: string): Promise<VpsInstance[]>;
    getAllRegion(): Promise<any[]>;
}
