/**
 * Created by Administrator on 2016/3/19.
 */
//$(document).ready(function () {
//    $(".button-collapse").sideNav();
//});

window.onload = onInit;

var lang = "zh-CN";

var currentTemp, currentPhrase, cityname, tempHighValue, tempLowValue, precipitationValue, humidityValue;

function onInit() {
    //alert("on init");
    $(".button-collapse").sideNav();
    //document.getElementsByClassName("button-collapse").sideNav();

    $('.collapsible').collapsible({
        accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    //$('.modal-trigger').leanModal();
    //$('.scrollspy').scrollSpy();
    currentTemp = document.getElementById("current_temp");
    currentPhrase = document.getElementById("current_phrase");
    cityname = document.getElementById("city_name");
    tempHighValue = document.getElementById("temp_high_value");
    tempLowValue = document.getElementById("temper_low_value");
    precipitationValue = document.getElementById("precipitation_value");
    humidityValue = document.getElementById("humidity_value");

    getCityInfo();
}

function getCityInfo() {
    var cityInfo = localStorage.getItem("locate_city");
    if (null != cityInfo && "" != cityInfo) {
        cityBean = JSON.parse(cityInfo);
        var firstCity = cityBean.addresses[0];
        //alert(firstCity.locality);
        cityname.innerHTML = firstCity.locality;
        getCurrentWeather(firstCity.latitude, firstCity.longitude);
    }
}

function getCurrentWeather(lantitude, longitude) {
    var url = currentWeatherUrl(lantitude, longitude, lang);
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 200) {
            //var p = document.getElementById("console_p");
            //p.innerHTML = request.responseText;
            console.info(request.responseText);
            currentWeatherBean = JSON.parse(request.responseText);
            var observation = currentWeatherBean.observation;
            var metric = observation.metric;
            currentTemp.innerHTML = metric.temp;
            currentPhrase.innerHTML = observation.phrase_32char;
            tempHighValue.innerHTML = metric.temp_max_24hour;
            tempLowValue.innerHTML = metric.temp_min_24hour;
            precipitationValue.innerHTML = metric.precip_24hour;
            humidityValue.innerHTML = metric.rh;
        }
    }
    request.open("GET", url);
    request.send(null);

}