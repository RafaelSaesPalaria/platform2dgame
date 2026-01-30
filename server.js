import express from "express"
import http from "http"
import { Server } from "socket.io"
import ejs from "ejs"
import path from "path"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const server = http.createServer(app)
const ip = 3000
const io = new Server(server)



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (req,res) => {
    res.render('index.html')
})

let sockets = []
io.on("connection", socket => {
    sockets.push(socket)
    console.log("Socket connected")

    socket.on("draw", (data) => {
        console.log(data)
        sockets.forEach(s => {
            if (s != socket) {
                s.emit("update",data)
            }
        })
    })
})

server.listen(ip, () => {
    console.log("Server opened at port "+ip)
})