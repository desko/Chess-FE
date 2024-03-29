import type { BoardHistory } from "../../../components/Board/Board";
import type { LegalMove, PieceBoard, PositionBoard } from "../../constants/positionConstant";
import calculateAxis from "./calculateAxis";
import calculateDiagonals from "./calculateDiagonals";
import getBlockerMoves from "./getBlockerMoves";

const calculateQueen = (positionHistory: BoardHistory, piece: PieceBoard, isChecked: boolean, stopCheck: LegalMove[]) => {
    const latestPosition: PositionBoard[] = [];

    if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	calculateAxis(piece, latestPosition[0]);
	calculateDiagonals(piece, latestPosition[0]);

	if(isChecked) {
		const moves = getBlockerMoves(piece, stopCheck);
		piece.legalMoves = moves;
	}
}

export default calculateQueen;