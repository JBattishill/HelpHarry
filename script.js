// Random Location Array
var randomLocations = [
  "Ubud, Indonesia",
  "New Orleans, USA",
  "Marrakesh, Morocco",
  "Paris, France",
  "Cape Town, South Africa",
  "Dubrovnik, Croatia",
  "Tokyo, Japan",
  "Vancouver, Canada",
  "Los Angeles, USA",
  "Vernazza, Italy",
  "Buenos Aires, Argentina",
  "London, England",
  "Jaipur, India",
  "Havana, Cuba",
  "Christchurch, New Zealand",
  "Hydra, Greece",
];
// Random Month Array
var month = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// Weather Variables
var weatherKey = "d9e3acc582b222c6021692be631852c5";
var travelCity = "";
var travelCountry = "";
var travelLat = "";
var travelLong = "";
var weatherDateStart = "";
var weatherDateEnd = "";
var travelMonth = "";
var travelLocation = "";

// Season Start and end dates - for North and South Hemispheres
const startNorthWinter = "2020-12-01";
const endNorthWinter = "2021-02-28";

const startNorthSpring = "2021-03-01";
const endNorthSpring = "2021-05-31";

const startNorthSummer = "2021-06-01";
const endNorthSummer = "2021-08-31";

const startNorthAutumn = "2021-09-01";
const endNorthAutumn = "2021-11-31";

const startSouthSummer = "2020-12-01";
const endSouthSummer = "2021-02-28";

const startSouthAutumn = "2021-03-01";
const endSouthAutumn = "2021-05-31";

const startSouthWinter = "2021-06-01";
const endSouthWinter = "2021-08-31";

const startSouthSpring = "2021-09-01";
const endSouthSpring = "2021-11-31";

// Season Variables
const northWinter = ["december", "january", "february"];
const northSpring = ["march", "april", "may"];
const northSummer = ["june", "july", "august"];
const northAutumn = ["september", "october", "november"];

const southSummer = ["december", "january", "february"];
const southAutumn = ["march", "april", "may"];
const southWinter = ["june", "july", "august"];
const southSpring = ["september", "october", "november"];

// Geolocation Variables
var geoKey = "234979e2ff9e423095e4b2c869c1c97b";
var hemisphere = "";

//GoogleAPI Variables
var imageKey = "AIzaSyDpsLn14cZzKJi0o0lQhMmwplnjl5wLN74";
var imageSearchID = "474f1fff433d047cf";
var searchQuery = "";
var travelSeason = "";

//Watches the form and listens for the enter key being pressed down - this is required because the form doesnt actually allow the submit button to submit.
// I assume I call the getData function weirdly, I put a little effort into fixing it but it didnt get far.
$('.eventEnter').keydown(function(event) {
  //KeyCode 13 is Enter
  if (event.keyCode == 13) {
      getData();
      return false;
  }
});

// Delays loading of the main page to allow the loading animation to run for a little longer (1.5 seconds, total load time of ~3 seconds), giving a cleaner smoother overall look.
// This is triggered from an onload event on the html <body> tag.
function delayLoad() {
  setTimeout(() => {
    userIP();
  }, 1500);
}

