import { CommandModule } from 'yargs'
import { doActionForJarVps } from '../../utils'

const commandModule: CommandModule = {
  command: 'ls',
  describe: 'List All Vpses',
  builder: yargs => yargs
    .alias('s', 'include-ssh-config')
    .describe('include-ssh-config', 'include ssh config')
    .boolean('s'),
  handler: argv => doActionForJarVps(argv, 'listVpses', argv.s),
}

export default commandModule
