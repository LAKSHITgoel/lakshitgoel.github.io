//---------------global varibles------------------
var startFlag = false;
//-----------------update break length------------
function updateBL(btnid) {
  var str = $("#breakTime");
  // if minus is pressed then decrement only if break length is greater than zero
  if (btnid=="BLminus")
  {
    if (str.text()=="0") {return null;}
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
    if (str.text()=="0") return null;
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
  updateTimer(btnid);
}
//------------------update timer--------------------------------
function updateTimer(btnid){
  var str = $("#timer");
  if (btnid=="SLminus"){
    if (str.text()=="0") {return null;}
    else {
      var strVal = Number(str.text().trim());
      strVal--;
      str.text(strVal);
    }
  }
  else {
    var strVal = Number(str.text().trim());
    strVal++;
    str.text(strVal);
  }
}
//-------------------start or stop-------------------------------
function StartStop(){

}

//--------------------------------------------------
$(document).ready(function(){
  $("button").on("click",function(){
    var btnid = this.id;
    if(btnid=="BLminus"||btnid=="BLplus") updateBL(btnid);
    else if (btnid=="SLminus"||btnid=="SLplus") updateSL(btnid);
    else if (btnid=="control") StartStop();

  });
});
