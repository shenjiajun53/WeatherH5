/**
 * Created by Administrator on 2016/3/19.
 */
//$(document).ready(function () {
//    $(".button-collapse").sideNav();
//});

window.onload = onInit;

var lang = "zh-CN";

var currentTemp, currentPhrase, cityname,
    tempHighValue, tempLowValue, precipitationValue, humidityValue,
    visibilityValue, pressureValue, windValue, uvValue;

var bodyDiv;

var houlyTable;

var currentWeatherCode;

var consoleP;
function onInit() {
    //alert("on init");
    //$(".button-collapse").sideNav();
    ////document.getElementsByClassName("button-collapse").sideNav();
    //
    //$('.collapsible').collapsible({
    //    accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    //});

    //$('.modal-trigger').leanModal();
    //$('.scrollspy').scrollSpy();
    currentTemp = document.getElementById("current_temp");
    currentPhrase = document.getElementById("current_phrase");
    cityname = document.getElementById("city_name");
    tempHighValue = document.getElementById("temp_high_value");
    tempLowValue = document.getElementById("temper_low_value");
    precipitationValue = document.getElementById("precipitation_value");
    humidityValue = document.getElementById("humidity_value");
    visibilityValue = document.getElementById("visibility_value");
    pressureValue = document.getElementById("wind_value");
    windValue = document.getElementById("pressure_value");
    uvValue = document.getElementById("uv_index_value");

    consoleP = document.getElementById("console_p");

    bodyDiv = document.getElementById("body_div");

    getCityInfo();
}

function getCityInfo() {
    var cityInfo = localStorage.getItem("locate_city");
    console.log(cityInfo);
    if (null != cityInfo && "" != cityInfo) {
        addressBean = JSON.parse(cityInfo);
        console.log(JSON.stringify(addressBean));
        //var firstCity = cityBean.addresses[0];
        //alert(firstCity.locality);
        cityname.innerHTML = addressBean.locality;
        getCurrentWeather(addressBean.latitude, addressBean.longitude);
        getHourlyWeather(addressBean.latitude, addressBean.longitude);
        getDailyWeather(addressBean.latitude, addressBean.longitude);
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
            currentTemp.innerHTML = metric.temp + "℃";
            currentPhrase.innerHTML = observation.phrase_32char;
            tempHighValue.innerHTML = metric.temp_max_24hour + "℃";
            tempLowValue.innerHTML = metric.temp_min_24hour + "℃";
            precipitationValue.innerHTML = metric.precip_24hour + "mm";
            humidityValue.innerHTML = metric.rh + "%";
            visibilityValue.innerHTML = metric.vis + "km";
            windValue.innerHTML = metric.wspd + "km/h";
            pressureValue.innerHTML = metric.mslp + "pa";
            uvValue.innerHTML = observation.uv_index;

            currentWeatherCode = observation.icon_code;
            console.info("icon_code=" + currentWeatherCode + " bg res=" + getBackgroundImage(currentWeatherCode));
            //console.info("url('res/drawable-xxhdpi/bg_cloudy.png')");
            //console.info("url('" + getBackgroundImage(currentWeatherCode) + "')");
            //bodyDiv.style.backgroundImage = "url('res/drawable-xxhdpi/bg_sunny.jpg')";
            bodyDiv.style.backgroundImage = "url('" + getBackgroundImage(currentWeatherCode) + "')";
        }
    }
    request.open("GET", url);
    request.send(null);

}

function getHourlyWeather(lantitude, longitude) {
    var url = forcastHourlyWeatherUrl(lantitude, longitude, lang);
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 200) {
            //var p = document.getElementById("console_p");
            //p.innerHTML = request.responseText;
            //console.info(request.responseText);
            //consoleP.innerHTML = request.responseText;
            //houlyTable.setAttribute("class", "responsive-table");
            hourlyWeatherBean = JSON.parse(request.responseText);
            var hourlyForecast = hourlyWeatherBean.forecasts;

            var hourlyDiv = document.getElementById("hourly_div");
            //hourlyDiv.setAttribute("class","blue");
            for (var i = 0; i < hourlyForecast.length; i++) {
                var time = hourlyForecast[i].fcst_valid_local;
                if (null != time) {
                    time = time.substring(11, 16);
                }
                var icon = hourlyForecast[i].icon_code;
                var temp = hourlyForecast[i].temp;

                var hourlyItem = document.createElement("div");
                hourlyItem.setAttribute("class", "hourly_item no_padding_and_margin");
                var timeDiv = document.createElement("div");
                var hourlyLine = document.createElement("div");
                var iconDiv = document.createElement("div");
                var tempDiv = document.createElement("div");
                timeDiv.setAttribute("class", "text-center");
                hourlyLine.setAttribute("class", "card_line");
                iconDiv.setAttribute("class", "text-center");
                tempDiv.setAttribute("class", "text-center");

                timeDiv.innerHTML = time;
                tempDiv.innerHTML = temp + "℃";

                var iconImg = document.createElement("img");
                iconImg.setAttribute("class", "daily-img");
                iconImg.src = getHourlyIcon(icon);
                iconDiv.appendChild(iconImg);

                hourlyItem.appendChild(timeDiv);
                hourlyItem.appendChild(hourlyLine);
                hourlyItem.appendChild(iconDiv);
                hourlyItem.appendChild(tempDiv);

                hourlyDiv.appendChild(hourlyItem);
            }

            $("#hourly_div").owlCarousel({
                autoPlay: false,
                items: 18,
                itemsDesktop: [1199, 18],
                itemsDesktopSmall: [979, 12],
                itemsTablet: [768, 6],
                itemsMobile: [479, 6],
                navigation: false,
                theme: ""
            });
        }
    }
    request.open("GET", url);
    request.send(null);

}

