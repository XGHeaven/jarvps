import { Argv } from 'yargs'
import { CommandDirOptions } from '../utils'

export const command = 'vps'
export const describe = 'manage vps'
export const builder = (yargs: Argv) => {
  yargs.commandDir('vps_cmd', CommandDirOptions).demandCommand()
}
