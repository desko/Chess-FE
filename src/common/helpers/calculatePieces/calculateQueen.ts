import type { BoardHistory } from "../../../components/Board/Board";
import type { PieceBoard, PositionBoard } from "../../constants/constants";
import calculateAxis from "./calculateAxis";
import calculateDiagonals from "./calculateDiagonals";

const calculateQueen = (positionHistory: BoardHistory, piece: PieceBoard) => {
    const latestPosition: PositionBoard[] = [];

    if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	calculateAxis(piece, latestPosition[0]);
	calculateDiagonals(piece, latestPosition[0]);
}

export default calculateQueen;