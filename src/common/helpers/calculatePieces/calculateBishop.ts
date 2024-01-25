import type { BoardHistory } from "../../../components/Board/Board";
import type { LegalMove, PieceBoard, PositionBoard } from "../../constants/constants";
import calculateDiagonals from "./calculateDiagonals";
import getBlockerMoves from "./getBlockerMoves";

const calculateBishop = (positionHistory: BoardHistory, piece: PieceBoard, isChecked: boolean, stopCheck: LegalMove[]) => {
	const latestPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	calculateDiagonals(piece, latestPosition[0]);

	if(isChecked) {
		const moves = getBlockerMoves(piece, stopCheck);
		piece.legalMoves = moves;
	}
};

export default calculateBishop;