// Gets user IP Address and location to populate the Header, 
// This is triggered by the delayLoad function (above) which is triggered from an onload event on the html <body> tag.
function userIP() 
{
  var urlIP = "https://api.techniknews.net/ipgeo/";

  $.getJSON(urlIP, function (ipData) {
    var storeIPLat = ipData.lat;
    var storeIPLon = ipData.lon;
    var storeIPCity = ipData.city;
    IPLat = storeIPLat.toFixed(2);
    IPLon = storeIPLon.toFixed(2);

    var url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      IPLat +
      "&lon=" +
      IPLon +
      "&appid=" +
      weatherKey;

    $.getJSON(url, function (ipWeatherData) {
      var item = ipWeatherData;

      //API sends temp in Kelvin, minus 273.15 to get Celcius
      var ipTemp = item.main.temp - 273.15;
      var roundedTemp = ipTemp.toFixed(1);

      var ipWeather = item.weather[0].description;

      // Creating text to go in the header block
      var showIPCity = $("<h3>").html(
        "It looks like you are in " + storeIPCity
      );
      var showIPWeather = $("<h4>").html(
        "The weather is currently " +
          ipWeather +
          " and " +
          roundedTemp +
          " &#8451"
      );
      var showIPTemp = $('<p class="topSpace">').html(
        "Time to head somewhere exciting?"
      );

      $(".containerHeader").append(showIPCity, showIPWeather, showIPTemp);

      document.getElementById("loadingContent").classList.add("hidden");
      document.getElementById("header").classList.remove("hidden");
      document.getElementById("contentHider").classList.remove("hidden");
    });
  });
}

// Main function that gets GeoLocation information from GeoAPIfy and populates the locationContainer, it also calls the  weather and photo functions.
// This is triggered when the user presses submit button or enter while targeting the form.
function getData() {
  $(document).ready(function () {
    
  // Code to check the month is a valid spelling, throws error via alert if not.
    // Side note - I had 4 seperate error alerts caused by a mispelt month before this.
      // This also stops the getData function before the webpage needs to be reset so the user can just fix the error and try again.
   
    //getting travel month from form
    travelMonth = document.getElementById("travelMonth").value;
    //Convert to lowercase to check match format of the array "month"
    var testMonth = travelMonth.toLowerCase()

    // checks if the entry, now lowercase, matchs any of the months in the array of months, if it does NOT match, it throws an alert up with an error message and stops the function, else it continues.
    // The exclamation mark - ! means NOT - I know you know this, I just want to make sure you know I know this... I may have had an energy drink before writing this...)
    // 
    if (!month.includes(testMonth)) {
      alert("An error has occured. Please check the month you entered and try again.");
      return
    }

      //Calling function to find hemisphere of travel location
      findHemisphere();


    // Pulls the travelLocation input from the for and sets it to the variable travelLocation
    travelLocation = document.getElementById("travelLocation").value;

    //Setting up of URL for geolocation of travelLocation, uses variables for travel location and the relevant API key needed.
      // Sidenote -  To make my code look cleaner, I tried to make the geolocation section a seperate function like getPhotos/getWeather. 
      //  My goal was the have the getData function as essentially a module caller but when I tried (on Wednesday 26 October) after all the functionality was working,
      //  it completely broke the weatherAPI, I couldnt figure out why easily so I pulled the plug. With more time I would go back and try to fix that up.
    var url =
      "https://api.geoapify.com/v1/geocode/search?text=" +
      travelLocation +
      "&limit=1&format=json&apiKey=" +
      geoKey;

    $.getJSON(url, function (apiData) {

      //Storing the first result as variable "item" to allow for easier data sorting
      var item = apiData.results[0];

    // Storing the individual object items as variables to be used
      var storeCity = item.city;
      var storeCountry = item.country;
      var storeLat = item.lat;
      var storeLong = item.lon;

      // Storing city and country in variables to be used by APIs
      travelCity = storeCity;
      travelCountry = storeCountry;

      // lat and long needs to be 2 decimal places for WeatherAPI
      travelLat = storeLat.toFixed(2);
      travelLong = storeLong.toFixed(2);

 
      // Getting content on the page
        // Creating variables with HTML Tags to display the data on page.
        // The class "capitilise" (re)capitalises the travel month after it was put into lower case to be used in seasonal functions.
      var city = $("<h3>").html("City: " + storeCity);
      var country = $("<h3>").html("Country: " + storeCountry);
      var long = $('<p class = "topSpace">').html("Longitude: " + travelLong);
      var lat = $("<p>").html("Latitude: " + travelLat);
      var hemi = $("<p>").html("Hemisphere: " + hemisphere);
      var month = $('<p class="capitilise">').html("Month: " + travelMonth);
      var season = $("<p>").html("Season: " + travelSeason);

      // Appending the HTML variables to relevant container using the class
      $(".containerLocation").append(
        city,
        country,
        long,
        lat,
        hemi,
        month,
        season
      );   

      // Set search query to be used in getPhoto API call
      searchQuery = travelCity + " " + travelCountry + " in " + travelSeason;

      // Call function to get the Weather data.
      getWeather();

      // Call function to get the Photos.
      getPhotos();
    });
  });
}

