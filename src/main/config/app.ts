import express from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middlewares'
import setupSwagger from './config-swagger'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
