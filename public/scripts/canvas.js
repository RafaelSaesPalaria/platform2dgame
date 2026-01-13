import { addColor, getUI } from "./ui.js";

let canvas = document.querySelector("canvas");

let c = canvas.getContext("2d")

let colors_input = document.querySelector("#colors_input")

colors_input.addEventListener("input",(e) => {
    setCurrentlyColor(e.target.value)
    getUI("colorsUI").currentlyColorChange()
})

colors_input.addEventListener("change",(e) => {
    addColor(e.target.value)
})

let currentlyColor = "black"

export function setCurrentlyColor(c)  {
    currentlyColor = c
}

export function getCurrentlyColor() {
    return currentlyColor
}

export function resize() {
    canvas.width = 785;
    canvas.height = 515;
}

export function draw(x,y,color) {
    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,5,5)
    c.closePath()
}

export function drawRect(x,y,w,h,color) {
    c.beginPath()
    c.fillStyle = color
    c.fillRect(x,y,w,h)
    c.closePath()
}

export function erase() {
    c.fillRect(0,0,canvas.width,canvas.height)
}