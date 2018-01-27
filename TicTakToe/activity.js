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
const playingCells = $(".buttons");
console.log(playingCells);
//------------------------------------------------------------------------------
function startGame(){
    $(".choice").css("display","none");
    $(".win").css("display","none");
    $(".loose").css("display","none");
    $(".draw").css("display","none");
    $(".play").css("display","flex");
    origBoard = [0,1,2,3,4,5,6,7,8];
    //console.log(origBoard);
    for(var i=0;i<origBoard.length;i++) {
        playingCells[i].innerText = "";
        playingCells[i].addEventListener('click',clickEventHandler);
    }
}
//------------------------------------------------------------------------------
function clickEventHandler(event) {
    //console.log(event.target.id);
    if(typeof origBoard[event.target.id] == 'number'){
        fillCell(event.target.id , huPLayer);
        if(!checkTie()) fillCell(bestSpot(),aiPlayer);
    }
}
//------------------------------------------------------------------------------
function fillCell(cellid,player) {
    playingCells[cellid].innerText = player;
    origBoard[cellid] = player;
    var gameWon = checkWinner(origBoard,player);
    console.log(gameWon);
    if (gameWon) gameOver(gameWon);
}
//------------------------------------------------------------------------------
function checkWinner(board, player){
    var gameWon = null;
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) return gameWon = {"player":player};
    else return false;
   }
//------------------------------------------------------------------------------
function declareWinner(who){
    if(who =="tie"){
        $(".choice").css("display","none");
        $(".win").css("display","none");
        $(".loose").css("display","none");
        $(".play").css("display","none");
        $(".draw").css("display","flex");
    }
    else if(who =="win"){
        $(".choice").css("display","none");
        $(".draw").css("display","none");
        $(".loose").css("display","none");
        $(".play").css("display","none");
        $(".win").css("display","flex");
    }
    else if(who =="loose"){
        $(".choice").css("display","none");
        $(".win").css("display","none");
        $(".draw").css("display","none");
        $(".play").css("display","none");
        $(".loose").css("display","flex");
    }
}
//------------------------------------------------------------------------------
function emptySpots(){
  var arr = [];
  for(var i=0;i<origBoard.length;i++){
    if(typeof origBoard[i] == 'number') arr.push(i);
  }
  return arr;
}
//------------------------------------------------------------------------------
function bestSpot(){
  return emptySpots()[0];
}
//------------------------------------------------------------------------------
function checkTie() {
  return emptySpots().length == 0 ? true : false;
}
//------------------------------------------------------------------------------
function gameOver(winner){
  for(var i=0;i<playingCells.length;i++){
    playingCells[i].removeEventListener('click',clickEventHandler);
  }
  declareWinner(winner.player==huPLayer?"win":"loose");
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
$(document).ready(function(){
    $("button").on("click",function(){
        if(this.id=="x") {huPLayer="x",aiPlayer="o";startGame();}
        else if (this.id =="o"){huPLayer="o";aiPlayer="x";startGame();}
        else if (this.id =="replay") {startGame();}

    });
});
