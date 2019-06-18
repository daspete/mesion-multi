import http from 'http'

import express from '~~core/services/express'
import mongoose from '~~core/services/mongoose'
import socketio from '~~core/services/socketio'
import auth from '~~core/services/auth'

import expressConfig from '~~stacks/api/config/express'
import corsConfig from '~~stacks/api/config/cors'
import mongooseConfig from '~~shared/config/mongoose'
import authConfig from '~~shared/config/auth'

import sockets from '~~stacks/api/sockets'

import UserModel from '~~shared/models/user'

import routes from './routes'

mongoose(mongooseConfig)
auth(UserModel, authConfig)

const app = express({
    express: expressConfig,
    cors: corsConfig
})

app.use(routes)

const server = http.createServer(app)
const io = socketio({
    server,
    sockets
})

server.listen(expressConfig.port, expressConfig.ip, () => {
    console.log(`API stack is listening on ${ expressConfig.ip }:${ expressConfig.port }`)
})