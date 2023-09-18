const apiKey = "dcb66753beab8eeb43ed7f4376e3244e"; // Obtén una API Key de OpenWeatherMap
const getWeatherButton = document.getElementById("get-weather-button");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value;

  if (city) {
    getWeather(city);
  } else {
    alert("Please, insert the city");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();

      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;

      weatherInfo.innerHTML = `
                <p>Clima en ${cityName}, ${country}:</p>
                <p>Temperatura: ${temperature}°C</p>
                <p>Descripción: ${description}</p>
            `;
    } else {
      weatherInfo.textContent = "This city is not found";
    }
  } catch (error) {
    console.error("Error:", error);
    weatherInfo.textContent = "There's an error obtaining the weather";
  }
}

