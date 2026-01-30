const blockSize = 16
let chunkSize = 10

export class Chunk {
    constructor() {
        this.chunkId = 0
        this.dx = 0
        this.dy = 0
        this.rows = []
        for (let r = 0; r < chunkSize; r ++) {
            let line = []
            for (let l = 0; l < chunkSize; l++) {
                let b = new Block("dirt")
                line.push(b)
            }
            rows.push(line)
        }
    }
    update() {
        
    }
}

export class Block {
    constructor(id) {
        this.id = id;
    }

}