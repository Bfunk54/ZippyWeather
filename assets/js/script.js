// Global variables
var city = '';

// DOM element references
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const todaysWeather = document.getElementById('todaysWeather');
const fiveDayForecast = document.getElementById('5dayForecast');
const searchHistory = document.getElementById('searchHistory');
const historyButton = document.getElementById('historyButton');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('theNewCity');

// Function to display the search history list.
function renderSearchHistory(search) {
    // loop through the history array creating a button for each item
    for (var i = 0; i < searchArr.length; i++){
      let historyButton = document.createElement('button');
      console.log(searchArr[i]);
      historyButton.classList.add('btn', 'btn-outline-primary');
      historyButton.textContent = searchArr[i];
      historyButton.setAttribute('id','historyButton');
      // append to the search history container
      searchHistory.appendChild(historyButton);
    }
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
  
      let temp = weather.main.temp;
      let windSpeed = weather.wind.speed;
      let humidity = weather.main.humidity;

      let date = new Date(weather.dt_txt);

      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      month += 1;
      JSON.stringify(month);
      JSON.stringify(day);
      JSON.stringify(year);
      let realDate = ' (' + month + '.' + day + '.' + year + ')';
      // let realDate = ` ${month + 1}/${day}/${year}`;
      let imgId = weather.weather[0].icon;

      let imgUrl = "https://openweathermap.org/img/wn/" + imgId + "@2x.png";

      let weatherImg = document.createElement('img');
      weatherImg.src = imgUrl;

    // document.create the elements you'll want to put this information in  
      let dataUl = document.createElement('ul');
    // append those elements somewhere
      dataUl.innerHTML += '<li> Temperature: ' + (((temp - 273.15) * 1.8 + 32).toFixed(2)) + ' °F</li>';
      dataUl.innerHTML += '<li> Wind Speed: ' + windSpeed + ' MPH</li>'
      dataUl.innerHTML += '<li> Humidity: ' + humidity + '%</li>';
      dataUl.classList.add('dataUl')
    // give them their appropriate content
     
      todaysWeather.appendChild(dataUl);
      const oneDataUl = document.querySelectorAll('.dataUl');
      oneDataUl[1]? oneDataUl[1].parentNode.removeChild(oneDataUl[1]) : console.log('didnt remove div' + oneDataUl);

      //Clear the last city and create a text node with the city name and put that on the page
      cityName.innerHTML = '';
      
      cityName.appendChild(document.createTextNode(city));
      cityName.innerHTML += realDate;
      cityName.appendChild(weatherImg);

      todaysWeather.classList.remove('hide');
  }
  
  // Function to display a FORECAST card given an object (from the renderForecast function) from open weather api
  // daily forecast.
  function renderForecastCard(forecast) {

    // Clear 5-day forecast container
    fiveDayForecast.innerHTML = '';

    // variables for data from api
      // temp, windspeed, etc.
      let tempArr = [];
      let windSpeedArr = [];
      let humidityArr = [];
      let dateArr = [];
      let imgArr = [];

      for (var i = 0; i < 5; i++){

      let temp = forecast[i].main.temp;
      tempArr.push(((temp - 273.15) * 1.8 + 32).toFixed(2));
      
      let windSpeed = forecast[i].wind.speed;
      windSpeedArr.push(JSON.stringify(windSpeed));
     
      let humidity = forecast[i].main.humidity
      humidityArr.push(JSON.stringify(humidity));

      let imgId = forecast[i].weather[0].icon;

      let date = new Date(forecast[i].dt_txt);

      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      month += 1;
      JSON.stringify(month);
      JSON.stringify(day);
      JSON.stringify(year);
      let realDate = month + '.' + day + '.' + year;
      // let realDate = ` ${month + 1}/${day}/${year}`;
      dateArr.push(realDate);

      let imgUrl = "https://openweathermap.org/img/wn/" + imgId + "@2x.png";

      let weatherImg = document.createElement('img');
      weatherImg.src = imgUrl;
      imgArr.push(weatherImg)
  }
    // Create elements for a card
    
    for (var i = 0; i < 5; i++){
      let cardDiv = document.createElement('div');
      let cardUl = document.createElement('ul');
      let humidityLi = document.createElement('li');
      let windSpeedLi = document.createElement('li');
      let tempLi = document.createElement('li');
      let dateText = document.createElement('h4');
      let dateNode = document.createTextNode(dateArr[i])
      let humidityNode = document.createTextNode('Humidity: ' + humidityArr[i] + '%');
      let windSpeedNode = document.createTextNode('Wind Speed: ' + windSpeedArr[i] + ' MPH');
      let tempNode = document.createTextNode('Temperature: ' + tempArr[i] + ' °F');
      
      // append all the elements
      humidityLi.appendChild(humidityNode);
      windSpeedLi.appendChild(windSpeedNode);
      tempLi.appendChild(tempNode);
      dateText.appendChild(dateNode);
      dateText.appendChild(imgArr[i]);
      cardUl.appendChild(dateText);
      cardUl.appendChild(humidityLi);
      cardUl.appendChild(windSpeedLi);
      cardUl.appendChild(tempLi);
      cardDiv.appendChild(cardUl);
      cardDiv.className = 'cards col';
      // append to forecast section
      fiveDayForecast.appendChild(cardDiv);
    }
    fiveDayForecast.classList.remove('hide');
  
  }
  
  // Function to display 5 day forecast.
  function renderForecast(dailyForecast) {
  // set up elements for this section
  console.log(dailyForecast[0]);
  let fiveDayArr = [];
  // Get data for 5 day forecast, turn each day into strings and put in the array
  for (var i = 0; i <= 39; i = i + 8) {
    fiveDayArr.push(dailyForecast[i]);
  }
      // send the data to our renderForecast function an array
          renderForecastCard(fiveDayArr);
    }
  
// Passes in the city name and data objects and calls them to other functions
  function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0]);
    renderForecast(data.list);
  }
  
  // Fetches weather data for given location from the Weather Geolocation
  // endpoint; then, calls functions to display current and forecast weather data.
  async function fetchWeather(location) {
    // varialbles of longitude, latitude, city name - coming from location
    let long = location.coord.lon;
    let lat = location.coord.lat;
    let name = location.name;

    // api url
    let apiKey = 'cc89612e36b533aff0217169aedace13';
    let apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=' + apiKey;
    // fetch, using the api url, .then that returns the response as json, .then that calls renderItems(city, data)
        const response = await fetch(apiURL);
        const data = await response.json();
        renderItems(name, data);
  }
  
  async function fetchCoords(search) {
    // variable for you api url
    const weathUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + search + '&appid=cc89612e36b533aff0217169aedace13'
        const response = await fetch(weathUrl);
        const data = await response.json();
    // fetch with your url, .then that returns the response in json, .then that does 2 things - calls appendToHistory(search), calls fetchWeather(the data)
        appendToHistory(search)
        fetchWeather(data)
  }
  
  function handleSearchFormSubmit(searchInput) {
    // Don't continue if there is nothing in the search form
    if (!searchInput.value) {
      return;
    }
  
    // e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    searchInput.value = '';
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
// if (historyButton){
historyButton?.addEventListener('click', function(e){
    e.preventDefault();
    handleSearchHistoryClick(historyButton.textContent);
})
