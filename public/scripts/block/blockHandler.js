let blocks = []

export function loadBlocks() {
    fetch("./scripts/block/blocks.json")
        .then(r => r.json())
        .then(r => {
        blocks = r
    })
}

export function getBlock(id) {
    for (let block of blocks) {
        if (block.id === id) {
            return block
        }
    }
}