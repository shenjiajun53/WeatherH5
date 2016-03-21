/**
 * Created by shenjiajun on 2016/3/21.
 */
var APIKEY = "0efd9b4f14275d37789a2f57e5101852";
function buildUrl(url, parameters) {
    var qs = "";
    for (var key in parameters) {
        var value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}

function currentWeatherUrl(lantitude, longitude, lang) {
    return "http://api.weather.com/v1/" + "geocode/" + lantitude + "/" + longitude + "/" + "observations/current.json?apiKey=" + APIKEY + "&language=" + lang + "&units=m";
}

function forcastHourlyWeatherUrl(lantitude, longitude, lang) {
    return "http://api.weather.com/v1/" + "geocode/" + lantitude + "/" + longitude + "/" + "forecast/hourly/24hour.json?apiKey=" + APIKEY + "&language=" + lang + "&units=m";
}

function forecastDailyWeatherUrl(lantitude, longitude, lang) {
    return "http://api.weather.com/v1/" + "geocode/" + lantitude + "/" + longitude + "/" + "forecast/daily/5day.json?apiKey=" + APIKEY + "&language=" + lang + "&units=m";
}


function findCityByGeoLocation(geolocation, lang, withLang) {
    return "http://api.weather.com/v2/location?" + "geocode=" + geolocation + "&language=" + lang + "&format=" + "json" + "&apiKey=" + APIKEY;
}

function findCityByName(name, lang, withLang) {
    return "http://api.weather.com/v2/location?" + "address=" + name + "&language=" + lang + "&format=" + "json" + "&apiKey=" + APIKEY;
}


var cityBean = {
    "metadata": {
        "version": "v2",
        "transaction_id": "1458544289748:-171226551",
        "generated_time": 1458544289,
        "total_cache_time_secs": 86400,
        "status_code": 200,
        "language": "zh-CN",
        "latitude": 31.22,
        "longitude": 121.54,
        "format": "json"
    },
    "addresses": [{
        "latitude": 31.22,
        "longitude": 121.54,
        "address": "丁香路",
        "locality": "浦东新区",
        "admin_district": "上海市",
        "country": "中华人民共和国",
        "country_code": "CN"
    }]
};

var currentWeatherBean = {
    "metadata": {
        "language": "zh-CN",
        "transaction_id": "1458546612249:-1457749884",
        "version": "1",
        "latitude": 31.22,
        "longitude": 121.54,
        "units": "m",
        "expire_time_gmt": 1458547212,
        "status_code": 200
    },
    "observation": {
        "class": "observation",
        "expire_time_gmt": 1458547212,
        "obs_time": 1458545400,
        "obs_time_local": "2016-03-21T15:30:00+0800",
        "wdir": 110,
        "icon_code": 34,
        "icon_extd": 3400,
        "sunrise": "2016-03-21T05:56:33+0800",
        "sunset": "2016-03-21T18:05:54+0800",
        "day_ind": "D",
        "uv_index": 3,
        "uv_warning": 0,
        "wxman": "wx1000",
        "obs_qualifier_code": null,
        "ptend_code": 2,
        "dow": "星期一",
        "wdir_cardinal": "東南偏東風",
        "uv_desc": "中等",
        "phrase_12char": null,
        "phrase_22char": null,
        "phrase_32char": "晴朗",
        "ptend_desc": "降温",
        "sky_cover": "晴朗",
        "clds": "CLR",
        "obs_qualifier_severity": null,
        "vocal_key": "OT59:OX3400",
        "metric": {
            "wspd": 14,
            "gust": null,
            "vis": 9.99,
            "mslp": 1021.0,
            "altimeter": 1021.0,
            "temp": 15,
            "dewpt": 6,
            "rh": 55,
            "wc": 15,
            "hi": 15,
            "temp_change_24hour": -20,
            "temp_max_24hour": 17,
            "temp_min_24hour": 8,
            "pchange": -1.02,
            "feels_like": 15,
            "snow_1hour": 0.0,
            "snow_6hour": 0.0,
            "snow_24hour": 0.0,
            "snow_mtd": null,
            "snow_season": null,
            "snow_ytd": null,
            "snow_2day": null,
            "snow_3day": null,
            "snow_7day": null,
            "ceiling": null,
            "precip_1hour": 0.0,
            "precip_6hour": 0.0,
            "precip_24hour": 0.0,
            "precip_mtd": null,
            "precip_ytd": null,
            "precip_2day": null,
            "precip_3day": null,
            "precip_7day": null,
            "obs_qualifier_100char": null,
            "obs_qualifier_50char": null,
            "obs_qualifier_32char": null
        }
    }
};

