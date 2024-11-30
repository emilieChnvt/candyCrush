//DOMContentLoaded when the HTML document has been completely parsed.
document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector(".grid");
    const width = 8;
    const squares = []


const candyColors = [
    'red',
    'green',
    'blue',
    'purple',
    'pink',
    'yellow',

]
    function createBoard(){
        for(let i = 0; i < width*width ; i++){
            const square = document.createElement("div");
            square.setAttribute("draggable", "true"); //pour déplacer les carrés
            square.setAttribute("id", i);
            let randomColor = Math.floor(Math.random()*candyColors.length);
            square.style.backgroundColor = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(squares)
        }

    }
    createBoard()

    //Drag the candies
    squares.forEach(square => square.addEventListener("dragdtart", dragStart));
    squares.forEach(square => square.addEventListener("dragend", dragEnd));
    squares.forEach(square => square.addEventListener("dragover", dragOver));
    squares.forEach(square => square.addEventListener("dragenter", dragLeave));
    squares.forEach(square => square.addEventListener("dragdrop", dragDrop);
})

