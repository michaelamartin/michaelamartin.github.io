$(document).ready(function() {
  searchSubmit();
});

function searchSubmit() {
  $('#submit').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      $('#searchButton').click();
    }
  });

  $("#submit").on("click", function(e) {
    e.preventDefault();
    $("#results").html("");
    var input = $("#inputField").val();
    console.log(input);
    searchRequest(input);
  });
}

function searchRequest(input) {

  var wikiAPI = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&generator=search&callback=jsonCallback&exsentences=2&exlimit=10&exintro=1&explaintext=1&pithumbsize=100&pilimit=10&gsrsearch=' + input;
  console.log(wikiAPI);

  $.ajax({
    url: wikiAPI,
    type: "GET",
    jsonp: "jsonCallback",
    dataType: "jsonp"
  });
}

function jsonCallback(data) {
  console.log(data.query.pages);
  $.each(data.query.pages, function(index, value) {
    
    var resultHTML = '<a target="_blank" href="https://en.wikipedia.org/?curid=' + value.pageid + '"><div class = "row border">';
    resultHTML += '<div class = "col-xs-12 title"><h2>' + value.title + '</h2></div><div class = "col-xs-12">';
    
    if (value.thumbnail) {
      resultHTML += '<img src ="' + value.thumbnail.source + '" align = "left">';
    }
    
    resultHTML += '<p>' + value.extract + '</p></div></div></a>';

    $("#results").append(resultHTML);
  });
}