$(document).ready(function(){
    curQuote='';
    curAuthor='';
   $("#new_quote").on("click",function(){
       $.ajax({
       headers: {
               "X-Mashape-Key": "jKdq5Vn0lsmshVNnjhHMo9RQhcMRp1VLHGHjsnz8oqiqkYQ9jK",
               Accept: "application/json",
               "Content-Type": "application/x-www-form-urlencoded"
               }, 
       url:"https://andruxnet-random-famous-quotes.p.mashape.com/?cat=", 
       success: function(r)
               {
               if(typeof r == 'string'){
                   r=JSON.parse(r);
                   
               }
               curAuthor=r.author;
                   curQuote=r.quote;
           $("#quote").html("<p>"+r.quote+"</p>" + "<br><p>— " + r.author + "</p>");
           } 
       });
   });
   $("#tweet-quote").on("click",function(){
       $("#tweet-quote").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + curQuote + '" ' +"-"+curAuthor));
   });
});


