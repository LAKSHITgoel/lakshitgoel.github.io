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
//console.log(playingCells);
//------------------------------------------------------------------------------
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
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
        if(checkTie()) declareWinner("tie");
        else {
            fillCell(bestSpot(origBoard),aiPlayer);
        }
    }
}
//------------------------------------------------------------------------------
function fillCell(cellid,player) {
    playingCells[cellid].innerText = player;
    origBoard[cellid] = player;
    var gameWon = checkWinner(origBoard,player);
    //console.log(gameWon);
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
function emptySpots(board){
  var arr = [];
  for(var i=0;i<board.length;i++){
    if(typeof board[i] == 'number') arr.push(i);
  }
  return arr;
}
//------------------------------------------------------------------------------
function bestSpot(board){
    return minmax(board,aiPlayer).index;
}
//------------------------------------------------------------------------------
function checkTie() {
  return emptySpots(origBoard).length == 0 ? true : false;
}
//------------------------------------------------------------------------------
function gameOver(winner){
  for(var i=0;i<playingCells.length;i++){
    playingCells[i].removeEventListener('click',clickEventHandler);
  }
  declareWinner(winner.player==huPLayer?"win":"loose");
}
//-------------------------ai for tic tac toe-----------------------------------

function minmax(newBoard,player) {
  var availSpots = emptySpots(newBoard);
    if(checkWinner(newBoard,huPLayer)) return {score:-10};
    else if (checkWinner(newBoard,aiPlayer)) return{score:+10};
    else if (availSpots.length === 0 ) return {score:0};
    //an arrar to collect all the objects
    var moves = [];
    //loop through avail spots
    for(var i in availSpots){
        var move ={};
            move.index = newBoard[availSpots[i]];
            //set the emptty spot to the current player
            newBoard[availSpots[i]] = player;
            //collect the score resulted from calling minmax on the opponent of the player
            if(player == aiPlayer){
                var result = minmax(newBoard, huPLayer);
                move.score = result.score;
            }
            else{
                var result = minmax(newBoard, aiPlayer);
                move.score = result.score;
            }

            //reset the spot to empty
            newBoard[availSpots[i]] = move.index
            //push the objest to the array
            moves.push(move);
        }
            //if it is the computers's turn loop over the moves and chose the move with highest score
            var bestMove;
            if(player === aiPlayer){
                var bestScore = -10000;
                for(var i = 0; i < moves.length; i++){

                    if(moves[i].score > bestScore){
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
            else{
                // else loop over the moves and choose the move with the lowest score
                var bestScore = 10000;
                    for(var i = 0; i < moves.length; i++){
                        if(moves[i].score < bestScore){
                            bestScore = moves[i].score;
                            bestMove = i;
                        }
                    }
                }
          // return the chosen move (object) from the moves array
          return moves[bestMove];
    }
//------------------------------------------------------------------------------
$(document).ready(function(){
    $("button").on("click",function(){
        if(this.id=="x") {huPLayer="x",aiPlayer="o";startGame();}
        else if (this.id =="o"){huPLayer="o";aiPlayer="x";startGame();}
        else if (this.id =="replay") {startGame();}
        else if (this.id == "reset"){
            $(".choice").css("display","flex");
            $(".win").css("display","none");
            $(".draw").css("display","none");
            $(".play").css("display","none");
            $(".loose").css("display","none");
        }
    });
});
