import { draw, resize } from "./scripts/canvas.js";
import { onMessage, startSocket } from "./scripts/client.js";
import { addMouse } from "./scripts/inputHandler.js";
import { init } from "./scripts/level.js";
import { initUIs } from "./scripts/ui.js";

startSocket()
resize()
addMouse()
initUIs()
//let canvas = document.

onMessage((event,data) => {
    if (event === "update") {
        console.log(data.color)
        draw(data.x,data.y,data.color)
    }
})

init()