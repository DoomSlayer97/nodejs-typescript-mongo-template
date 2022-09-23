import { EnvModeTypes, IEnv } from './types'

export default {
  MODE: !process.env["MODE"] 
    ? "dev" 
    : process.env["MODE"] as EnvModeTypes,
  PORT: process.env["PORT"],
  JWT_KEY: process.env["JWT_KEY"]
} as IEnv

