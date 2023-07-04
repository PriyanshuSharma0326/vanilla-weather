const locationElement = document.getElementById('location');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temp');
const weatherType = document.getElementById('weather-description');
const feelsLikeTemperature = document.getElementById('feels-like-temp');
const timestamp = document.getElementById('timestamp');

const locationInput = document.getElementById('input-location');
const errorText = document.getElementById('error-text');

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let weather = null;
let city = 'Delhi';

const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = `fc388d1fbee83420800b7942280eb40f`;

const init = () => {
    city = `Delhi`;
    timestamp.innerText = today.toLocaleDateString('en-IN', options);
    getWeather();
}

const setWeather = () => {
    locationElement.innerText = weather.location;
    weatherIcon.src = weather.iconURL;
    weatherIcon.alt = weather.altText;
    temperature.innerText = weather.temperature;
    weatherType.innerText = weather.weatherDescription;
    feelsLikeTemperature.innerText = weather.feelsLike;
}

const getWeather = async () => {
    try {
        weather = await fetch(`${baseURL}?q=${city}&units=metric&appid=${apiKey}`).then(res => {
            return res.json();
        }).then(response => {
            return {
                location: response.name,
                temperature: response.main.temp,
                weatherDescription: response.weather[0].main,
                iconURL: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
                altText: response.weather[0].description,
                feelsLike: response.main.feels_like
            }
        });
        setWeather();
        if(errorText.innerText.length) {
            errorText.innerText = '';
        }
    }
    catch(error) {
        errorText.innerText = 'Location doesn\'t exist!';
    }
}

const updateWeather = (newValue) => {
    city = newValue;
    getWeather();
    locationInput.value = '';
}

locationInput.addEventListener('change', (event) => {
    updateWeather(event.target.value);
});

init();
