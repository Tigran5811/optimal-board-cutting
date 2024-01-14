import { useMemo } from "react";
import { RootState } from "../../interface/interface";
import styles from "./Boards.module.css";
import { packRectanglesInAreas } from "../../utils/packRectanglesInAreas/packRectanglesInAreas";
import { getUuid } from "../../utils/getUuid/getUuid";

const scaleRatio = 3;
const areaWidth = 3630;
const areaHeight = 1830;

export const Boards: React.FC<RootState> = ({ boards }) => {
  const boardsFilter = useMemo(() => {
    return boards
      .flatMap((board) => {
        const { length, width, colorBoard } = board;
        const quantity = Number(board.quantity);
        return Array.from({ length: quantity }, () => ({
          length: Number(length) / scaleRatio,
          width: Number(width) / scaleRatio,
          colorBoard,
          id: getUuid(),
        }));
      })
      .sort((a, b) => a.width - b.width);
  }, [boards]);

  const packedResults = useMemo(
    () =>
      packRectanglesInAreas(
        boardsFilter,
        areaWidth / scaleRatio,
        areaHeight / scaleRatio
      ),
    [boardsFilter]
  );

  // useEffect(() => {
  //   const instance = createWorkerBuilder(packRectanglesInAreas);
  //   instance.onmessage = function ({ data }) {
  //     instance.terminate();
  //     setBoards(data);
  //   };
  //   instance.postMessage(boardsFilter);
  // }, [boardsFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {packedResults.map((board) => {
          return (
            <div key={getUuid()} className={styles.board}>
              <p className={styles.length}>1830 MM</p>
              <p className={styles.width}>3630 MM</p>
              {board.map((item) => {
                return (
                  <div
                    key={item.id}
                    style={{
                      left: item.x,
                      top: item.y,
                      position: "absolute",
                      border: "1px solid #fff",
                      width: item.width,
                      backgroundColor: item.colorBoard,
                      height: item.length,
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
