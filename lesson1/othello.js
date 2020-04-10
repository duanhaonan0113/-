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

let directions = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [1, 0],
    [-1, 0],
    [-1, -1],
    [-1, 1]
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

function canMoveState (x, y, isCheck = false) {
    if (board[x][y]) {
        return false
    }
    let ox = x
    let oy = y
    let canMove = false
    for (let direction of directions) {
        let curDirection = false
        let hasOpposite = false
        x = ox
        y = oy
        while(true) {
            x += direction[0]
            y += direction[1]
            if (x < 0 || x > 7 || y < 0 || y > 7) {
                break
            }
            if (board[x][y] === 3 - color) {
                hasOpposite = true
            }
            if (board[x][y] === color) {
                if (hasOpposite) {
                    curDirection = true
                }
                break
            }
            if (board[x][y] === 0) {
                break
            }
        }
        if (curDirection) {
            canMove = true
            while(true && !isCheck) {
                x -= direction[0]
                y -= direction[1]
                board[x][y] = color
                if (x === ox && y === oy) {
                    break
                }
            }
        }
    }
    if (canMove && !isCheck) {
        render()
        color = 3 - color
    }
    return canMove
}

function addClickEvent (element, x, y) {
    element.addEventListener('click', (event) => {
        canMoveState(x, y)
        if (!checkChess()) {
            color = 3 - color
        }
    })
}

function checkChess () {
    for (let x = 0;  x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (canMoveState(x, y, true)) {
                return true
            }
        }
    }
    return false
}