import http from 'http'
import { Nuxt, Builder } from 'nuxt'
import cache from 'express-cache-headers'

import express from '~~core/services/express'
import mongoose from '~~core/services/mongoose'
import socketio from '~~core/services/socketio'

import expressConfig from '~~stacks/admin/config/express'
import corsConfig from '~~stacks/admin/config/cors'
import clientConfig from '~~stacks/admin/config/client'
import mongooseConfig from '~~shared/config/mongoose'

import sockets from '~~stacks/api/sockets'

mongoose(mongooseConfig)

const app = express({
    express: expressConfig,
    cors: corsConfig
})

clientConfig.dev = !(process.env.NODE_ENV == 'production')


const StartServer = async () => {
    const nuxt = new Nuxt(clientConfig)

    const builder = new Builder(nuxt)
    await builder.build()

    app.use(cache({
        ttl: 10,
        nocache: true,
        mustrevalidate: true
    }))

    app.use(nuxt.render)

    const server = http.createServer(app)
    const io = socketio({
        server,
        sockets
    })

    server.listen(expressConfig.port, expressConfig.ip, () => {
        console.log(`ADMIN stack is listening on ${ expressConfig.ip }:${ expressConfig.port }`)
    })
}

StartServer()

