let board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

let container = document.getElementById('container')
render()

function render () {
    container.innerHTML = ''
    drawBoard()
}

let color = 1
function drawBoard () {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let chessItem = document.createElement('div')
            addClickEvent(chessItem, x, y)
            chessItem.className = 'item'
            chessItem.className = `item ${board[x][y] === 1 ? "black" : "" }  ${board[x][y] === 2 ? "white" : "" }`
            container.appendChild(chessItem)
        }
        container.appendChild(document.createElement('br'))
    }
}

function addClickEvent (element, x, y) {
    element.addEventListener('click', (event) => {
        /* console.log(x, y) */
        if (!board[x][y]) {
            board[x][y] = color
        }
        let ox = x
        let oy = y
        let hasOpposite = false
        let canHandler = false
        while(--y >= 0) {
            if (board[x][y] ===  3 - color) {
                hasOpposite = true
            }
            if (board[x][y] === color && hasOpposite) {
                canHandler = true
                break
            }
            if (!board[x][y]) {
                break
            }
        }
        if (canHandler) {
            while(++y != oy) {
                board[x][y] = color
            }
        }
        render()
        color = 3 - color
    })
}