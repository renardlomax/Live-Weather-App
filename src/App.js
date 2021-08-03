import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import {Table} from 'react-bootstrap';




function App() {
  const [humidity, setHumidity] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('')
  const [temperature, setTemperature] = useState(0);
  const [cityname, setCityname] = useState('')
  const [wind, setWind] = useState('')

  const savePosition = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

 const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(savePosition)
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fa9a38080dd2fb9c9a14ccae3b82a1c6&units=metric`);
      console.log(response.data)
      setCountry(response.data.sys.country)
      setTemperature(Math.ceil(response.data.main.temp* 9 / 5 + 32 )) ;
      setCityname(response.data.name);
      setWind(response.data.wind.speed);
      setWeather(response.data.weather[0].description);
      setHumidity(response.data.main.humidity);
    } catch (err) {
      console.log(err);
    }
    }
    
   
  
  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);
  
    return (
      <section>
        
        <div className="App">
        <div className="app__container">
          <div className="h1">
            <h1>Weather App</h1>
          </div>
          
          <div className="h2">
            <br/>
            <br/>
            <h3> Country: {country}</h3>
            <h3> Location: {cityname}</h3>
            <h3> Temperature: {temperature}℉</h3>
            <h3> Weather: {weather}</h3>
            <h3> Wind: {wind} mph</h3>
            <h3> Humidity: {humidity} %</h3>
          </div>
        </div>
       </div>
      
      </section>
     
    );
}

export default App;
