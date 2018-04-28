import { VpsInstance } from './core';
export interface JarVpsOptions {
    configPath: string;
}
export interface AccountConfig {
    service: string;
    [name: string]: any;
}
export interface JarVpsConfig {
    vpses: VpsInstance[];
    accounts: AccountConfig[];
}
export declare class JarVps {
    private options;
    private config;
    constructor(options: JarVpsOptions);
    addAccount(service: string, options: {}): void;
    listAccount(): void;
    removeAccount(): Promise<void>;
    refetchVpses(): Promise<VpsInstance[]>;
    listVpses(includeSshConfig?: boolean): void;
    jumpServer(): Promise<void>;
    ssh(indexOrId: string | number): void;
    save(): void;
}
