import { CommandModule } from 'yargs'
import { doActionForJarVps } from '../../utils'

const commandModule: CommandModule = {
  command: 'ls',
  describe: 'List Accounts',
  builder: yargs => yargs,
  handler: argv => {
    doActionForJarVps(argv, 'listAccount')
  },
}

export default commandModule
