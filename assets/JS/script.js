var APIkey = '1be5c11c833eea2a7b4c716a205a1674';
var city = $('#location-name');


function fetchLocation() {
    var locationQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city.val() + "&appid=" + APIkey;

    fetch(locationQueryURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        if (data.length === 0) {
            alert('Please enter a valid search')
            return
        } else {
            var lat = data[0].lat
            var lon = data[0].lon

            console.log(lon)
            console.log(lat)
            return lon, lat
        }
    })    
}

function fetchWeather() {
    // var weatherQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
}

$('#submit-btn').click( function(e) {
    e.preventDefault()
    if (!city.val()) {
        alert('Please enter a valid search')
    } else {
        fetchLocation();
        city.val('')
        
    }
})







