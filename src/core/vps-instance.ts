export interface VpsInstance {
  readonly publicIp: string
  readonly privateIp: string
  readonly hostname: string
  readonly service: string
  readonly id: string
  readonly region: string
  readonly zone: string
  readonly cpu: number
  readonly memory: number // 单位是 M
  readonly status: string
}

export enum ServerStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
  RUNNING = 'running',
  STARTTING = 'starting',
  STOPPING = 'stopping',
}
