var APIkey = "1be5c11c833eea2a7b4c716a205a1674";
var city = $("#location-name");
var previousSearchContainer = $("#previous-search-container");
var cities = JSON.parse(localStorage.getItem("location")) || [];
var forecastDiv = $("#five-day-forecast");
var currentDayForecastSection = $("#current-day-forecast-section");
var forecastTitle = $("#forecast-title");
var li = $("<li>");

function fetchLocation(event) {
  // TODO: if statement: if event came from city button or if it came from search // else place = city.val()
  // var place = event.target.innerText
  // var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + place + "&appid=" + APIkey

  var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.val() + "&appid=" + APIkey;

  // fetches data from above API searching the location name, and variables are created for lat and lon to be used in the next fetch function
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
        fetchWeather(lat, lon);
      }
    });
}

function fetchWeather(lat, lon) {
  var weatherQueryURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey + "&units=imperial";

    // fetches the data from the above API, uses lat and lon variables from the fetchLocation function
  fetch(weatherQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var fiveDayContainer = "";
      var currentDayForecastCard = "";
      var fiveDayTitleContainer = "";
      var currentTimestamp = data.list[1].dt;
      var currentDate = new Date(currentTimestamp * 1000);

      // dynamically creates the current day forecast card
      currentDayForecastCard += `
    <section id="current-day-forecast">
      <h3>
      ${data.city.name} (${currentDate.toLocaleDateString("default")}) 
      <img src='https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png'>
      </h3>
      <p><span class="bold">Temp:</span> ${data.list[1].main.temp}°F</p>
      <p><span class="bold">Wind:</span> ${data.list[1].wind.speed} MPH</p>
      <p><span class="bold">Humidity:</span> ${data.list[1].main.humidity}%</p>
    </section>`;

      // dynamically creates the next five days title
      fiveDayTitleContainer += `<h3>Next Five Days: <h3>`;

      // dynamically creates the next five days cards
      for (var i = 1; i < 6; i++) {
        var timestampFiveDay = data.list[i * 7].dt;
        var date = new Date(timestampFiveDay * 1000);
        fiveDayContainer += `
            <div class="forecast-card">
                <p><span class="bold">${date.toLocaleDateString("default")}<span class="bold"></p>
                <p><img src='https://openweathermap.org/img/w/${data.list[i * 7].weather[0].icon}.png'></p>
                <p><span class="bold">Temp:</span> ${data.list[i * 7].main.temp}°F</p>
                <p><span class="bold">Wind:</span> ${data.list[i * 7].wind.speed} MPH</p>
                <p><span class="bold">Humidity:</span> ${data.list[i * 7].main.humidity}%</p>
            </div>`;
      }
      // appends the cards to the document
      forecastDiv.html(fiveDayContainer);
      currentDayForecastSection.html(currentDayForecastCard);
      forecastTitle.html(fiveDayTitleContainer);
    });
}

// function to save locations to localStorage
function saveLocationAndCreateListItem() {
  cities.push(city.val());
  localStorage.setItem("location", JSON.stringify(cities));
  var userInput = city.val();
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

// function that loads locations to the page via local storage
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
      li = $("<li>");
      li.text(userInputFinal);
      // li.click(fetchLocation); TODO
      $("#previous-searches").prepend(li);
    }
  }
}

// submit button for search bar
$("#submit-btn").click(function (event) {
  event.preventDefault();
  // If city.val is blank send alert, else, run the call the function
  if (!city.val()) {
    alert("Please enter a valid search")
  } else {
  fetchLocation();
  }
});

// function call for local storage functionality
loadItemsOnPage();
