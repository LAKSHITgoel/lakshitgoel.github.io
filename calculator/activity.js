var ans;
var equalsFlag = false;
function pressCE(){
  $("#status").html("0");
  $("#allCalc").html("0");
  equalsFlag = false;
}
//------------------------------------------------------------------
function isOperator(str) {
  if(str=="+"||str=="-"||str=="*"||str=="/"){
    return true;
  }
}
//------------------------------------------------------------------
function pressDEL(){
  var str = $("#status").text();
  var str2 = $("#allCalc").text();
  if(str=="0" && str2=="0") {$("#status").text("0");$("#allCalc").text("0");}
  else if (str.length==1&&str!="0"&&str2.length==1&&str2!="0") {$("#status").text("0");$("#allCalc").text("0");}
  else if (str.length==1&&str!="0"&&str2.length>1) { $("#status").text("0");$("#allCalc").text(str2.slice(0,-1));}
  else if (str.length==1&&str=="0"&&str2.length>1) {$("#status").text("0");$("#allCalc").text(str2.slice(0,-1));}
  else if (str=="0"&&str2.length==1&&str2!="0") { $("#status").text("0");$("#allCalc").text("0"); }
  else {
        $("#status").text(str.slice(0,str.length-1));
        $("#allCalc").text(str2.slice(0,str2.length-1));
       }
}
//-----------------------------------------------------------------
function pressOperator(btnVal){
  var str = $("#allCalc").text();
  var map = {"plus":"+",
             "divide":"/",
             "*":"*",
             "minus":"-"};
  if (equalsFlag){
      equalsFlag = false;
      var arr = str.split("=");
      $("#allCalc").text(arr[arr.length-1]+map[btnVal]);
      $("#status").text(map[btnVal]);
  }
  else{
      if (str==""||str=="0") alert("Please enter a value first");
      else if (isOperator(str[str.length-1])) alert("Syntax Error");
      else {
          putString(map[btnVal]);
          $("#status").text(map[btnVal]);
      }
  }

}
//-----------------------------------------------------------------
function pressDot() {
  var str = $("#status").text();
  if (equalsFlag) {
      equalsFlag = false;
      pressCE();
      putString(".");
      putStatusValue(".")
  }
  else {
      if (str.includes(".")) alert("Syntax Error");
      else { putString(".");putStatusValue(".") }
  }
}
//----------------------------------------------------------------
function pressNumber(btnVal) {
    var statusVal = $("#status").text();
    var currVal = $("#allCalc").text();
    if(equalsFlag) {
        equalsFlag = false;
            $("#status").text("");
            $("#allCalc").text("");
        putString(btnVal);
        putStatusValue(btnVal);
    }

    else {
        if (statusVal ==="0" && currVal ==="0") {
            $("#status").text("");
            $("#allCalc").text("");
        }
        else if (statusVal==="0" || isOperator(statusVal) && currVal!=="0") {
            $("#status").text("");
        }
        putString(btnVal);
        putStatusValue(btnVal);
    }
}
//---------------------------------------------------------------
function pressEquals(){
  if($("#status").text()=="0" && $("#allCalc").text()=="0") {alert("Invalid Operation"); return null;}
  equalsFlag = true;
  var result = evaluate();
  $("#status").text(result);
  putString("="+result);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
function evaluate(){              //[22,55,88,99,44,85] , [+,-,*,/,-]
    var str = $("#allCalc").text();
    ans = eval(str);
    return ans;
}
//---------------------------------------------------------------
function putString(str) {
    /*puts value in current status*/
    var currVal = $("#allCalc").text();
    if(currVal.length>13) alert("character limit reached");
    else {
    currVal += str;
    $("#allCalc").text(currVal);
    }
}
//---------------------------------------------------------------
function putStatusValue(str) {
    //puts value in status of calc. so far
    var statusVal = $("#status").text();
    statusVal += str;
    $("#status").text(statusVal);
}
//--------------------------------------------------------------
$(document).ready(function(){
    $("button").on("click",function(){
       var btnVal = this.id;
           btnVal = String(btnVal);
            if(btnVal=="CE") pressCE();
            else if (btnVal=="DEL") pressDEL();
            else if (btnVal=="plus"||btnVal=="divide"||btnVal=="*"||btnVal=="minus") pressOperator(btnVal);
            else if (btnVal=="equals") pressEquals();
            else if (btnVal=="dot") pressDot();
            else pressNumber(btnVal);
    });

});
$(document).keypress(function(e){
    var keyCode = e.which;
    if (keyCode>=48&&keyCode<=57) pressNumber(String.fromCharCode(keyCode));
    else if (keyCode==13) pressEquals();
    else if (keyCode==106||keyCode==107||keyCode==109||keyCode==111) pressOperator(String.fromCharCode(keyCode));
    else if (keyCode==110) pressDot();
});
$(document).keydown(function(e){
    var keyCode = e.which;
    if (keyCode===8) pressDEL();

});