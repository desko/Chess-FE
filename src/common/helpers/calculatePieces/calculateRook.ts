import type { BoardHistory } from "../../../components/Board/Board";
import type { PieceBoard, PositionBoard } from "../../constants/constants";
import calculateAxis from "./calculateAxis";

const calculateRook = (positionHistory: BoardHistory, piece: PieceBoard) => {
    const latestPosition: PositionBoard[] = [];

    if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	calculateAxis(piece, latestPosition[0]);
}

export default calculateRook