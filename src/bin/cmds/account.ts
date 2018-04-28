import { CommandModule } from 'yargs'
import { CommandDirOptions } from '../utils'

const  commandModule: CommandModule = {
  command: 'account',
  describe: 'manage account',
  builder: yargs => yargs.commandDir('account_cmd', CommandDirOptions).demandCommand(),
  handler: argv => argv,
}

export default commandModule
