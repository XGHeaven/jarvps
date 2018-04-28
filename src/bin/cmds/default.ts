import { doActionForJarVps } from '../utils'

export const command = '*'
export const describe = 'enter jump server'
export const handler = (argv: any) => {
  doActionForJarVps(argv, 'jumpServer')
}
