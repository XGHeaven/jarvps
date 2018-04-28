import { CommandModule } from 'yargs'
import { doActionForJarVps } from '../../utils'

const commandModule: CommandModule = {
  command: 'add <service>',
  describe: 'Add account',
  handler: argv => {
    switch (argv.service) {
      case 'aliyun':
      const accessKey = argv.accessKey
      const accessSecret = argv.accessSecret
      if (!accessKey || !accessSecret) {
        console.log('Error')
        return
      }
      doActionForJarVps(argv, 'addAccount', 'aliyun', {
        accessKey, accessSecret,
      })
      break
      case 'qcloud':
      const secretId = argv.secretId
      const secretKey = argv.secretKey
      if (!secretId || !secretKey) {
        console.log('Error qcloud')
        return
      }
      doActionForJarVps(argv, 'addAccount', 'qcloud', {
        secretId, secretKey,
      })
      break
      default:
      console.log(`Cannot support ${argv.service} service`)
      return
    }
  },
}

export default commandModule
