var origBoard;
var huPLayer;
var aiPlayer;
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const cells = $(".buttons");
function startGame(){
    $(".choice").css("display","none");
    $(".play").css("display","flex");
    origBoard = [0,1,2,3,4,5,6,7,8];
    //console.log(origBoard);
    for(var i in origBoard){
        cells[i].innerText = "";
        cells[i].addEventListener('click',turnClick,false);
    }
}
//-------------------------------------------------------
function turnClick(cell) {
    //console.log(cell.target.id);
    turn(cell.target.id,huPLayer);
}
//-------------------------------------------------------
function turn(cellid ,player){
    origBoard[cellid]=player;
    cells[cellid].innerText = player;
    var winner = checkWinner(origBoard,player);
    if (winner) gameOver(winner);
}
//-------------------------------------------------------
//------------------determine who win--------------------
//-------------------------------------------------------
function checkWinner() {
    
}
//-------------------------------------------------------------------------------------------------------
$(document).ready(function(){
    $("button").on("click",function(){
        if(this.id=="x") {huPLayer="x",aiPlayer="o";}
        else {huPLayer="o";aiPlayer="x";}
        startGame();
    });
});