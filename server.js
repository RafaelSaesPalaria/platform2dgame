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

io.on("connection", socket => {
    console.log("Socket connected")
})

server.listen(ip)