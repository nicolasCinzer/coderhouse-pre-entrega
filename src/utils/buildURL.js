import { server_url } from '../config/config.js'

export const buildURL = endpoint => {
  return `${server_url}/api${endpoint}`
}
