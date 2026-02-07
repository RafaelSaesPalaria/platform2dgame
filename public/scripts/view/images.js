import { getObj } from "../block/blockHandler.js"
import { Level } from "../level.js"

export class Images {
    static defaultRepository = '../../res/'
    static imgs = []
    static use(id) {
        if (!this.has(id)) {
            this.create(id)
        }
        return this.get(id)
    }
    static get(id) {
        return this.imgs.find(i => i.id === id)?.img
    }
    static has(id) {
        return this.imgs.some(i => i.id === id)
    }
    static create(id) {
        if (!this.has(id)) {
            let img = new Image(Level.blockSize,Level.blockSize)
            img.src = Images.defaultRepository + getObj(id).src
            this.imgs.push({id,img})
        }
    }
}