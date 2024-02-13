import swaggerJSDoc from 'swagger-jsdoc'
import { cwd } from '../utils/cwd.js'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NCStore',
      version: '1.0.0',
      description: 'API Docs for NC Store'
    }
  },
  apis: [`${cwd}/src/docs/*.yaml`]
}

export const swaggerSetup = swaggerJSDoc(options)
