import { GarminBuilder, buildGPX } from "gpx-builder";
import { GeolocationDataPoint } from "./types";
const { Point } = GarminBuilder.MODELS;
export const buildGPXFile = (activities: GeolocationDataPoint[]) => {
  const points = activities.map(
    (activity) =>
      new Point(activity.latitude, activity.longitude, {
        ele: 10, // You might need to adjust this if you have elevation data
        // time: new Date(activity.timestamp),
        time: new Date(1704157759509),
      })
  );
  const gpxData = new GarminBuilder();
  gpxData.setSegmentPoints(points);

  console.log(buildGPX(gpxData.toObject()));

  return buildGPX(gpxData.toObject());
};
