import { GarminBuilder, buildGPX } from "gpx-builder";
const { Point } = GarminBuilder.MODELS;
export const buildGPXFile = (activities: any) => {
  const points = [
    new Point(-33.8568, 151.2153, { ele: 10, time: new Date() }),
    new Point(-33.8668, 151.2153, { ele: 10, time: new Date() }),
  ];
  const gpxData = new GarminBuilder();
  gpxData.setSegmentPoints(points);

  console.log(buildGPX(gpxData.toObject()));

  return buildGPX(gpxData.toObject());
};
