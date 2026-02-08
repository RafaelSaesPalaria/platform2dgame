import { checkCollision } from "../utils.js";

export class Button {
    constructor (x,y,w,h,action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.action = action;
    }
    checkClick(x,y) {
        if (checkCollision({x,y,w:1,h:1},this)) {
            this.click()
        }
    }
    click() {
        this.action();
    }
    draw() {

    }
}
export class UI {
    constructor (x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    click(x,y) {

    }
    update() {
        this.draw()
    }
    draw() {

    }
}