let blocks = []

function loadBlocks() {
    fetch("./scripts/block/blocks.json")
        .then(r => r.json())
        .then(r => {
        blocks = r
    })
}

export function getBlock(id) {
    if (blocks.length<1) {
        loadBlocks()
    } else {
        for (let block of blocks) {
            if (block.id === id) {
                return block
            }
        }
    }
}