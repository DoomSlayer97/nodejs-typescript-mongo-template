export type EnvModeTypes = "dev" | "prod"

export interface IEnv {
  MODE: EnvModeTypes;
  PORT: string;
  JWT_KEY: string;
}