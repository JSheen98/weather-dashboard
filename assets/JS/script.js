var APIkey = "1be5c11c833eea2a7b4c716a205a1674";
var city = $("#location-name");
var previousSearchContainer = $("#previous-search-container");
var cities = JSON.parse(localStorage.getItem("location")) || [];
var forecastDiv = $('#five-day-forecast')
var forecastContainer = $('#forecast-container')
var currentDayForecastSection = $('#current-day-forecast-section')
var forecastTitle = $('#forecast-title')
var cardContainer = $('#card-container')
var li = $('<li>')

function fetchLocation(event) {
    // if statement if event came from city button or if it came from search // else place = city.val()
    // var place = event.target.innerText

    // var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + place + "&appid=" + APIkey
        var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.val() + "&appid=" + APIkey
   
        
        
    


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
    var fiveDayContainer = ''
    var currentDayForecastCard = ''
    var fiveDayTitleContainer = ''
    var currentTimestamp = data.list[1].dt
    var currentDate = new Date (currentTimestamp * 1000)

    currentDayForecastCard += `
    <section id="current-day-forecast">
      <h3>${data.city.name} (${currentDate.toLocaleDateString('default')}) <img src='https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png'></h3>
      <p><span class="bold">Temp:</span> ${data.list[1].main.temp}°F</p>
      <p><span class="bold">Wind:</span> ${data.list[1].wind.speed}</p>
      <p><span class="bold">Humidity:</span> ${data.list[1].main.humidity}%</p>
    </section>`
    
    fiveDayTitleContainer += `<h3>Next Five Days: <h3>`
  
    for (var i = 1; i < 6; i++){
        var timestampFiveDay = data.list[i*7].dt
        var date = new Date(timestampFiveDay * 1000)
        fiveDayContainer += 
        `<div class="forecast-card">
                <p><span class="bold">${date.toLocaleDateString('default')}<span class="bold"></p>
                <p><img src='https://openweathermap.org/img/w/${data.list[i*7].weather[0].icon}.png'></p>
                <p><span class="bold">Temp:</span> ${data.list[i*7].main.temp}°F</p>
                <p><span class="bold">Wind:</span> ${data.list[i*7].wind.speed}</p>
                <p><span class="bold">Humidity:</span> ${data.list[i*7].main.humidity}%</p>
            </div>`
    }
    forecastDiv.html(fiveDayContainer)
    currentDayForecastSection.html(currentDayForecastCard)
    forecastTitle.html(fiveDayTitleContainer)
    
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
      li = $('<li>')
      li.text(userInputFinal) // jquery version of innerText
      li.click(fetchLocation) // click method for jquery
      $("#previous-searches").prepend(li)
      
    //   $("#previous-searches").prepend("<li>" + userInputFinal + "</li>");
    }
  }
}


$("#submit-btn").click(function (event) {
  event.preventDefault();
  fetchLocation();
//   console.log(event.target.tagName)
//   console.log(event.target)
//   if (!city.val()) {
//     alert("Please enter a valid search");
//   } else {
    
//   }
});

loadItemsOnPage();

