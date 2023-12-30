"use client";
import React, { useState, useEffect } from "react";

type Position = {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
};

const GeolocationComponent = () => {
  const [position, setPosition] = useState<Position>({
    latitude: null,
    longitude: null,
    altitude: null,
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            altitude: pos.coords.altitude,
          });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true }
      );
    }, 3000);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>
      <p>Altitude: {position.altitude}</p>
    </div>
  );
};

export default GeolocationComponent;
