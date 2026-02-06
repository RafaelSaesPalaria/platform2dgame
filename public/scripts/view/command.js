import { getBlockList } from "../block/blockHandler.js"
import { Level } from "../level.js"
import { User } from "../user.js"

export class Command {
    static commands = [
        ["/give","player","id","amount"],
        ["/setblock", "id", "coordinate","coordinate"]
    ]
    static commandsList = [
        "/give","/atest","/ztest","/setblock","/teleport","/fill"
    ]
    static give(player,id,amount) {
        User.addItem(id,Number.parseInt(amount))
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
                    } else {
                        hints.push(this.commands[c][l])
                    }
                }
            }
        }
        return hints
    }

}