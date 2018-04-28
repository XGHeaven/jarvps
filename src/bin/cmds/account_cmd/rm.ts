import { CommandModule } from 'yargs'
import { doActionForJarVps } from '../../utils'

const commandModule: CommandModule = {
  command: 'rm',
  describe: 'Remove account',
  handler: argv => {
    doActionForJarVps(argv, 'removeAccount')
  },
}

export default commandModule