// Gets a random Travel Location and Month from the arrays "randomLocations" and "month" and then pushes to the form inputs.
function getRandom() {
  // Counts the number of items in the array randomLocations and picks a random number to store in randomTravel.
  const randomTravel = Math.floor(Math.random() * randomLocations.length);
  // Variable travelLocation is set to the location at the number stored in randomTravel.
  travelLocation = (randomTravel, randomLocations[randomTravel]);

// Counts the number of items in the array "month" and picks a random number to store in randomTravel.
  const randomMonth = Math.floor(Math.random() * month.length);
// Variable travelMonth is set to the location at the number stored in randomMonth.
  travelMonth = (randomMonth, month[randomMonth]);

// Pushes the random Travel Location and Travel Month to the form feild without submitting or calling the getData function.
  document.getElementById("travelLocation").value = travelLocation;
  document.getElementById("travelMonth").value = travelMonth;
}

//API call using googleAPI to do a custom search for 9 images of the Travel Location in the Travel Season for display.
function getPhotos() {
  $(document).ready(function () {
    
    // Setting URL for API Call, this includes variables as set in other functions in addition to: 
        // API Key - required to verify my account. 
        // imageSearchID - This direct the API call to a particular search engine I set up that will only show images the come from the url www.unsplash.com, this was done to try to improve image quality.
        // searchQuery is from getData function, it is essentially - travelCity + travelCountry + travelSeason

    var url =
      "https://www.googleapis.com/customsearch/v1?imgSize=LARGE&imgType=photo&siteSearchFilter=i&imgColorType=color&searchType=image&num=9&key=" +
      imageKey +
      "&cx=" +
      imageSearchID +
      "&q=" +
      searchQuery;

    //Calling API using the above URL
    $.getJSON(url, function (apiData) {
      //Parses the images, using for a loop, creating a HTML item for appending for each one.
        // imgSrc is the url link for display
        // imgAlt is the images title, used for assigning each image and alt description for accessiblity purposes.
      for (var i = 0; i < apiData.items.length; i++) {
        var item = apiData.items[i];
        var imgSrc = item.link;
        var imgAlt = item.title;

        //This puts the image snippet as the image title which shows when hovering over the image.
        var imgTitle = item.snippet;
        
        // creating the html tag using above variables
        var imgtag = $(
          "<img src=" +
            imgSrc +
            " alt=" +
            imgAlt +
            " title=" +
            imgTitle +
            ">"
        );
        $(".resultPhotos").append(imgtag);
      }
    });

    //Creating a heading for above photos that explains what they are showing. Essentially showing what the search query was.
    var photoCity = $('<h2>').html(
        travelCity +
        ", " +
        travelCountry +
        " can look like this in " +
        travelSeason
    );
    //Appends heading to the photoHeading div
    $(".photoHeading").append(photoCity);

    // Changes the pages background gradient to be relevant to the season using preset CSS classes
    document.getElementById("body").classList.add(travelSeason);

    // Hides the form as the page isnt built for multiple requests. 
    document.getElementById("formHider").classList.add("hidden");
 
    // Hides the random button it sits outside the formHider wrapper.
    document.getElementById("randomBtn").classList.add("hidden");
   
    // Unhides a button to reset the page.
    document.getElementById("resetBtn").classList.remove("hidden");

    // Unhides the information section of the page
    document.getElementById("infoHider").classList.remove("hidden");

    //Delay to allow images and information to load properly and scrolls 450px down to bring the new data into the window.
        // Side note - I tried to get it to scroll to a particular div using scrollTo function but couldnt get it to work.
    setTimeout(() => {
      window.scrollBy(0, 450);
    }, 1000);

  });
}

