document.getElementById('searchBtn').addEventListener('click', function() {
  let city = document.getElementById('cityInput').value;
  fetchWeather(city);
});

// Event listener for Enter key press in the input field
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      document.getElementById('searchBtn').click(); // Simulate a click on the search button
    }
  });
  
  // Event listener for search button click
  document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
  });

function fetchWeather(city) {
    const apiKey = '11d68b720d46e9ee3fc779ebbd69ad70'; // Replace 'YOUR_API_KEY' with your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
        fetchSunriseSunset(city, apiKey); // Fetch sunrise and sunset times
        const isRaining = data.weather.some(weather => weather.main.toLowerCase() === 'rain');
        if (isRaining) {
            makeItRain();
        }
        
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
        document.getElementById('weatherResult').innerHTML = 'Error fetching weather data. Please try again later.';
      });
  }
  
  function fetchSunriseSunset(city, apiKey) {
    const sunriseSunsetUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(sunriseSunsetUrl)
      .then(response => response.json())
      .then(data => {
        const sunriseTimestamp = data.sys.sunrise * 1000; // Convert seconds to milliseconds
        const sunsetTimestamp = data.sys.sunset * 1000; // Convert seconds to milliseconds
        const currentTime = new Date().getTime();
  
        if (currentTime > sunriseTimestamp && currentTime < sunsetTimestamp) {
          // It's daytime
          document.body.classList.remove('night');
          document.body.classList.add('day');
        } else {
          // It's nighttime
          document.body.classList.remove('day');
          document.body.classList.add('night');
        }
      })
      .catch(error => {
        console.log('Error fetching sunrise and sunset data:', error);
      });
  }

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
  
    let weatherIcon;
    if (description.includes('rain')) {
      weatherIcon = '<img class="weather-icon" src="rainy.png" alt="Rainy">';
    } else if (description.includes('clear')) {
      weatherIcon = '<img class="weather-icon" src="sun.png" alt="Sunny">';
    } else if (description.includes('cloud')) {
      weatherIcon = '<img class="weather-icon" src="cloudy.png" alt="Cloudy">';
    } else {
      weatherIcon = '<img class="weather-icon" src="default_icon.png" alt="Weather">';
    }
  
    const weatherHtml = `
      <div class="weather-info">
        <p>${cityName}</p>
        <h2>${temperature}°C</h2>
        <p>${description}</p>
      </div>
      <div class="weather-icon-container">
        ${weatherIcon}
      </div>
    `;
  
    document.getElementById('weatherResult').innerHTML = weatherHtml;
  }

  var makeItRain = function() {
    //clear out everything
    $('.rain').empty();
  
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
  
    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }
  
  $('.splat-toggle.toggle').on('click', function() {
    $('body').toggleClass('splat-toggle');
    $('.splat-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  $('.back-row-toggle.toggle').on('click', function() {
    $('body').toggleClass('back-row-toggle');
    $('.back-row-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  $('.single-toggle.toggle').on('click', function() {
    $('body').toggleClass('single-toggle');
    $('.single-toggle.toggle').toggleClass('active');
    makeItRain();
  });
  
  
  
