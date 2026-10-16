const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const messageContainer = document.getElementById('message-container');
const weatherCard = document.getElementById('weather-card');

const cityNameDisplay = document.getElementById('city-name');
const tempDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind');


class AppError extends Error {}

const GENERIC_ERROR = "Could not fetch data. Please try again.";

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    } else {
        showError("Please enter a city name.");
    }
});


cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

async function getWeatherData(city) {
    try {
        searchBtn.disabled = true; 
        showLoading("Fetching weather data...");

        
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);

        if (!geoResponse.ok) {
            throw new AppError(GENERIC_ERROR);
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new AppError("City not found. Please check the spelling and try again.");
        }

        const { latitude, longitude, name, country } = geoData.results[0];

      
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);

        if (!weatherResponse.ok) {
            throw new AppError(GENERIC_ERROR);
        }

        const weatherData = await weatherResponse.json();

        if (!weatherData.current) {
            throw new AppError(GENERIC_ERROR);
        }

        displayWeather(name, country, weatherData.current);

    } catch (error) {
        if (error instanceof AppError) {
            showError(error.message);
        } else if (!navigator.onLine) {
            showError("No internet connection. Please check your network and try again.");
        } else {
            showError(GENERIC_ERROR);
        }
    } finally {
        searchBtn.disabled = false;
    }
}

function displayWeather(city, country, current) {
    messageContainer.classList.add('hidden');
    weatherCard.classList.remove('hidden');

    cityNameDisplay.textContent = `${city}, ${country}`;
    tempDisplay.textContent = `${current.temperature_2m}°C`;
    conditionDisplay.textContent = getWeatherConditionText(current.weather_code);
    humidityDisplay.textContent = current.relative_humidity_2m ?? "N/A";
    windDisplay.textContent = current.wind_speed_10m;
}


function getWeatherConditionText(code) {
    const codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Light snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Light rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Light snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with light hail",
        99: "Thunderstorm with heavy hail"
    };
    return codes[code] || "Unknown conditions";
}

function showLoading(msg) {
    messageContainer.textContent = msg;
    messageContainer.className = "";
    weatherCard.classList.add('hidden');
}

function showError(msg) {
    messageContainer.textContent = msg;
    messageContainer.className = "error-msg";
    weatherCard.classList.add('hidden');
}