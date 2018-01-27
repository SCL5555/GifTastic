
var topics = ["dogs", "kittens", "penguin", "polar bear", "elephant", "giraffe", "minions"];

function renderButtons(){
	$(".buttonDiv").empty();

	for(var i = 0; i < topics.length; i++){
		var a = $("<button>");
		a.attr("data-topic", topics[i]).attr("type", "button");
		a.addClass("topic btn btn-outline-info");
		a.text(topics[i]);
		$(".buttonDiv").append(a);
	}
}

$(document).on("click", "#submitButton", function(event){
	event.preventDefault();
	var topic = $("#animalAdd").val().trim();
	topics.push(topic);
	renderButtons();
	$("#animalAdd").val("");
});

renderButtons();


$(document).on("click", ".topic", function(){
	$(".gifDiv").empty();
	var keyword = $(this).attr("data-topic");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        encodeURI(keyword) + "&api_key=emsfw3t3bTSlCkCzKVf7VxyTKZoGQqlK&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    .then(function(response){
    	var results = response.data;

    	for( var i = 0; i < results.length; i++){
    		var gifDiv = $("<div>").addClass("col-md");
    		var rating = results[i].rating;
    		var p = $("<p>").text("Rating: " + rating);
    		var animalImage = $("<img>");
    		animalImage.attr("data-still", results[i].images.fixed_height_still.url);
    		animalImage.attr("data-animate", results[i].images.fixed_height.url);
    		animalImage.attr("src", results[i].images.fixed_height_still.url);
    		animalImage.attr("data-state", "still");
    		animalImage.addClass("gif");
    		gifDiv.append(p);
    		gifDiv.append(animalImage);
    		$(".gifDiv").append(gifDiv);
    	}
    });
});


 $(document).on("click", ".gif", function(){
	var state = $(this).attr("data-state");
	

	if(state == "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else{
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});




