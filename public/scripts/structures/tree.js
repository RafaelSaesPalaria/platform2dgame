import { Level } from "../level.js"

export class Tree {
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
    static makeFormation(f,x,y) {
        f.format.forEach((line,i) => {
            for (let w = 0; w< line.length;w++ ) {
                let id = f[line[w]]
                let blockX = (x+w-Math.floor(line.length/2))
                let blockY = y+i-f.format.length+1
                Level.setBlock(id,blockX,blockY)
            }
        })
    }
    static create(x,y) {
        Tree.makeFormation(this.treeFormations[0],x,y)

    }
}