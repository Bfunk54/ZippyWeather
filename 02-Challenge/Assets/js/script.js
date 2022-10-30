
// Global variables
var city = '';



// DOM element references
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const todaysWeather = document.getElementById('todaysWeather');
const fiveDayForecast = document.getElementById('5dayForecast');
const searchHistory = document.getElementById('searchHistory');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('theNewCity');
// search form
// search input
// container/section for today's weather
// container/section for the forecast 
// search history container


// Function to display the search history list.
function renderSearchHistory(search) {
    // empty the search history container\
    searchHistory.innerHTML = '';
    // loop through the history array creating a button for each item
    for (var i = 0; i < searchArr.length; i++){
      let historyButton = document.createElement('button');
      console.log(searchArr[i]);
      historyButton.textContent = searchArr[i];
      searchHistory.appendChild(historyButton);
    }
      // append to the search history container
  }
  
    let searchArr = [];

  // Function to update history in local storage then updates displayed history.
  function appendToHistory(search) {
    // push search term into search history array
    console.log(search);
    let newSearch = JSON.stringify(search);
    console.log(search);
    // set search history array to local storage
    localStorage.setItem('searchHistory', search)
    initSearchHistory();
  }
  
  // Function to get search history from local storage
  function initSearchHistory() {
     // get search history item from local storage
     let historyStr = localStorage.getItem('searchHistory');
     console.log(historyStr);
     searchArr.push(historyStr);
     console.log(searchArr);
  
    // set search history array equal to what you got from local storage
    renderSearchHistory();
  }
  
  // Function to display the CURRENT weather data fetched from OpenWeather api.
  function renderCurrentWeather(city, weather) {
    // Store response data from our fetch request in variables
      // temperature, wind speed, etc.
      console.log(weather);

      let temp = weather.main.temp;
      let windSpeed = weather.wind.speed;
      let humidity = weather.main.humidity;
      console.log(temp, windSpeed, humidity);
  
  
    // document.create the elements you'll want to put this information in  
      let dataUl = document.createElement('ul');
  
    // append those elements somewhere
      dataUl.innerHTML += '<li> Temperature: ' + temp + '</li>';
      dataUl.innerHTML += '<li> Wind Speed: ' + windSpeed + '</li>'
      dataUl.innerHTML += '<li> Humidity: ' + humidity + '</li>';
  
    // give them their appropriate content
      console.log(todaysWeather);
      todaysWeather.appendChild(dataUl);
      // let theCity = JSON.stringify(city);
      console.log(city);
      // city.innerHTML;
      //Clear the last city and create a text node with the city name and put that on the page
      cityName.innerHTML = '';
      cityName.appendChild(document.createTextNode(city));
  }
  
  // Function to display a FORECAST card given an object (from our renderForecast function) from open weather api
  // daily forecast.
  function renderForecastCard(forecast) {
    // Parse data back into json to make it easier to grab data points
    // let forecastObjs = [];
    // for (var i = 0; i < 5; i++) {
    //   let dayData = JSON.parse(forecast[i]);
    //   forecastObjs += dayData;
    // }
    // console.log(forecastObjs);

    // Clear 5-day forecast container
    fiveDayForecast.innerHTML = '';

    // variables for data from api
      // temp, windspeed, etc.
      let tempArr = [];
      let windSpeedArr = [];
      let humidityArr = [];

      for (var i = 0; i < 5; i++){
      
      let temp = forecast[i].main.temp;
      tempArr.push(JSON.stringify(temp));
      console.log(tempArr);
      
      let windSpeed = forecast[i].wind.speed;
      console.log(windSpeedArr);
      windSpeedArr.push(JSON.stringify(windSpeed));
     
      let humidity = forecast[i].main.humidity
      humidityArr.push(JSON.stringify(humidity));
      console.log(humidityArr);
      // console.log(windSpeed);
      // console.log(humidity);
      }
    // Create elements for a card
    
    for (var i = 0; i < 5; i++){
      let cardDiv = document.createElement('div');
      let cardUl = document.createElement('ul');
      let humidityLi = document.createElement('li');
      let windSpeedLi = document.createElement('li');
      let tempLi = document.createElement('li');
      let humidityNode = document.createTextNode('Humidity: ' + humidityArr[i] + '%');
      let windSpeedNode = document.createTextNode('Wind Speed: ' + windSpeedArr[i] + ' MPH');
      let tempNode = document.createTextNode('Temperature: ' + tempArr[i] + '°F');

      // append all the elements
      humidityLi.appendChild(humidityNode);
      windSpeedLi.appendChild(windSpeedNode);
      tempLi.appendChild(tempNode);
      cardUl.appendChild(humidityLi);
      cardUl.appendChild(windSpeedLi);
      cardUl.appendChild(tempLi);
      cardDiv.appendChild(cardUl);
      // append to forecast section
      fiveDayForecast.appendChild(cardDiv);
    }
  
  }
  
  // Function to display 5 day forecast.
  function renderForecast(dailyForecast) {
  // set up elements for this section
  console.log(dailyForecast[0]);
  let fiveDayArr = [];
  // Get data for 5 day forecast, turn each day into strings and put in the array
  for (var i = 0; i < 5; i++) {
    console.log(dailyForecast[i]);
    fiveDayArr.push(dailyForecast[i]);
    console.log(fiveDayArr);
  }
  
      // send the data to our renderForecast function an array
          renderForecastCard(fiveDayArr);
    }
  

// Passes in the city name and data objects and calls them to other functions
  function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0]);
    console.log(city, data.list);
    renderForecast(data.list);
  }
  
  // Fetches weather data for given location from the Weather Geolocation
  // endpoint; then, calls functions to display current and forecast weather data.
  async function fetchWeather(location) {
    // varialbles of longitude, latitude, city name - coming from location
    let long = location.coord.lon;
    let lat = location.coord.lat;
    let name = location.name;
    console.log('longitude is: ' + long);
    console.log('latitude is: ' + lat);
    console.log('name is: ' + name);
    // api url
    let apiKey = 'cc89612e36b533aff0217169aedace13';
    let apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
    // fetch, using the api url, .then that returns the response as json, .then that calls renderItems(city, data)
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(name, data);
        renderItems(name, data);
  }
  
  async function fetchCoords(search) {
    // variable for you api url
    const weathUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + '&appid=cc89612e36b533aff0217169aedace13'
        const response = await fetch(weathUrl);
        const data = await response.json();
        console.log(data);
    // fetch with your url, .then that returns the response in json, .then that does 2 things - calls appendToHistory(search), calls fetchWeather(the data)
        appendToHistory(search)
        fetchWeather(data)
  }
  
  function handleSearchFormSubmit(searchInput) {
    console.log(searchInput);
    // Don't continue if there is nothing in the search form
    if (!searchInput.value) {
      return;
    }
  
    // e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    searchInput.value = '';
    console.log(search);
  }
  
  function handleSearchHistoryClick(e) {
    // grab whatever city is is they clicked
    
    fetchCoords(search);
  }
  
  initSearchHistory();
  // click event to run the handleFormSubmit 
searchButton.addEventListener('click', function(e){
    e.preventDefault();
    handleSearchFormSubmit(searchInput)
})
  // click event to run the handleSearchHistoryClick