import * as THREE from "three";

// Helper function to create a Three.js Shape from points
const createShapePath = (points: Array<[number, number]>) => {
  const shape = new THREE.Shape();

  if (points.length < 3) return shape;

  shape.moveTo(points[0][0], points[0][1]);

  for (let i = 1; i < points.length; i++) {
    shape.lineTo(points[i][0], points[i][1]);
  }

  // Close the shape
  shape.lineTo(points[0][0], points[0][1]);

  return shape;
};

// Helper function to create line points for the border
const createLinePoints = (points: Array<[number, number]>) => {
  const linePoints: Array<number> = [];

  // Add each point as x, y, z coordinates
  points.forEach((point) => {
    linePoints.push(point[0], point[1], 0);
  });

  // Add the first point again to close the shape
  if (points.length > 0) {
    linePoints.push(points[0][0], points[0][1], 0);
  }

  return linePoints;
};

// Helper function to calculate the centroid of a polygon
const calculateCentroid = (
  points: Array<[number, number]>
): [number, number] => {
  if (points.length === 0) return [0, 0];

  let sumX = 0;
  let sumY = 0;

  points.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
  });

  return [sumX / points.length, sumY / points.length];
};

export { createShapePath, createLinePoints, calculateCentroid };
