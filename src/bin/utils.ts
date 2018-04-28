import { create } from 'domain'
import * as os from 'os'
import * as path from 'path'
import * as logger from 'winston'
import { RequireDirectoryOptions } from 'yargs'
import { JarVps } from '../index'

const isTypescriptFile = __filename.endsWith('ts')

export const CommandDirOptions: RequireDirectoryOptions = {
  extensions: isTypescriptFile ? ['ts', 'js'] : ['js'],
  visit(commandObject) {
    if (commandObject.default) {
      commandObject = commandObject.default
    }

    if ('command' in commandObject) {
      return commandObject
    }
    return false
  },
}

export function createJarVps(argv: any) {
  const configPath = argv.config
  const options = {
    configPath,
  }

  return new JarVps(options)
}

export function doActionForJarVps(argv: any, action: keyof JarVps, ...args: any[]) {
  const jarvps = createJarVps(argv)
  const func = jarvps[action].bind(jarvps) as Function
  return Promise.resolve(func(...args)).catch(logger.error)
}
