import { CommandModule } from 'yargs'
import { doActionForJarVps } from '../../utils'

const commandModule: CommandModule = {
  command: 'fetch',
  describe: 'Fetch Vps',
  builder: yargs => yargs,
  handler: argv => {
    doActionForJarVps(argv, 'refetchVpses')
  },
}

export default commandModule