function getDailyWeather(lantitude, longitude) {
    var url = forecastDailyWeatherUrl(lantitude, longitude, lang);
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (request.status == 200) {
            console.info(request.responseText);
            //consoleP.innerHTML = request.responseText;
            dailyWeatherBean = JSON.parse(request.responseText);
            var dailyForecast = dailyWeatherBean.forecasts;
            var dailyCard = document.getElementById("daily_card");
            dailyCard.style.backgroundColor = getBackgroundColor(currentWeatherCode);
            var dailul = document.getElementById("daily_ul");
            for (var i = 1; i < dailyForecast.length; i++) {
                var dailyLi = document.createElement("li");
                var dailyItem = document.createElement("div");
                dailyLi.setAttribute("class", "daily_li");

                dailyItem.setAttribute("class", "row no_margin valign-wrapper");

                var date = dailyForecast[i].fcst_valid_local;
                if (null != date) {
                    date = date.substring(0, 10);
                }
                var week = dailyForecast[i].dow;
                var maxTemp = dailyForecast[i].max_temp;
                var mintemp = dailyForecast[i].min_temp;

                var dayObj = dailyForecast[i].day;
                var phrase = dayObj.phrase_32char;
                var iconCode = dayObj.icon_code;
                var precipitation = dayObj.qpf;

                var weekDiv = document.createElement("div");
                weekDiv.setAttribute("class", "text-center  col-md-2 col-xs-1 valign");
                weekDiv.innerHTML = week;
                var iconDiv = document.createElement("div");
                iconDiv.setAttribute("class", "text-left  col-md-2 col-xs-2 valign");
                var iconImg = document.createElement("img");
                iconImg.src = getDailyIcon(iconCode);
                iconDiv.appendChild(iconImg);
                var phraseDiv = document.createElement("div");
                phraseDiv.setAttribute("class", "text-left  col-md-5 col-xs-4 valign");
                phraseDiv.innerHTML = phrase;
                var precipDiv = document.createElement("div");
                precipDiv.setAttribute("class", "text-left  col-md-1 col-xs-3 valign");
                precipDiv.innerHTML = precipitation + "mm";
                var highDiv = document.createElement("div");
                highDiv.setAttribute("class", " text-left col-md-1 col-xs-2 valign");
                highDiv.innerHTML = maxTemp + "℃";
                var lowDiv = document.createElement("div");
                lowDiv.setAttribute("class", " text-left col-md-1 col-xs-2 valign");
                lowDiv.innerHTML = mintemp + "℃";
                dailyItem.appendChild(weekDiv);
                dailyItem.appendChild(iconDiv);
                dailyItem.appendChild(phraseDiv);
                dailyItem.appendChild(precipDiv);
                dailyItem.appendChild(highDiv);
                dailyItem.appendChild(lowDiv);
                dailyLi.appendChild(dailyItem);

                dailul.appendChild(dailyLi);
                if (i < dailyForecast.length - 1) {
                    var lineLi = document.createElement("li");
                    lineLi.setAttribute("class", "daily_line");
                    lineLi.style.backgroundColor = colorBurn(getBackgroundColor(currentWeatherCode));
                    dailul.appendChild(lineLi);
                }

            }
        }
    }
    request.open("GET", url);
    request.send(null);

}

function colorBurn(RGBValues) {
    var alpha = RGBValues >> 24;
    var red = RGBValues >> 16 & 0xFF;
    var green = RGBValues >> 8 & 0xFF;
    var blue = RGBValues & 0xFF;
    red = Math.floor(red * (1 - 0.07));
    green = Math.floor(green * (1 - 0.07));
    blue = Math.floor(blue * (1 - 0.07));
    return rgbToHex(red, green, blue);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}