import * as os from 'os'
import * as path from 'path'
import * as yargs from 'yargs'
import { CommandDirOptions } from './utils'

export function start() {
  yargs
  .command('a', 'sss')
  .commandDir('cmds', CommandDirOptions)
  .option('config', {
    default: path.join(os.homedir(), '.jarvps.yaml'),
    describe: 'config path',
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .parse()
}

if (require.main === module) {
  start()
}
