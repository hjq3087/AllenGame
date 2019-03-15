const makeUniqueLine = function(n) {
    let arr = []
    while (arr.length < n) {
        let randomNumber = Math.floor(Math.random() * n)
        if (!arr.includes(randomNumber)) {
            arr.push(randomNumber)
        }
    }
    return arr
}

const compareOneArray = function(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) {
            return false
        }
    }
    return true
}
const compareArraysToArray = function(arrays, array) {
    for (let i = 0; i < arrays.length; i++) {
        if (!compareOneArray(arrays[i], array)) {
            return false
        }
    }
    return true
}

const makeUniqueSquare = function(n) {
    let arr = []
    while (arr.length < n) {
        let newLine = makeUniqueLine(n)
        if (compareArraysToArray(arr, newLine)) {
            arr.push(newLine)
        }
    }
    return arr
}

const imgTemplate = function(n) {
    let nToSrc = {
        0: 'imgs/小火龙.png',
        1: 'imgs/杰尼龟.png',
        2: 'imgs/妙蛙种子.png',
        3: 'imgs/皮卡丘.png',
        4: 'imgs/呆呆兽.png',
        5: 'imgs/可达鸭.png',
        6: 'imgs/鲤鱼王.png',
        7: 'imgs/瓦斯弹.png',
    }
    let src = nToSrc[n]
    let imgTemplate = `<img class="cell-img hide" src="${src}" alt="">`
    return imgTemplate
}

const cellTemplate = function(imgTemplate, index) {
    return `<div data-col="${index}" class="cell">${imgTemplate}</div>`
}

const rowTemplate = function(array, index) {
    let row = `<div data-row="${index}" class="row">`
    for (let i = 0; i < array.length; i++) {
        let img = imgTemplate(array[i])
        let cell = cellTemplate(img, i)
        row = row + cell
    }
    let suffix = `</div>`
    row = row + suffix
    return row
}


const drawRow = function(board, array, i) {
    let row = rowTemplate(array, i)
    appendHtml(board, row)
}

const drawSquare = function(board, arrays) {
    for (let i = 0; i < arrays.length; i++) {
        let row = arrays[i]
        drawRow(board, row, i)
    }
}

const bindButtonEvents = function() {
    let selector = '.buttons'
    let board = e('.board')
    bindAll(selector, 'click', function(event) {
        let self = event.target
        let n = self.innerHTML[0]
        if (board.innerHTML !== '') {
            board.innerHTML = ''
        }
        let s = makeUniqueSquare(n)
        drawSquare(board, s)
    })
}

const showAfterClicked = function(cell, img) {
    cell.classList.add('cell-clicked')
    img.classList.remove('hide')
}

const coverAfterChecked = function(lastCell, lastImg, currentCell, currentImg) {
    lastCell.classList.remove('cell-clicked')
    lastImg.classList.add('hide')
    currentCell.classList.remove('cell-clicked')
    currentImg.classList.add('hide')
}
const correctAfterChecked = function(lastCell, lastImg, currentCell, currentImg) {
    lastCell.classList.add('cell-correct')
    lastCell.classList.remove('cell-clicked')
    currentCell.classList.remove('cell-clicked')
    currentCell.classList.add('cell-correct')
}
const checkCell = function(cells, currentCell) {
    let cellRow = currentCell.closest('.row').dataset.row
    let cellCol = currentCell.dataset.col
    let firstCellRow = cells[0].closest('.row').dataset.row
    let firstCellCol = cells[0].dataset.col
    return cellRow === firstCellRow && cellCol === firstCellCol
}
const check = function(lastCell, currentCell, currentImg) {
    let lastImg = lastCell.querySelector('.cell-img')
    if (lastImg.src !== currentImg.src) {
        setTimeout(function() {
            coverAfterChecked(lastCell, lastImg, currentCell, currentImg)}, 1000)
    } else if (lastImg.src === currentImg.src) {
        setTimeout(function() {
            correctAfterChecked(lastCell, lastImg, currentCell, currentImg)}, 500)
    }
}

const bindCellEvents = function() {
    let board = e('.board')
    bindEvent(board, 'click', function(event) {

        let self = event.target
        let cellClicked = self.closest('.cell')
        let imgClicked = cellClicked.querySelector('.cell-img')

        showAfterClicked(cellClicked, imgClicked)

        let clickedCells = es('.cell-clicked')
        if (clickedCells.length > 1) {
            if (checkCell(clickedCells, cellClicked)) {
                let lastClickedCell = clickedCells[1]
                check(lastClickedCell, cellClicked, imgClicked)
            } else {
                let lastClickedCell = clickedCells[0]
                check(lastClickedCell, cellClicked, imgClicked)
            }
        }
    })
}

const bindEvents = function() {
    bindButtonEvents()
    bindCellEvents()
}

const __main = function() {
    bindEvents()
}

__main()
