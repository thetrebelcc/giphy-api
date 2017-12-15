
var topics = {
  
  buttonArr: ["Armbar", "Bow and Arrow Choke", "Americana Armlock", "Arm Triangle", "Ezekiel Choke", "Gogoplata"],
  
  
  init: function(data){
    for (var i = 0; i < topics.buttonArr.length; i++) {
      topics.addButton(topics.buttonArr[i]);
    }
  },

  addButton: function(item){
    $("#buttons").append("<button class='btn btn-primary btn-giphy small_margin' data-item=" + item + ">" + item + "</button>");
  },

};

$(function() {
  topics.init();

  $("#add_button").on("click", function(event){
    let btnText = $("#button_text").val().trim();

    if (btnText != "" && topics.buttonArr.indexOf(btnText) == -1) {
      topics.buttonArr.push(btnText);
      topics.addButton(btnText);
      $("#button_text").val("");
    }
  });

  $("#button_text").keypress(function(event) {
    if (event.which == 13) {
      $("#add_button").click();
    }
  });

  $(document.body).on('click', '.btn-giphy', function(event){
    $("#gifs").empty();

    $.ajax({
            url: "https://api.giphy.com/v1/gifs/search",
            method: 'GET',
            data: {
              q: $(this).data("item"),
              api_key: "TN3S7Mguof0HwiD6GCFrHTA2SSWSalrn",
              limit: "10"
            }
        })
        .done(function(response) {
          for (var i = 0; i < response.data.length; i++) {
            var template = "<div class='large_margin'>" + 
              "<p>Rating: " + response.data[i].rating.toUpperCase() + "<br/>" + 
              "<img src='" + response.data[i].images.fixed_height_still.url + "' " + 
                "data-still='" + response.data[i].images.fixed_height_still.url + "' " +
                "data-animate='" + response.data[i].images.fixed_height.url + "' " +
                "data-state='still' " +
                "class='gif-pause'>"
              "</div>";

            $("#gifs").append(template);
          }
        });
  });

  $(document.body).on('click', '.gif-pause', function(event){
    if ($(this).data("state") == "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).data("state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).data("state", "still"); 
    }
  });
});