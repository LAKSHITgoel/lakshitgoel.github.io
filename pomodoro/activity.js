//---------------global varibles------------------
var sessionFlag = false;
var breakFlag = false;
var interval;
//-----------------update break length------------
function updateBL(btnid) {
  var str = $("#breakTime");
  // if minus is pressed then decrement only if break length is greater than zero
  if (btnid=="BLminus")
  {
    if (str.text()=="1") {return;}
    else
    {
      var strVal = Number(str.text().trim());
      strVal--;
      str.text(strVal);
    }
  }
  // press plus to inscement break length
  else
  {
    var strVal = Number(str.text().trim());
    strVal++;
    str.text(strVal);
  }
}
//-------------------update session length--------
function updateSL(btnid) {
  var str = $("#sessionTime");
  // if minus is pressed then decrement only if session length is greater than zero
  if (btnid=="SLminus")
  {
    if (str.text()=="1") return null;
    else
    {
      var strVal = Number(str.text().trim());
      strVal--;
      str.text(strVal);
    }
  }
  // press plus to inscement break length
  else
  {
    var strVal = Number(str.text().trim());
    strVal++;
    str.text(strVal);
  }
  updateTimer();
}
//------------------update timer when session length is updated--------------------------------
function updateTimer() {
    var str = $("#timer");
    var str2= $("#sessionTime").text();
    str.text(str2+" : 00");
}
//-------------------clock simulator-----------------------------
function countDown(time) {              // let time = 25
    var minutes = Number(time);
    interval = setInterval(function(){
      arr = $("#timer").text().split(":");
      var seconds = Number(arr[1]);
      seconds--;
      if (minutes < 0 && seconds < 0 ) return;
      else if (seconds <= 0 && minutes !=0){
        minutes--;
        seconds = 59;
      }
      else if (seconds < 10 && String(seconds).length !=2) {
          seconds = "0"+seconds;
          if ( minutes== 0 && seconds == 00) {
            clearInterval(interval);
              if(sessionFlag ==true&& breakFlag==false){
                sessionFlag = false;
                startBreak();
              }
              else if(sessionFlag==false&&breakFlag==true){
                breakFlag = false;
                startSession();
              }
          }
      }
      $("#timer").text(minutes+" : "+seconds);
      },1000);
}
//-------------------break-------------------------------
function startBreak(){
  breakFlag = true;
  $("#currentRoutine").text("Break!");
  var break_time = Number($("#breakTime").text());
  countDown(break_time);
}
//-------------------session-----------------------------
function startSession(){
  sessionFlag = true;
  $("#currentRoutine").text("Session");
  var arr = $("#sessionTime").text();
  var session_time = Number(arr);
  countDown(session_time);
}
//-------------------start-------------------------------
function start() {
  if (sessionFlag==false && breakFlag==false){
    sessionFlag = true;
    startSession();
  }
  else if (sessionFlag == false && breakFlag == true){
    sessionFlag = true;
    breakFlag = false;
    startBreak();
  }
$(".start").attr('disabled','true');
$(".plus").attr('disabled','true');
$(".minus").attr('disabled','true');
}
//---------------------reset-----------------------------
function reset(){
  $(".start").removeAttr('disabled');
  $(".minus").removeAttr('disabled');
  $(".plus").removeAttr('disabled');
  $("#breakTime").text("5");
  $("#sessionTime").text("25");
  $("#timer").text("25 : 00");
  $("#currentRoutine").text("Session");
  sessionFlag = false;
  breakFlag = false;
  clearInterval(interval);
}
//--------------------------------------------------
$(document).ready(function(){
  $("button").on("click",function(){
    var btnid = this.id;
    if(btnid=="BLminus"||btnid=="BLplus") updateBL(btnid);
    else if (btnid=="SLminus"||btnid=="SLplus") updateSL(btnid);
    else if (btnid=="reset") reset();
    else if (btnid=="start") start();

  });
});
