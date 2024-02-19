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
    const apiKey = config.MY_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
        fetchSunriseSunset(city, apiKey); // Fetch sunrise and sunset times 
        const isRaining = data.weather.some(weather => weather.main.toLowerCase() === 'rain' || weather.main.toLowerCase() === 'drizzle');
        if (isRaining) {
            const rainElements = document.getElementsByClassName('rain');
            for (let i = 0; i < rainElements.length; i++) {
                rainElements[i].style.visibility = 'visible';
            }
        } else {
            const rainElements = document.getElementsByClassName('rain');
            for (let i = 0; i < rainElements.length; i++) {
                rainElements[i].style.visibility = 'hidden';
            }
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
    if (description.includes('rain') || description.includes('drizzle')) {
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

