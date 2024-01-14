export interface BoardState {
  length: string;
  width: string;
  quantity: string;
  colorBoard: string;
}

export interface RootState {
  boards: BoardState[];
}

export interface CardProps {
  removeItem: (index: number) => void;
  onUpdate: (board: BoardState) => void;
  boards: BoardState[];
}

export interface Rectangle {
  length: number;
  width: number;
  colorBoard: string;
  x: number;
  y: number;
  id: string;
}

export interface PackedResult {
  rectangles: Rectangle[];
}

export interface BoardStates {
  length: number;
  width: number;
  colorBoard: string;
  id: string;
}
