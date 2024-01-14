/* eslint-disable no-constant-condition */
import { BoardStates, Rectangle } from "../../interface/interface";

export const packRectanglesInAreas = (
  rectangles: BoardStates[],
  areaWidth: number,
  areaHeight: number
) => {
  const boards = [];

  let packedRectangles: Rectangle[] = [];
  rectangles.forEach((rectangle) => {
    let x = 0;
    let y = 0;

    while (true) {
      let collision = false;
      for (const packedRectangle of packedRectangles) {
        if (
          x < packedRectangle.x + packedRectangle.width &&
          x + rectangle.width > packedRectangle.x &&
          y < packedRectangle.y + packedRectangle.length &&
          y + rectangle.length > packedRectangle.y
        ) {
          collision = true;
          break;
        }
      }

      if (!collision) {
        packedRectangles.push({ x, y, ...rectangle });
        break;
      }

      x += 1;
      if (x + rectangle.width > areaWidth) {
        x = 0;
        y += 1;
        if (y + rectangle.length > areaHeight) {
          boards.push(packedRectangles);
          packedRectangles = [];
          x = 0;
          y = 0;
          packedRectangles.push({ x, y, ...rectangle });
          break;
        }
      }
    }
  });

  boards.push(packedRectangles);

  return boards;
};
