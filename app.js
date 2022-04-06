import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { init, cleanup } from './whatsapp.js'

import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')
import handleSocket from './services/socket.js';

const app = express()

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection',handleSocket);

const host = process.env.HOST ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? 8000)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

httpServer.listen(port, host, () => {
    init()
    console.log(`Server is listening on http://${host}:${port}`)
})

nodeCleanup(cleanup)

export default app
