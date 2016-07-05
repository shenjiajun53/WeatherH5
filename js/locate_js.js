/**
 * Created by shenjiajun on 2016/3/21.
 */


window.onload = onInit;

var lang = "zh-CN";

function onInit() {
    //getMyLocation();
    //var locateBt = document.getElementById("locate_button");
    //locateBt.onclick = locationOnclick;


    //var searchText = document.getElementById("search_text");
    ////searchText.addEventListener("change", function () {
    ////    textChange(this.value);
    ////});
    //
    //searchText.addEventListener("keydown", function () {
    //    if (event.keyCode == 13) {
    //        textChange(this.value);
    //    }
    //});


    $("#locate_button").click(locationOnclick);
    $("#search_text").on("keydown", function () {
        if (event.keyCode == 13) {
            textChange(this.value);
        }
    });
    $("#back_div").click(function () {
        window.location.href = "index.html";
    });
    initView();
}

function initView() {
    var currentLocation = $("#current_location_div");
    var cityInfo = localStorage.getItem("current_city");
    //console.log(cityInfo);
    addressBean = JSON.parse(cityInfo);
    if (null != addressBean.locality && "" != addressBean.locality) {
        currentLocation.html(addressBean.locality);
    } else {
        currentLocation.html(addressBean.admin_district);
    }

    initSearchedTable();
}

function initSearchedTable() {
    var searchedLength = localStorage.length - 1;
    $("#delete_location_div").click(function () {
        var currentCityInfo = localStorage.getItem("current_city");
        localStorage.clear();
        localStorage.setItem("current_city", currentCityInfo);
        searchBody.empty();
    });

    var searchBody = $("#search_history");
    for (var i = 0; i < searchedLength; i++) {
        var cityInfo = localStorage.getItem("searched_city" + i);
        console.log(cityInfo);
        addressBean = JSON.parse(cityInfo);
        //console.log(JSON.stringify(addressBean));
        var searchTd = $("<td></td>");
        searchTd.addClass("col-md-4 col-xs-4");
        searchTd.css("padding", "0px");
        var searchItem = $("<div></div>");
        searchItem.addClass("location_outline hover");

        (function () {
            var cityInfo2 = cityInfo;
            searchItem.click(function () {

                localStorage.setItem("current_city", cityInfo2);
                window.location.href = "index.html";
            });
        })();


        if (null != addressBean.locality && "" != addressBean.locality) {
            searchItem.html(addressBean.locality);
        } else {
            searchItem.html(addressBean.admin_district);
        }
        var searchTr = null;
        if (i % 3 == 0) {
            //console.log("if..."+parseInt(i / 3));
            searchTr = $("<tr></tr>");
        } else {
            //console.log("else.."+parseInt(i / 3));
            searchTr = $(searchBody.children()[parseInt(i / 3)]);
            //searchTr.append(searchTd);

        }
        searchTd.append(searchItem);
        searchTr.append(searchTd);
        searchBody.append(searchTr);
        //console.log(searchBody.children().length);
    }
}

function textChange(value) {
    //alert(value);
    getLocationByName(value);
}
function onclick() {
    alert("onclick");
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
            localStorage.setItem("current_city", JSON.stringify(cityBean.addresses[0]));
            var searchedLength = localStorage.length - 1;
            localStorage.setItem("searched_city" + searchedLength, JSON.stringify(cityBean.addresses[0]));
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
            //displayData(request.responseText);
            //alert(request.responseText);
            cityBean = JSON.parse(request.responseText);
            //alert(JSON.stringify(cityBean));
            //localStorage.setItem("locate_city", request.responseText);
            //window.location.href = "index.html";
            displaySearchResult(cityBean);
        }
    };
    request.open("GET", url);
    request.send(null);
}

function displaySearchResult(cityBean) {
    var resultUl = document.getElementById("search_result_list");
    var itemList = resultUl.childNodes;
    console.log("itemList length=" + itemList.length);
    for (var j = 0; j < itemList.length; j++) {
        resultUl.removeChild(itemList[j]);
    }
    var cityArray = cityBean.addresses;
    for (var i = 0; i < cityArray.length; i++) {
        addressBean = cityArray[i];
        var resultLi = document.createElement("li");
        resultLi.innerHTML = addressBean.locality;
        resultLi.setAttribute("id", "result" + i);
        resultLi.setAttribute("tag", "result_item");
        resultLi.onclick = function () {
            selectResult(this.getAttribute("id"), cityBean);
        };
        resultUl.appendChild(resultLi);
    }
}

function selectResult(id, cityBean) {
    var num = id.substring(6, id.length);
    console.log("num=" + num);
    localStorage.setItem("current_city", JSON.stringify(cityBean.addresses[num]));
    var searchedLength = localStorage.length - 1;
    localStorage.setItem("searched_city" + searchedLength, JSON.stringify(cityBean.addresses[0]));
    window.location.href = "index.html";
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


