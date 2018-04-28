import Aliyun from '@alicloud/pop-core';
import { Service } from '../core/service';
import { VpsInstance } from '../core/vps-instance';
export declare class AliyunService extends Service {
    static create(options: any): AliyunService;
    client: Aliyun;
    constructor(accessKey: string, accessSecret: string);
    getAllVps(): Promise<VpsInstance[]>;
    getVpsWithRegion(region: string): Promise<any[]>;
    getAllRegion(): Promise<any[]>;
}
