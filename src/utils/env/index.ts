import { IEnv } from './types'
import  developEnv from './develop'
import  prodEnv from './prod'

export const env = () => {

  let currentEnv: IEnv;

  const mode = developEnv["MODE"];

  if ( mode === 'prod' )
    currentEnv = prodEnv;
  else
    currentEnv = developEnv;

  return currentEnv;

}