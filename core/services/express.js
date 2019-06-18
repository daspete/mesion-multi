import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'

export default (config) => {
    const app = express()

    app.use(helmet())
    app.use(cors(config.cors))
    app.use(compression())
    app.use(morgan(config.express.logFormat))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    return app
}