import React, { useEffect, useState } from "react";

function Weather() {
    const [location, setLocation] = useState("London");
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("matric");

    useEffect(() => {
        fetchWeather();
    }, [units]);

    async function fetchWeather() {
        if (!location) return;
            const apiKey = 'bd47d0f2e908bac912dc664001d426ee';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeather(data);
        }

    function convertTimeStamp(timestamp, timezone){
        const convertTimezone = timezone / 3600;
   
       const date = new Date(timestamp * 1000);
       
       const options = {
           weekday: "long",
           day: "numeric",
           month: "long",
           year: "numeric",
           hour: "numeric",
           minute: "numeric",
           timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
           hour12: true,
       }
       return date.toLocaleString("en-US", options)
      
   }
   
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchWeather();
        }
    }

    const toggleUnits = () => {
        setUnits(units === "metric" ? "imperial" : "metric");
    };

    function convertCountryCode(country){
        let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
        return regionNames.of(country)
    }

    return (
        <div>
            <div className="header">
                <input type="text" placeholder="Enter city name" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={handleKeyDown}/>
                <span className="switch_units" onClick={toggleUnits}>Switch to: {units === "metric" ? "°F" : "°C"}</span>
            </div>
            {weather && weather.weather && weather.weather[0] && (
                <div className="weather_body ">
                    <h1>{weather.name}, {convertCountryCode(weather.sys.country)}</h1>
                    <div className="date">
                        <span>{convertTimeStamp(weather.dt, weather.timezone)}</span>
                    </div>
                    <p>{weather.weather[0].description}</p>
                        <div className="icon_temp">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}
                            />
                        </div>
                    <p className="weather_temp">{Math.round(weather.main.temp)}<span>&deg;</span></p>
                        <div className="min_max">
                            <p className="min">Min: {Math.round(weather.main.temp_min)}&deg;</p>
                            <p>Max: {Math.round(weather.main.temp_max)}&deg;</p>
                        </div>

                    <div className="weather_info">
                        <div className="weather_card">
                            <div>
                                <p>Real Feel</p>
                                <p>{Math.round(weather.main.feels_like)}&deg;</p>
                            </div>
                        </div>
                        <div className="weather_card">
                            <p>Humidity</p>
                            <p>{weather.main.humidity}%</p>
                        </div>
                        <div className="weather_card">
                            <p>Wind Speed</p>
                            <p>{weather.wind.speed} {units === "imperial" ? "mph" : "m/s"}</p>
                        </div>
                        <div className="weather_card">
                            <div>
                                <p>Pressure</p>
                                <p>{weather.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Weather;