//API call to Open-Meteo.com to get 3 months of weather data from December 2020 - November 2021, 
// Function calculates averages of Max Temp, Min Temp, Rainfall, Snowfall, locations timezone and gets the 45th day's Sunrise and Sunset time.
function getWeather() {

  // Calls functions to get seasonal start and end dates for weatherData 
      // Side note: I probably could have put all of the hemisphere/seasonal date functionality in 1 big function with all of the constants 
      // but today (Wednesday before Sunday due date), is not the time to be risking disrupting the entire program. If it aint broke...
  if (hemisphere === "North") {
    getSeasonDatesNorth();
  } else {
    getSeasonDatesSouth();
  }

  $(document).ready(function () {
  // Setting URL for API Call, this includes the variables as set in other functions - no API Key is needed for this Historical Weather Data
    var url =
      "https://archive-api.open-meteo.com/v1/era5?latitude=" +
      travelLat +
      "&longitude=" +
      travelLong +
      "&start_date=" +
      weatherDateStart +
      "&end_date=" +
      weatherDateEnd +
      "&timezone=auto&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,snowfall_sum";

  // Completes API call using URL from above, and returns data as variable "weatherData"
    $.getJSON(url, function (weatherData) {

      // Setting item to weatherData.daily for simplification of data processing and understanding.
      var item = weatherData.daily;

      // variables to isolate the 3 months worth of data for eachand store them for calculating the averages
      var calcMaxTemp = item.temperature_2m_max;
      var calcMinTemp = item.temperature_2m_min;
      var calcRainfall = item.rain_sum;
      var calcSnowfall = item.snowfall_sum;
      var calcSunrise = item.sunrise;
      var calcSunset = item.sunset;
      var timezone = weatherData.timezone;

      // Slicing time down to HH:MM - I set it to use 45th day as a hacky solution for finding the median of the season...
        // (3 months is ~90 days, 45 is half of 90, big math...)
          // The better solution would be finding the real median but how much more accurate would that be? Is it worth the time? I think not.
      var avgSunrise = calcSunrise[45].slice(-5);
      var avgSunset = calcSunset[45].slice(-5);


      // Calculating the averages and stores as a new variable.
        // Essentially it reduces the array by adding all items together, the total is than divded by the amount of items in the array. 
      var avgMaxTemp = calcMaxTemp.reduce((a, b) => a + b) / calcMaxTemp.length;
      var avgMinTemp = calcMinTemp.reduce((a, b) => a + b) / calcMinTemp.length;
      var avgRainfall = calcRainfall.reduce((a, b) => a + b) / calcRainfall.length;
      var avgSnowfall = calcSnowfall.reduce((a, b) => a + b) / calcSnowfall.length;


      // Setting cleaner named storage variables to be used in the appending process to get data on page.
      var storeSunrise = avgSunrise;
      var storeSunset = avgSunset; 
      
      // Rounding temps to 1 decimal place and rain/snow fall to 2 decimals
      var storeMaxTemp = avgMaxTemp.toFixed(1);
      var storeMinTemp = avgMinTemp.toFixed(1);
      var storeRainfall = avgRainfall.toFixed(2);
      var storeSnowfall = avgSnowfall.toFixed(2);

      // Getting content on the page
        // Creating variables with HTML Tags to display the data on page. - "&#8451" is symbol for degrees celcius
        var maxTemp = $("<h3>").html("Max Temp: " + storeMaxTemp + "&#8451");
        var minTemp = $("<h3>").html("Min Temp: " + storeMinTemp + "&#8451");
        var sunrise = $('<p class="topSpace">').html("Sunrise: " + storeSunrise);
        var sunset = $("<p>").html("Sunset: " + storeSunset);
        var rainfall = $("<p>").html("Rainfall: " + storeRainfall + "mm");
        var snowfall = $("<p>").html("Snowfall: " + storeSnowfall + "mm");
        var timezone = $("<p>").html("Timezone: " + timezone);

        // Appending the HTML variables to the relevant div via the class name
        $(".containerWeather").append(
          maxTemp,
          minTemp,
          sunrise,
          sunset,
          rainfall,
          snowfall,
          timezone
        );
    });
  });
}

