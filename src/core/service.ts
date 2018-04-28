import { VpsInstance } from './vps-instance'

export abstract class Service {
    abstract async getAllVps(): Promise<VpsInstance[]>
}
