import React, { useEffect, useState } from "react";
import "./Style.css";
import WeatherCard from "./WeatherCard";
const Temp = () => {
  const [searchValue, setSearchValue] = useState("Mumbai");
 const[tempInfo,setTempInfo]=useState({});
  const getInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=848f694ebb65637dd7733e1a98cddeab`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myWeather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myWeather);
      console.log(temp);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
 
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search.."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getInfo}>
            Search
          </button>
        </div>
      </div>

     <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
