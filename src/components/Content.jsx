import React, { useState, useEffect } from "react";
import fetchWeatherData from "../services/GetServices";
import cloudy from "../assets/bgImages/cloudy.jpg";
import rainy from "../assets/bgImages/rainy.jpg";
import sunny from "../assets/bgImages/sunny.jpg";
import snow from "../assets/bgImages/snow.jpg";
import thunder from "../assets/bgImages/thunder.jpg";
import overcast from "../assets/bgImages/overcast.jpg";
import mist from "../assets/bgImages/mist.jpg";
import Box from "./box";

export const Content = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("London");

  // Fetch initial weather data for London
  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherData(location);
      if (data) setWeather(data);
    };
    getWeather();
  }, []);

  // Fetch weather data when the user searches for a city
  const search = async () => {
    if (location.trim() === "") return;
    const data = await fetchWeatherData(location);
    if (data) setWeather(data);
  };

  const getBackgroundImage = () => {
  if (!weather) return cloudy; // Default background if data isn't available

  const condition = weather.current.condition.text.toLowerCase();

  if (condition.includes("sunny") || condition.includes("clear")) return sunny;
  if (condition.includes("cloud")) return cloudy;
  if (condition.includes("rain") || condition.includes("drizzle")) return rainy;
  if (condition.includes("snow")) return snow;
  if (condition.includes("thunder")) return thunder;
  if (condition.includes("overcast")) return overcast;
  if (condition.includes("mist")) return mist;

  return sunny; // Fallback background
};



  return (
    <div className="relative bg-slate-500 h-screen w-screen flex justify-center items-center">
      {/* Image as Background */}
      <img
        src={getBackgroundImage()}
        className="absolute inset-0 z-0 h-screen w-screen object-cover"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 z-10 bg-black opacity-60"></div>

      {/* Content Box */}
      <div className="z-20 w-[60%] h-auto">
        {/* City, Temperature & Condition */}
        <div className="text-white my-4 w-[100%] h-50 rounded-lg px-15 py-8 flex justify-between items-center shadow-md shadow-neutral-100">
          <div className="flex flex-col p-4 gap-6">
            <p className="text-3xl font-bold">{weather ? weather.location.name : "Loading..."}</p>
            <div className="flex">
              <h1 className="text-7xl ml-[-10px] font-semibold text-amber-500">
                {weather ? weather.current.temp_c : "--"} °C
              </h1>
              <h1 className="mt-12 ml-5 font-semibold text-xl">{weather ? weather.current.condition.text : "Unknown"}</h1>
            </div>
          </div>
          <div className="font-semibold text-xl">
            <p>{weather ? weather.location.country : "Loading..."}</p>
            <p>{weather ? weather.location.localtime : "Fetching time..."}</p>
          </div>
        </div>

        {/* Weather Details & Search Bar */}
        <div className="flex justify-center items-center gap-4 w-[100%] h-50">
          {/* Weather Data Boxes */}
          <div className="w-[50%] h-[110%] gap-2 p-4 shadow-md shadow-neutral-50 rounded-lg flex flex-wrap justify-center">
            <Box Name="Temperature" Value={`${weather ? weather.current.temp_c + " °C" : "--"}`} />
            <Box Name="Humidity" Value={`${weather ? weather.current.humidity + "%" : "--"}`} />
            <Box Name="Wind Speed" Value={`${weather ? weather.current.wind_kph + " kph" : "--"}`} />
            <Box Name="Pressure" Value={`${weather ? weather.current.pressure_mb + " mb" : "--"}`} />
            <Box Name="Heat Index" Value={`${weather ? weather.current.heatindex_c + " °C" : "--"}`} />
            <Box Name="Dew Point" Value={`${weather ? weather.current.dewpoint_c + " °C" : "--"}`} />
          </div>

          {/* Location Details & Search */}
          <div className="p-4 rounded-lg w-[50%] h-[110%] shadow-md shadow-neutral-50 text-white">
            <div className="flex mt-2 mx-1 p-4 justify-evenly text-white bg-neutral-800 text-[20px] rounded-lg text-center font-medium">
              <p>Latitude  {weather ? weather.location.lat : "--"}</p>
              <p>||</p>
              <p>Longitude  {weather ? weather.location.lon : "--"}</p>
            </div>
             <div className="flex text-center">
              <p className="temp">{weather ? weather.current.temp_c : "--"} °C</p>
              <p className="temp">{weather ? weather.current.temp_f : "--"} °F</p>
            </div>
           
            <div className="flex justify-between px-3">
              <input
                type="text"
                placeholder="Enter City Name"
                className="text-2xl w-full border-b-2 p-1 m-1 rounded-lg text-white font-semibold focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="bg-amber-600 py-2 px-4 rounded-lg text-white font-semibold cursor-pointer" onClick={search}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
