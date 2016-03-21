/**
 * Created by shenjiajun on 2016/3/21.
 */


window.onload = onInit;

var lang = "zh-CN";

function onInit() {
    //getMyLocation();
    var locateBt = document.getElementById("locate_button");
    locateBt.onclick = locationOnclick;
}

function locationOnclick() {
    getMyLocation();
    //getLocationByGeo();
}

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getLocationByGeo,
            displayError);
    }
    else {
        alert("Oops, no geolocation support");
    }
}

function getLocationByGeo(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var geoLocation = latitude + "," + longitude;

    var url = findCityByGeoLocation(geoLocation, lang);
    //var url = "http://api.weather.com/v2/location?geocode=31.202915,121.598519&language=zh-CN&format=json&apiKey=0efd9b4f14275d37789a2f57e5101852";
    //alert(url);
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 200) {
            cityBean = JSON.parse(request.responseText);
            //alert(JSON.stringify(cityBean));
            localStorage.setItem("locate_city", request.responseText);
            window.location.href = "index.html";
        }
    };
    request.open("GET", url);
    request.send(null);
}

function getLocationByName(cityName) {
    //var findCityByNameUrl = "http://api.accuweather.com/locations/v1/cities/autocomplete.json?q=shanghai&apikey=af7408e9f4d34fa6a411dd92028d4630&language=en";
    //var findCityByNameUrl2 = "http://api.weather.com/v2/location?address=shanghai&language=en&format=json&apiKey=0efd9b4f14275d37789a2f57e5101852";
    //var dynamicUrl = "http://app.senseluxury.com:8002/villa_list";
    //var address = "上海";
    //var params = {
    //    address: address,
    //    language: 'en',
    //    format: 'json',
    //    apiKey: "0efd9b4f14275d37789a2f57e5101852"
    //};
    //var url = buildUrl("http://api.weather.com/v2/location", params);

    var url = findCityByName(cityName, lang, true);
    //alert(url);
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 200) {
            displayData(request.responseText);
        }
    }
    request.open("GET", url);
    request.send(null);
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("You are at Latitude: " + latitude + ", Longitude: " + longitude);
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position is not available",
        3: "Request timeout"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    alert(errorMessage);
}