import { getInputDirection } from "./input.js";


export const snakeSpeed = 5
const snakeBody = [{x: 11 , y: 11}]
let newSegments = 0


export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--)
    {
        snakeBody[i+1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}


export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}


export function expandSnake(amount){
    newSegments += amount
}

export function onSnake(position , {ingoreHead = false} = {}) {
    return snakeBody.some((segment , index)=> {
        if(ingoreHead && index === 0) return false
        return equalpositions(segment , position)
    })
}

export function getSnakeHead()
{
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ingoreHead:true})
}

function equalpositions(post1 , post2){
    return post1.x === post2.x && post1.y === post2.y
}


function addSegments() {
    for( let i = 0; i< newSegments ; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length-1]})
    }

    newSegments = 0
}