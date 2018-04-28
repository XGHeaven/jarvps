import { spawn } from 'child_process'

export function sshConnect(ip: string, user: string = 'root') {
  const child = spawn('ssh', [`${user}@${ip}`], {
    stdio: 'inherit',
  })

  child.on('error', console.error)
  child.on('exit', console.log)
}
