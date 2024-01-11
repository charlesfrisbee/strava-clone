"use client";
import { GeolocationDataPoint } from "@/lib/types";
import React, { useState } from "react";

type Props = {};

type TrackingStatus =
  | "Not Started"
  | "Tracking Started"
  | "Tracking Stopped and Data Uploaded";

const StravaTracker = (props: Props) => {
  const [locationData, setLocationData] = useState<GeolocationDataPoint[]>([]);
  const [trackingStatus, setTrackingStatus] =
    useState<TrackingStatus>("Not Started");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let watchId: number;

  const startTracking = () => {
    if ("geolocation" in navigator) {
      setTrackingStatus("Tracking Started");
      setErrorMessage("");
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
          setErrorMessage("Geolocation is not supported by this browser.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  const stopTracking = async () => {
    navigator.geolocation.clearWatch(watchId);
    if (locationData.length === 0) {
      console.error("No location data to upload");
      setErrorMessage("No location data to upload");
      return;
    }

    setIsLoading(true);
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
      setTrackingStatus("Tracking Stopped and Data Uploaded");
    } catch (error) {
      console.error("Error uploading activity:", error);
      setErrorMessage("Error uploading activity: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-4">
      {trackingStatus !== "Tracking Started" && (
        <button
          onClick={startTracking}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Tracking
        </button>
      )}
      {trackingStatus === "Tracking Started" && (
        <button
          onClick={stopTracking}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Stop and Upload
        </button>
      )}
      {isLoading && <div className="text-green-500">Uploading...</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="text-green-500">{trackingStatus}</div>
    </div>
  );
};

export default StravaTracker;
