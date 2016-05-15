var units = 'imperial'; // units set to imperial by default

// retreive geolocation, if successful, passes callback function getWeather
getLocation = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert("Failed to get location. Please refresh the page and try again.");
  }
};

// getWeather uses openweather API and assigns variables to JSON elements
getWeather = function getWeather(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  wUnderground = 'https://api.wunderground.com/api/b3566263eb9e482f/conditions/forecast/alert/q/' + lat + ',' + long + '.json';
  console.log(wUnderground);
  $.getJSON(wUnderground, function(data) {
    getWeatherData(data);
    getWeatherIcon(data);
  });
};

function getWeatherData(data) {

  // unitless data
  var windDir = data.current_observation.wind_dir;
  var location = data.current_observation.display_location.full;
  area.innerHTML = location;
  desc.innerHTML = toTitleCase(data.current_observation.icon);
  
  // units given in imperial or metric
  if (units === 'imperial') {
    var temp = data.current_observation.temp_f;
    var low = data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
    var high = data.forecast.simpleforecast.forecastday[1].high.fahrenheit;
    var feel = data.current_observation.feelslike_f;
    var windSpeed = data.current_observation.wind_mph;
    currentTemp.innerHTML = temp + " °F";
    weather.innerHTML = "Feels like: " + feel + " °F" + "<br>High: " + high + " °F" + "<br>Low: " + low + " °F" + "<br>Wind: " + windSpeed + " mph, " + windDir;

  } 
  else {
    var temp = data.current_observation.temp_c;
    var low = data.forecast.simpleforecast.forecastday[1].low.celsius;
    var high = data.forecast.simpleforecast.forecastday[1].high.celsius;
    var feel = data.current_observation.feelslike_c;
    var windSpeed = data.current_observation.wind_kph;
    currentTemp.innerHTML = temp + " °C";
    weather.innerHTML = "Feels like: " + feel + " °C" + "<br>High: " + high + " °C" + "<br>Low: " + low + " °C" + "<br>Wind: " + windSpeed + " kph, " + windDir;
  }
}

function getWeatherIcon(data) {
  
  var icon = data.current_observation.icon_url;
  // replacing beginning of url and .gif
  icon = icon.replace(/.*\/|\.gif/gi, '');

  // changes weather icon 
  switch (icon) {  
    case 'sunny':
    case 'clear':
      showIcon('sunny');
      showIcon('rays');
      $('body').css('background-image', 'url("http://www.aspenchamber.org/sites/default/files/images/Beach.stockimage.jpg")');
      break;
    case 'mostlysunny':
    case 'partlysunny':
      showIcon('sun-shower');
      showIcon('rays')
      $('body').css('background-image', 'url("http://farm3.static.flickr.com/2288/2264511936_a8447aa994_o.jpg")');
      break;
    case 'partlycloudy':
    case 'mostlycloudy':
    case 'cloudy':
    case 'fog':
    case 'hazy':
      showIcon('cloudy');
      $('body').css('background-image', 'url("http://hayatimagazine.com/wp-content/uploads/2015/04/tree-under-cloudy-sky-nature-hd-wallpaper-1920x1200-3821.jpg")');
      break;  
    case 'rain':
      showIcon('rainy');
      $('body').css('background-image', 'url("http://www.bearcastmedia.com/wp-content/uploads/2016/04/rainyday.jpeg")');
      break;
    case 'tstorms':
    case 'nt_tstorms':
      showIcon('thunder-storm');
      $('body').css('background-image', 'url("http://ekkostorm.com/wp-content/uploads/2015/11/autumn-thunderstorm.jpg")');
      break;
    case 'sleet':
    case 'snow':
    case 'flurries':
      showIcon('flurries');
      $('body').css('background-image', 'url("http://www.zastavki.com/pictures/originals/2012/Winter_Snowfall_in_mountains_036351_.jpg")');
      break;
    case 'nt_clear':
    case 'nt_sunny':
    case 'nt_mostlysunny':
      showIcon('sunny');
      $('body').css('background-image', 'url("https://aqu52.files.wordpress.com/2012/04/milky-way-over-germany.jpg")');
      break;
    case 'nt_cloudy':
    case 'nt_fog':
    case 'nt_hazy':
    case 'nt_mostlycloudy':
    case 'nt_partlycloudy':
    case 'nt_partlysunny':
      showIcon('sun-shower');
      $('body').css('background-image', 'url("http://cdn.pcwallart.com/images/night-sky-clouds-wallpaper-1.jpg")');
      break;
    case 'nt_rain':
      showIcon('sun-shower');
      showIcon('rain');
      $('body').css('background-image', 'url("http://2.bp.blogspot.com/-9E98oK4a-RQ/VV7xcHXH4bI/AAAAAAAANf8/zxtw1WfuG-o/s1600/Rain%2BWindow%2BCity%2B%25284%2529.jpg")');
      break;
    case 'nt_sleet':
    case 'nt_snow':
    case 'nt_flurries':
      showIcon('flurries');
      $('body').css('background-image', 'url("https://chrismartinphotography.files.wordpress.com/2014/04/night-snow-c2a9-christopher-martin-437078.jpg")');
      break;
    default:
      showIcon('qmark');
      $('body').css('background-image', 'url("https://thetab.com/blogs.dir/32/files/2016/05/maxresdefault-2.jpg")');     
  }
}

function showIcon(iconClass) {
  $('div.' + iconClass).removeClass('hide');
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

$(document).ready(function() {

  // Initial page load
  getLocation();

  // When a radio button is changed the JSON values and units are updated
  $('input[type="radio"][name="units"]').change(function() {
    units = $('input[type="radio"][name="units"]:checked').val();
    getLocation();
  })
});