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
        console.log(x,y)
        f.format.forEach((line,i) => {
            for (let w = 0; w< line.length;w++ ) {
                console.log(f[line[w]],(x+w-Math.floor(line.length/2)),y+i-f.format.length+1)
                Level.setBlock(f[line[w]],(x+w-Math.floor(line.length/2)),y+i-f.format.length+1)
                //Level.setBlock(f[line[w],x+w,y+i])
            }
        })
    }
    static create(x,y) {
        Tree.makeFormation(this.treeFormations[0],x,y)

    }
}