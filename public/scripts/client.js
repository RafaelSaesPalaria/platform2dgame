var socket
let messageHandler = null

let url = window.location.href.split("//")[1]
url = (url.split(":"))

let host = url[0]
let port = url[1].split("/")[0]

export function startSocket() {
    if (typeof window === "undefined") {}
    socket = io("http://"+host+":"+port)

    socket.on("start-info", (data) => {
        if (messageHandler) messageHandler("start",data)
    })

    socket.on("update", (data) => {
        if (messageHandler) messageHandler("update",data)
    })

    socket.on("disconned",(reason) => {
        console.log(reason)
    })
}

export function onMessage(handler) {
    messageHandler = handler
}

export function emit(event,data) {
    if (socket) {
        socket.emit(event,data)
    }
}

