

  $("document").ready(function(){
    var html="";
    // when search button is clicked
    $("button").on("click", function doit(){
      // get the name of article
      var article = $("#srch_bar").val();
      if(article==""){html=null;$(".message").html(html);}
      else{      // create link for the json data
        // callback=? is added at the end to allow for cross-domain requests
        var api ="https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srprop=snippet&srsearch=" + encodeURIComponent(article) + "&callback=?";
        
        $.getJSON(api, function(json){
          //console.log(json.query.search);
          for (var key in json.query.search){
              //console.log(json.query.search[key].title);
            var direct = json.query.search[key];
            html += "<a style='text-decoration:none' target='_blank' href=https://en.wikipedia.org/wiki/" + encodeURIComponent(direct.title) + ">" + "<div class='well col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10'>";
            html += "<h3 style='color: black'>" + direct.title  + "</h3><br>";
            html += "<p style='color: black'>" + direct.snippet + "</p>";
            html += "</div></a><br>";
          }
          $(".message").html(html);
        });}
    });


    $('#srch_bar').bind("enterKey",function(e){
      var article = $("#srch_bar").val();
      if(article==""){html="";$(".message").html(html);}
      else{      // create link for the json data
        // callback=? is added at the end to allow for cross-domain requests
        var api ="https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srprop=snippet&srsearch=" + encodeURIComponent(article) + "&callback=?";
        
        $.getJSON(api, function(json){
          //console.log(json.query.search);
          for (var key in json.query.search){
              //console.log(json.query.search[key].title);
            var direct = json.query.search[key];
            html += "<a style='text-decoration:none' target='_blank' href=https://en.wikipedia.org/wiki/" + encodeURIComponent(direct.title) + ">" + "<div class='well col-xs-offset-1 col-xs-10 col-sm-offset-1 col-sm-10'>";
            html += "<h3 style='color: black'>" + direct.title  + "</h3><br>";
            html += "<p style='color: black'>" + direct.snippet + "</p>";
            html += "</div></a><br>";
          }
          $(".message").html(html);
        });}
   });
   $('#srch_bar').keyup(function(e){
       if(e.keyCode == 13)
       {
           $(this).trigger("enterKey");
       }
   });















































  });