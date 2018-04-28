import { VpsInstance } from './vps-instance';
export declare abstract class Service {
    abstract getAllVps(): Promise<VpsInstance[]>;
}
