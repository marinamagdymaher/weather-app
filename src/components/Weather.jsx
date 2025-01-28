import { useState, useEffect, useRef } from "react";
import "./Weather.css";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": "/clear.png",
    "01n": "/clear.png",
    "02d": "/cloud.png",
    "02n": "/cloud.png",
    "03d": "/cloud.png",
    "03n": "/cloud.png",
    "04d": "/drizzle.png",
    "04n": "/drizzle.png",
    "09d": "/rain.png",
    "09n": "/rain.png",
    "10d": "/rain.png",
    "10n": "/rain.png",
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || "/clear.png";
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in Fetch weather Data");
      console.log(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src="/search.png"
          alt="search.png"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="clear.png" className="weather-icon" />
      <p className="temprature">{weatherData.temp}°c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src="/humidity.png" alt="humidity.png" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src="/wind.png" alt="wind.png" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
