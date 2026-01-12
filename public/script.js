import { draw, resize } from "./scripts/canvas.js";
import { onMessage, startSocket } from "./scripts/client.js";
import { addMouse } from "./scripts/inputHandler.js";

startSocket()
resize()
addMouse()
//let canvas = document.

onMessage((event,data) => {
    if (event === "update") {
        console.log("update")
        draw(data.x,data.y)
    }
})