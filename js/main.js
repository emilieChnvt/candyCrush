//DOMContentLoaded when the HTML document has been completely parsed.
document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector(".grid");
    const width = 8;
    const squares = []
    let score = 0;


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


function dragStart(){
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged= parseInt(this.id)// to make sure it's a number
}
function dragEnd(){

//a valid move
    let validMoves= [
        squareIdBeingDragged -1,
        squareIdBeingDragged -width,
        squareIdBeingDragged +1,
        squareIdBeingDragged +width
    ]; // pour se déplacer d'une case en haut, en bas, à gauche, à droite et pas ailleurs

    let isValideMove = validMoves.includes(squareIdBeingReplaced)

    if(squareIdBeingReplaced && isValideMove){
        squareIdBeingReplaced = null;
    }else if(squareIdBeingReplaced && !isValideMove){
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }else
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;

}
function dragEnter(e){
    e.preventDefault();
}
function dragOver(e){
    e.preventDefault();
}
function dragLeave(e){

}
function dragDrop(){
    colorBeingReplaced = this.style.backgroundColor;
    this.style.backgroundColor = colorBeingDragged;
    squareIdBeingReplaced = parseInt(this.id)
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;

}

// checking for matches
//checkink for row of three
    function checkRowForThree(){
        // i<61, after it's out of the grid
        for(let i = 0; i < 61 ; i++){
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = squares[i].style.backgroundColor; //color of a square
            const isBlank = squares[i].style.backgroundColor === '';

            if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score +=3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''; // quand il y a 3 carrées de la même couleur a côté ca supprime l couleur
                })
            }
        }
    }
    checkRowForThree()

    function checkColumnForThree(){
        // i<47  parce que ca donne [47,55,63] au niveau de l'index des carrés d'un colonne
        for(let i = 0; i < 47 ; i++){
            let columnOfThree = [i, i+width, i+width*2];
            let decidedColor = squares[i].style.backgroundColor; //color of a square
            const isBlank = squares[i].style.backgroundColor === '';

            if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)){
                score +=3;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''; // quand il y a 3 carrées de la même couleur a côté ca supprime l couleur
                })
            }
        }
    }
    checkColumnForThree()

    window.setInterval(function (){
        checkRowForThree();
    }, 100); //repete la fonction toutes les 100milisecondes
})