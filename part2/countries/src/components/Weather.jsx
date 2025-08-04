import { useEffect, useState } from 'react';
import axios from 'axios';

function Weather({ city }) {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${
            import.meta.env.VITE_WEATHER_KEY
          }`
        )
        .then((response) => {
          setTemp(response.data);
          console.log(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, [city]);

  if (!temp || !temp.weather || !temp.main) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <img
        alt='icon'
        src={`http://openweathermap.org/img/w/${temp.weather[0].icon}.png`}
      />
      <p>Temperature {temp.main.temp}°C</p>
      <p>Wind {temp.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
