$(document).ready(function() {

  function randomQuote() {
    // gets random quote from forismatic
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json) {
      var quote = JSON.stringify(json.quoteText);
      var author = JSON.stringify(json.quoteAuthor);

      // stripping unwanted punctiation and spaces
      author = "- " + author.replace(/["]/g, "");
      quote = '"' + quote.replace(/["]/g, "").trim() + '"';

      console.log(quote);
      console.log(author);

      // replaces semicolon with greek question mark for twitter posts
      quote = quote.replace(/;/g, ";");

      // rewrites empty stringified author object as unknown
      if (author == "- ") {
        author = "- Unknown";
      }

      // assuring all quotes are short enough to tweet
      if (quote.length + author.length + 1 > 140) {
        randomQuote();
      } else {
        // outputs quote and author to html
        $(".quote-text").html(quote);
        $(".quote-author").html(author);
        $(".tweet-btn").attr("href", "https://twitter.com/intent/tweet?text=" + quote + " " + author).attr('target', '_blank');
      }
    });
  }

  // initial quote
  randomQuote();

  // gets new quote on button click
  $(".quote-btn").on("click", function() {
    randomQuote();
  });

  $(function() {
    $(document).keydown(function(evt) {
      if (evt.keyCode == 32) {
        evt.preventDefault();
        randomQuote();
        console.log('space')
      }
    })
  })
});