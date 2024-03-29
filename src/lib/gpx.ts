import { GarminBuilder, buildGPX } from "gpx-builder";
import { GeolocationDataPoint } from "./types";
const { Point } = GarminBuilder.MODELS;
export const buildGPXFile = (activities: GeolocationDataPoint[]) => {
  const points = activities.map(
    (activity) =>
      new Point(activity.latitude, activity.longitude, {
        ele: 100, // You might need to adjust this if you have elevation data
        time: new Date(activity.timestamp),
      })
  );
  const gpxData = new GarminBuilder();
  gpxData.setSegmentPoints(points);

  return buildGPX(gpxData.toObject());
};
