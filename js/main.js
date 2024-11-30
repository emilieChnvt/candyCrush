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
            let randomColor = Math.floor(Math.random()*candyColors.length);
            square.style.backgroundColor = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(squares)
        }

    }
    createBoard()
})
