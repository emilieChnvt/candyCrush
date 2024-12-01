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
            squares.push(square)
        }

    }
    createBoard()

    //Drag the candies

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;
    squares.forEach(square => square.addEventListener("dragstart", dragStart));
    squares.forEach(square => square.addEventListener("dragend", dragEnd));
    squares.forEach(square => square.addEventListener("dragover", dragOver));
    squares.forEach(square => square.addEventListener("dragenter", dragEnter));
    squares.forEach(square => square.addEventListener("drageleave", dragLeave));
    squares.forEach(square => square.addEventListener("drop", dragDrop))
})

function dragStart(){
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged= parseInt(this.id)
    console.log("drag", this.id);// to make sure it's a number
}
function dragEnd(){
    console.log("dryg", this.id);
}
function dragEnter(e){console.log("drig", this.id);
    e.preventDefault();
}
function dragOver(e){console.log("dreg", this.id);
    e.preventDefault();
}
function dragLeave(e){console.log("drug", this.id);

}
function dragDrop(){console.log("drog", this.id);
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id)
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
}