//Finds the travel locations hempishere which is used in Seasonal variables later.
function findHemisphere() {
// Checks if the latitude of the is above the Equator and sets the variable "hemisphere" to North if it is or South if it is below. 
if (travelLat > 0) {
  (hemisphere = "North"), findSeasonNorth();
} else {
  (hemisphere = "South"), findSeasonSouth();
}
}

// Gets the input month and compares to the Season arrays for Northern Hemisphere.
function findSeasonNorth() {

  // converts the month to lower case to ensure it matches the months in arrays which are all lower case
  var userMonth = travelMonth.toLowerCase();

  // Simple if/elseif/else, loop that compares the month to each of the 4 seasonal arrays.
  if (northWinter.includes(userMonth)) {
    travelSeason = "Winter";
  } else if (northSpring.includes(userMonth)) {
    travelSeason = "Spring";
  } else if (northSummer.includes(userMonth)) {
    travelSeason = "Summer";
  } else travelSeason = "Autumn";
}

// Gets the input month and compares to the Season arrays for Southern Hemisphere.
function findSeasonSouth() {

  // converts the month to lower case to ensure it matches the months in arrays which are all lower case
  var userMonth = travelMonth.toLowerCase();

  // Simple if/elseif/else Error loop that compares the month to each of the 4 seasonal arrays. 
  if (southWinter.includes(userMonth)) {
    travelSeason = "Winter";
  } else if (southSpring.includes(userMonth)) {
    travelSeason = "Spring";
  } else if (southSummer.includes(userMonth)) {
    travelSeason = "Summer";
  } else travelSeason = "Autumn";

}

// Identifies travel season for Northern Hemisphere and sets the variables "weatherDateStart" and "weatherDateEnd" essential for the API calls in the getWeather function.
function getSeasonDatesNorth() {

  // Simple if/elseif/else error, loop that compares the month to each of the 4 seasonal arrays. 
  if (travelSeason === "Winter") {
    weatherDateStart = startNorthWinter;
    weatherDateEnd = endNorthWinter;
  } else if (travelSeason === "Spring") {
    weatherDateStart = startNorthSpring;
    weatherDateEnd = endNorthSpring;
  } else if (travelSeason === "Summer") {
    weatherDateStart = startNorthSummer;
    weatherDateEnd = endNorthSummer;
  } else {
    weatherDateStart = startNorthAutumn;
    weatherDateEnd = endNorthAutumn;
}
}

// Identifies travel season for Southern Hemisphere and sets the variables "weatherDateStart" and "weatherDateEnd" essential for the API calls in the getWeather function.
function getSeasonDatesSouth() {
  if (travelSeason === "Winter") {
    weatherDateStart = startSouthWinter;
    weatherDateEnd = endSouthWinter;
  } else if (travelSeason === "Spring") {
    weatherDateStart = startSouthSpring;
    weatherDateEnd = endSouthSpring;
  } else if (travelSeason === "Summer") {
    weatherDateStart = startSouthSummer;
    weatherDateEnd = endSouthSummer;
  } else {
    weatherDateStart = startSouthAutumn;
    weatherDateEnd = endSouthAutumn;
  } 
}