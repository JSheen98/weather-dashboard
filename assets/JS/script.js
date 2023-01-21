var APIkey = "1be5c11c833eea2a7b4c716a205a1674";
var city = $("#location-name");
var previousSearchContainer = $("#previous-search-container");
var cities = JSON.parse(localStorage.getItem("location")) || [];
var forecastDiv = $('#five-day-forecast')
var cardContainer = $('#card-container')

function fetchLocation(event) {
    // if statement if event came from city button or if it came from search // else place = city.val()
    var place = event.target.innerText

    if (click = $('#submit-btn')){
        var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.val() + "&appid=" + APIkey
    } else {
        var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + place + "&appid=" + APIkey
    }


  fetch(locationQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        alert("Please enter a valid search");
        city.val("");
        return;
      } else {
        var lat = data[0].lat;
        var lon = data[0].lon;

        saveLocationAndCreateListItem();

        console.log(lon);
        console.log(lat);
        fetchWeather(lat, lon)
        
      }
    });
}

function fetchWeather(lat, lon) {
  var weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

  fetch(weatherQueryURL)
  .then(function(response){
    return response.json()
  }) 
  .then(function(data){
    console.log(data)
    var fiveDayContainer = ''
    for (var i = 0; i < 5; i++){
        fiveDayContainer += 
        `<div class="forecast-card">
                <p>${data.list[i*8].dt_txt.split(' ')}</p>
                <p><img src='https://openweathermap.org/img/w/${data.list[i*8].weather[0].icon}.png'></p>
                <p>Temp: ${data.list[i*8].main.temp}</p>
                <p>Wind: ${data.list[i*8].wind.speed}</p>
                <p>Humidity: ${data.list[i*8].main.humidity}%</p>
            </div>`
    }
    forecastDiv.html(fiveDayContainer)
  })
    
}


function saveLocationAndCreateListItem() {
  cities.push(city.val());
  localStorage.setItem('location', JSON.stringify(cities))
  var userInput = city.val()
  // Goes through and makes sure the user input capitalizes all first letters on each word (i.e. 'new york' becomes 'New York')
  var capitalize = userInput.split(" ");
  for (var i = 0; i < capitalize.length; i++) {
    capitalize[i] =
      capitalize[i].charAt(0).toUpperCase() + capitalize[i].slice(1);
  }
  var userInputFinal = capitalize.join(" ");
  $("#previous-searches").prepend("<li>" + userInputFinal + "</li>");
  city.val("");
}

function loadItemsOnPage() {
  // Goes through and makes sure the user input capitalizes all first letters on each word (i.e. 'new york' becomes 'New York')
  if (cities.length == 0) {
    return;
  } else {
    for (var j = 0; j < cities.length; j++) {
      var capitalize = cities[j].split(" ");
      for (var i = 0; i < capitalize.length; i++) {
        capitalize[i] =
          capitalize[i].charAt(0).toUpperCase() + capitalize[i].slice(1);
      }
      var userInputFinal = capitalize.join(" ");
      var li = $('<li>')
      li.text(userInputFinal) // jquery version of innerText
      li.click(fetchLocation) // click method for jquery
      $("#previous-searches").prepend(li)
    //   $("#previous-searches").prepend("<li>" + userInputFinal + "</li>");
    }
  }
}

$("#submit-btn").click(function (e) {
  e.preventDefault();
  if (!city.val()) {
    alert("Please enter a valid search");
  } else {
    console.log(e.target.innerText)
    fetchLocation();
  }
});

loadItemsOnPage();
