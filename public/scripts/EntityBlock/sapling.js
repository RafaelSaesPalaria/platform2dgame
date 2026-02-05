import { EntityBlock } from "./components.js"

export class Sapling extends EntityBlock {
    constructor(c,id,x,y) {
        super(id,x,y)
        this.c = c
        this.timeLeft = 200
    }
    update() {
        this.timeLeft-=1
        if (this.timeLeft<0) {
            Tree.create(this.c,this.x,this.y)
            this.c.removeEntity(this)
        }
    }
}

class Tree {
    static treeFormations=[
        {'format':['###',
          '#####',
            '#X#',
              'X',
              'X',
              'X',
              'X'
        ],'X':'log','#':'leaves'}
    ]
    static makeFormation(f,c,x,y) {
        f.format.forEach((line,i) => {
            for (let w = 0; w< line.length;w++ ) {
                c.setBlock(f[line[w]],(x+w-Math.floor(line.length/2)),y+i-f.format.length+1)
            }
        })
    }
    static create(c,x,y) {
        Tree.makeFormation(this.treeFormations[0],c,x,y)

    }
}