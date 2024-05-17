// API key for OpenWeatherMap
const apikey = "1ece1fd459fbf308e309f572eed5c007";
// Base URL for fetching weather data
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// Select the search input box and button from the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
// Select the weather icon element from the DOM
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather data for a given city
async function checkWeather(city) {
    // Fetch weather data from the API
    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    // If the city is not found (status code 404), display the error message
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        // Parse the JSON data from the response
        const data = await response.json();

        // Update the DOM with the fetched weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Determine the appropriate weather icon based on the weather condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        switch (weatherCondition) {
            case "clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "images/mist.png";
                break;
            case "clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "snow":
                weatherIcon.src = "images/snow.png";
                break;
            default:
                weatherIcon.src = "null";
        }

        // Display the weather information and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add an event listener to the search button to fetch weather data when clicked
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
