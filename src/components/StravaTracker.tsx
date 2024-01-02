"use client";
import { GeolocationDataPoint } from "@/lib/types";
import React, { useState } from "react";

type Props = {};

const StravaTracker = (props: Props) => {
  const [locationData, setLocationData] = useState<GeolocationDataPoint[]>([]);
  let watchId: number;

  const startTracking = () => {
    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocationData((oldData) => [
            ...oldData,
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: position.timestamp,
            },
          ]);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const stopTracking = async () => {
    navigator.geolocation.clearWatch(watchId);

    // Ensure there is data to send
    if (locationData.length === 0) {
      console.error("No location data to upload");
      return;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error("Failed to upload activity");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
    } catch (error) {
      console.error("Error uploading activity:", error);
    }
  };

  return (
    <div>
      <button onClick={startTracking}>Start Tracking</button>
      <button onClick={stopTracking}>Stop and Upload</button>
    </div>
  );
};

export default StravaTracker;
