import { getRandomValues } from 'crypto'

export const createHash = () => getRandomValues(new BigUint64Array(1)).toString()
