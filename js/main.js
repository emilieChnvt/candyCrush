//DOMContentLoaded when the HTML document has been completely parsed.
document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.querySelector("#score");
    const width = 8;
    const squares = []
    let score = 0;


    const candyColors = [
        'url(images/blue-candy.png)',
        'url(images/green-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',

    ]
    function createBoard(){
        for(let i = 0; i < width*width ; i++){
            const square = document.createElement("div");
            square.setAttribute("draggable", "true"); //pour déplacer les carrés
            square.setAttribute("id", i);
            let randomColor = Math.floor(Math.random()*candyColors.length);
            square.style.backgroundImage = candyColors[randomColor];
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
    colorBeingDragged = this.style.backgroundImage;
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
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }else
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;

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
    colorBeingReplaced = this.style.backgroundImage;
    this.style.backgroundImage = colorBeingDragged;
    squareIdBeingReplaced = parseInt(this.id)
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;

}



//mettre candies après que les cases aient matché
    function moveDown(){
        // i<55, pas la dernière ligne
        for(let i = 0; i < 55; i++){
            // case en dessous de celle actuelle
            if(squares[i + width].style.backgroundImage ===''){
                //couleur de la case actuelle est copiée dans celle en dessous et supprimée de l'actuelle
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage ='' ;
                const firstRow = [0,1,2,3,4,5,6,7];
                const isFirstRow = firstRow.includes(i);
                if(isFirstRow && squares[i].style.backgroundImage ===''){
                    let randomColor = Math.floor(Math.random()*candyColors.length);
                    squares[i].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
    }

// checking for matches
//checking for row of three
    function checkRowForThree(){
        // i<61, after it's out of the grid
        for(let i = 0; i < 61 ; i++){
            let rowOfThree = [i, i+1, i+2];
            let decidedColor = squares[i].style.backgroundImage; //color of a square
            const isBlank = squares[i].style.backgroundImage === '';

            const notValidMove = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]; // cases qui ne peuvent pas être le point de départ

            if(notValidMove.includes(i))continue

            if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''; // quand il y a 3 carrées de la même couleur a côté ca supprime l couleur
                })
            }
        }
    }
    checkRowForThree()
//checking for column of three
    function checkColumnForThree(){
        // i<47  parce que ca donne [47,55,63] au niveau de l'index des carrés d'un colonne
        for(let i = 0; i < 47 ; i++){
            let columnOfThree = [i, i+width, i+width*2];
            let decidedColor = squares[i].style.backgroundImage; //color of a square
            const isBlank = squares[i].style.backgroundImage === '';


            if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=3;
                scoreDisplay.innerHTML = score;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''; // quand il y a 3 carrées de la même couleur a côté ca supprime l couleur
                })
            }
        }
    }
    checkColumnForThree()

    //checking for row of Four
    function checkRowForFour(){
        // i<61, after it's out of the grid
        for(let i = 0; i < 60 ; i++){
            let rowOfFour = [i, i+1, i+2, i+3];
            let decidedColor = squares[i].style.backgroundImage; //color of a square
            const isBlank = squares[i].style.backgroundImage === '';

            const notValidMove = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]; // cases qui ne peuvent pas être le point de départ

            if(notValidMove.includes(i))continue

            if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=4;
                scoreDisplay.innerHTML = score;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''; // quand il y a 3 carrées de la même couleur a côté ca supprime l couleur
                })
            }
        }
    }
    checkRowForFour()
//checking for column of Four
    function checkColumnForFour(){
        // i<47  parce que ca donne [47,55,63] au niveau de l'index des carrés d'un colonne
        for(let i = 0; i < 46 ; i++){
            let columnOfFour = [i, i+width, i+width*2, i+width*3];
            let decidedColor = squares[i].style.backgroundImage; //color of a square
            const isBlank = squares[i].style.backgroundImage === '';


            if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
                score +=3;
                scoreDisplay.innerHTML = score;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''; // quand il y a 3 carrées de la même couleur a côté ca supprime l couleur
                })
            }
        }
    }
    checkColumnForFour()

    window.setInterval(function (){
        moveDown();
        checkRowForFour();
        checkColumnForFour();
        checkRowForThree();
        checkColumnForThree();
    }, 20); //repete la fonction toutes les 20milisecondes
})