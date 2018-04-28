/// <reference types="yargs" />
import { RequireDirectoryOptions } from 'yargs';
import { JarVps } from '../index';
export declare const CommandDirOptions: RequireDirectoryOptions;
export declare function createJarVps(argv: any): JarVps;
export declare function doActionForJarVps(argv: any, action: keyof JarVps, ...args: any[]): Promise<any>;
