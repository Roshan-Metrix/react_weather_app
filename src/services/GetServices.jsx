import React from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export default fetchWeatherData;
