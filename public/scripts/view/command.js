import { getBlockList } from "../block/blockHandler.js"
import { Mouse } from "../input/mouse.js"
import { Level } from "../level.js"
import { User } from "../user.js"

export class Command {
    static commands = [
        ["/give","player","id","amount"],
        ["/setblock", "id", "blockX","blockY"],
        ["/teleport","player","x","y"],
        ["/fill","id","blockX","blockY","blockX","blockY"]
    ]
    static teleport(player,x,y) {
        player = User.player
        player.x = Number.parseInt(x)
        player.y = Number.parseInt(y)
    }
    static give(player,id,amount) {
        if (!amount) {amount=1}
        User.addItem(id,Number.parseInt(amount))
    }
    static fill(id,x1,y1,x2,y2) {
        Level.fill(id,x1,y1,x2,y2)
    }
    static setBlock(id,x,y) {
        Level.setBlock(id,x,y)
    }
    static searchCommand(cmd) {
        let full_command = cmd.split(" ")
        let command = full_command[0]

        if (command==="/give") {
            Command.give(full_command[1],full_command[2],full_command[3])
        } else if (command==="/setblock") {
            Command.setBlock(full_command[1],full_command[2], full_command[3])
        } else if (command==="/teleport") {
            Command.teleport(full_command[1],full_command[2], full_command[3])
        } else if (command==="/fill") {
            Command.fill(full_command[1],full_command[2], full_command[3],full_command[4],full_command[5])
        }
    }
    static apply(cmd) {
        this.searchCommand(cmd)
    }
    static hint(cmd) {
        let command = cmd.split(" ")
        let l = command.length-1
        let hints = []
        for (let c in this.commands) {
            let testCommand = true
            for (let i = 0 ; i < c.length ; i++) {

                if (!this.commands[c][i].includes(command[i])) {
                   testCommand = false
                }
            }
            if (testCommand) {
                 if (this.commands[c][l].includes(command[l])) {
                    if (this.commands[c][l] === "id") {
                        hints.push(...getBlockList())
                    } else if (this.commands[c][l] === "x"){
                        hints.push(Mouse.x)
                    } else if (this.commands[c][l] === "y") {
                        hints.push(Mouse.y)
                    } else if (this.commands[c][l] === "blockX"){
                        hints.push(Level.getBlockOnCoords(Mouse.x,Mouse.y).worldX)
                    } else if (this.commands[c][l] === "blockY") {
                        hints.push(Level.getBlockOnCoords(Mouse.x,Mouse.y).worldY)
                    } else {
                        hints.push(this.commands[c][l])
                    }
                }
            }
        }
        return hints
    }

}