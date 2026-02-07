import { Sappling } from "../EntityBlock/sappling.js"
import { Block } from "./block.js"
import { Chest } from "./chest.js"

let blocks = []
let uis = []

export function loadUIs() {
    fetch("./scripts/block/uis.json")
    .then(r => r.json())
        .then(r => {
        uis = r
    })
}

export function loadBlocks() {
    fetch("./scripts/block/blocks.json")
        .then(r => r.json())
        .then(r => {
        blocks = r
    })
}

export function getObj(id) {
    let ui = getUI(id)
    let block = getBlock(id)
    if (ui!==undefined) {
        console.log(ui)
        
        return ui
    } else if (block!==undefined    ) {
        return block
    }
}

export function getBlockList() {
    let list = []
    for (let block of blocks) {
        list.push(block.id)
    }
    return list
}

export function getUI(id) {
    for (let ui of uis) {
        if (ui.id === id) {
            return ui
        }
    }
}

export function getBlock(id) {
    for (let block of blocks) {
        if (block.id === id) {
            return block
        }
    }
}

let blockRegistry = {
    block: Block,
    sappling: Sappling,
    chest: Chest
}

export function getBlockRegistry() {
    return blockRegistry
}