import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import "./main.scss";

const City = () => {
  const [data, setData] = useState([]);

  const fetchTimezoneData = async () => {
    const response = await fetch(`/api/timezones`);
    const timezoneData = await response.json();
    setData(timezoneData);
  };

  useEffect(() => {
    fetchTimezoneData();
  }, []);

  const userTime = new Date().getHours();

  const places = data.map((country) => {
    return country.zoneName;
  });

  const cities = [];

  places.forEach((place) => {
    const possibleLocation = moment().tz(place);
    const localTime = possibleLocation.get("hours");
    if (localTime === 17) {
      cities.push(place);
    }
  });

  let message;
  let randomCity = cities[Math.floor(Math.random() * cities.length)];

  if (userTime < 17) {
    message = <li>It is currently after 5pm in {randomCity}</li>;
  } else if (userTime >= 17) {
    message = <li>It after 5pm at your location!</li>;
  }

  return (
    <div>
      <ul>{message}</ul>
    </div>
  );
};

export default City;
