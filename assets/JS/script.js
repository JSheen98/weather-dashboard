var APIkey = '1be5c11c833eea2a7b4c716a205a1674';
var city = $('#location-name');
var logan = 'new york'
var loganFinal = logan.split(' ').join('')
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
var queryURLogan = "http://api.openweathermap.org/data/2.5/weather?q=" + logan + "&appid=" + APIkey;

function fetchData() {
    fetch(queryURLogan)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
}

$('#submit-btn').click( function(e) {
    e.preventDefault()
    console.log(city.val())
    city.val('')
})

// console.log(loganFinal)
console.log(logan)
console.log(queryURLogan)
fetchData();