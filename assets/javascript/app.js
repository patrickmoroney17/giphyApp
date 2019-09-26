var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "hedgehog", "chicken", "frog"];

function displayanimalInfo() {
  var animal = $(this).attr("data-animal");
  var giphyKey = "&api_key=G5D2MIcE6V9sCDXy9QtdjqYySLgcyNIp";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + giphyKey + "&limit=10";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var animalDiv = $("<div class='animal'>");
    $("#animals-view").prepend(animalDiv);

    var results = response.data;
    console.log(results);

    for (var i = 0; i < results.length; i++) {

      var gifDiv = $("<div>"); 
      gifDiv.addClass("gifDiv");

      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      var gifImage = $("<img>");

      gifImage.attr("src",results[i].images.fixed_height_still.url);            
      gifImage.attr("data-still",results[i].images.fixed_height_still.url); 
      gifImage.attr("data-animate",results[i].images.fixed_height.url); 
      gifImage.attr("data-state", "still");

      gifImage.addClass("image");
      gifDiv.append(gifImage);
      gifDiv.prepend(p);

      $("#animals-view").prepend(gifDiv);
    }
  });
}
function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal-btn");
    a.attr("data-animal", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
});

$(document).on("click", ".animal-btn", displayanimalInfo);
  renderButtons();

$(document).on("click", ".image", function() {
  var state = $(this).attr('data-state');
  if ( state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
  } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
  }
});