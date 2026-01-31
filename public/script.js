import { loadBlocks } from "./scripts/block/blockHandler.js";
import { draw, resize } from "./scripts/canvas.js";
import { onMessage, startSocket } from "./scripts/client.js";
import { addKeys, addMouse } from "./scripts/inputHandler.js";
import { init } from "./scripts/level.js";
import { initUIs } from "./scripts/ui.js";

startSocket()
resize()
addKeys()
addMouse()
initUIs()
loadBlocks()
//let canvas = document.

onMessage((event,data) => {
    if (event === "update") {
        console.log(data.color)
        draw(data.x,data.y,data.color)
    }
})

init()