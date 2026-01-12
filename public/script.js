import { resize } from "./scripts/canvas.js";
import { startSocket } from "./scripts/client.js";
import { addMouse } from "./scripts/inputHandler.js";

startSocket()
resize()
addMouse()
//let canvas = document.