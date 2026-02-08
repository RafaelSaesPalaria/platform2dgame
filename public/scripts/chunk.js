import { getBlock, getBlockRegistry } from "./block/blockHandler.js"
import { checkCollision, getDistance } from "./utils.js"
import { Screen } from "./view/screen.js"
import { Camera } from "./view/camera.js"
import { Level } from "./level.js"
import { Block } from "./block/block.js"

export class GenerateChunk {
    static seed = 0
    static createSpace(x,y) {
        this.rows = []
        let chunkIndex = Math.floor(x/Level.chunkSize.w)
        for (let r = 0; r < Level.chunkSize.h; r ++) {
            let row = []
            for (let l = 0; l < Level.chunkSize.w; l++) {
                
                let b = new Block("air",l+chunkIndex,r)
                row.push(b)
            }
            this.rows.push(row)
        }
        return this.rows
    }
    static normal (chunk) {

    }
    static flatLand(x,y) {
        this.rows = this.createSpace(x,y)
        Chunk.forEachBlock(this,(b) => {
            if (b.worldY===100) {
                b.id = "grass"
            } else if (b.worldY>100 & b.worldY<=110) {
                b.id = "dirt"
            } else if (b.worldY>110) {
                b.id = "stone"
            }
        })
        return this.rows
    }
    static custom(chunk, ...settings) {

    }
}



export class Chunk {
    constructor(x,y) {
        this.x = x
        this.y = y
        this.w = Level.chunkSize.w*Level.blockSize
        this.h = Level.chunkSize.h*Level.blockSize
        this.count = 0
        this.rows = GenerateChunk.flatLand(x,y)
        this.entityBlocks = []
    }
    removeEntity(e) {
        this.entityBlocks = this.entityBlocks.filter(i => i!==e)
    }
    hasBlock(chunkX,chunkY) {
        if (this.rows.length>chunkY & chunkY>=0) {
            return (this.rows[chunkY].length>chunkX & chunkX>=0)
        }
    }
    setBlock(id,chunkX,chunkY) {
        let chunkIndex = Math.floor(this.x/(Level.chunkSize.w*Level.blockSize))

        let worldX = chunkX+(chunkIndex*Level.chunkSize.w)


        let registry = (getBlockRegistry()[id])
        if (!registry) {
            registry = Block
        }

        let b = new registry(id,worldX,chunkY)
        this.rows[chunkY][chunkX] = b       
    }
    // ChunkRelative Coords
    getBlock(chunkX,chunkY) {
        if (this.hasBlock(chunkX,chunkY)) {
            return this.rows[chunkY][chunkX]
        }
    }
    static forEachBlock(c, func) {
        c.rows.forEach(r => {
            r.forEach(b => {
                func(b)
            })
        })
    }
    // WorldCoords
    getBlockOnCoords(worldX,worldY) {
        let pos = getDistance({x:worldX,y:worldY},this)
        pos.x = Math.floor(pos.x/Level.blockSize)
        pos.y = Math.floor(pos.y/Level.blockSize)
        return this.getBlock(pos.x,pos.y)
    }
    update() {
       this.rows.forEach(r => {
            r.forEach(b => {
                b.update()
            })
        })
        //Velocity.apply(this)
        this.draw() 
    }
    draw() {
        Chunk.forEachBlock(this,b => {
            Screen.drawImage(b.id,b.worldX*Level.blockSize,b.worldY*Level.blockSize,Level.blockSize+1,Level.blockSize+1)
        })
        //Screen.drawHitbox(this.x,this.y,this.w,this.h)
    }
}