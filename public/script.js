import { loadBlocks, loadUIs } from "./scripts/block/blockHandler.js";
import { onMessage, startSocket } from "./scripts/client.js";
import { addKeys, addMouse } from "./scripts/inputHandler.js";
import { init } from "./scripts/level.js";
import { initUIs } from "./scripts/view/ui.js";
import { Screen } from "./scripts/view/screen.js";

startSocket()
Screen.resize()
addKeys()
addMouse()
initUIs()
loadUIs()
loadBlocks()
//let canvas = document.

onMessage((event,data) => {
    if (event === "update") {
        console.log(data.color)
        //draw(data.x,data.y,data.color)
    }
})

init()

// worldX = coordenada relativa ao region
// chunkX= coordenada relativa ao chunk