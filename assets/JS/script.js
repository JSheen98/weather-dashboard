var APIkey = "1be5c11c833eea2a7b4c716a205a1674";
var city = $("#location-name");
var previousSearchContainer = $("#previous-search-container");

function fetchLocation() {
  var locationQueryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city.val() +
    "&appid=" +
    APIkey;

  fetch(locationQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        return;
      } else {
        var lat = data[0].lat;
        var lon = data[0].lon;

        console.log(lon);
        console.log(lat);
        return lon, lat;
      }
    });
}

function fetchWeather() {
  // var weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
}

function saveLocationAndCreateListItem() {
//   if (data.length === 0) {
//     alert("Please enter a valid search");
//     return;
//   } else {
    localStorage.setItem("location", city.val());
    var userInput = localStorage.getItem("location");
    // Goes through and makes sure the user input capitalizes all first letters on each word (i.e. 'new york' becomes 'New York')
    var capitalize = userInput.split(" ");
    for (var i = 0; i < capitalize.length; i++) {
      capitalize[i] = capitalize[i].charAt(0).toUpperCase() + capitalize[i].slice(1);
    }
    var userInputFinal = capitalize.join(" ");
    $("#previous-searches").prepend("<li>" + userInputFinal + "</li>");
//   }
}

function loadItemsOnPage() {
  var userInput = localStorage.getItem("location");
  // Goes through and makes sure the user input capitalizes all first letters on each word (i.e. 'new york' becomes 'New York')
  if (!userInput) {
    return;
  } else {
    var capitalize = userInput.split(" ");
    for (var i = 0; i < capitalize.length; i++) {
      capitalize[i] = capitalize[i].charAt(0).toUpperCase() + capitalize[i].slice(1);
    }
    var userInputFinal = capitalize.join(" ");
    $("#previous-searches").prepend("<li>" + userInputFinal + "</li>");
  }
}



$("#submit-btn").click(function (e) {
  e.preventDefault();
  if (!city.val()) {
    alert("Please enter a valid search");
  } else {
    fetchLocation();
    saveLocationAndCreateListItem();
    city.val("");
  }
});

loadItemsOnPage();
