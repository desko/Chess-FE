import type { BoardHistory } from "../../../components/Board/Board";
import type { PieceBoard, PositionBoard, LegalMove } from "../../constants/positionConstant";
import getBlockerMoves from "./getBlockerMoves";

export const calculateKnightAttacking = (piece: PieceBoard) => {
	const { x, y } = piece;

	const allMoves: LegalMove[] = [
		{ x: x + 2, y: y + 1 },
		{ x: x + 2, y: y - 1 },
		{ x: x - 2, y: y + 1 },
		{ x: x - 2, y: y - 1 },
		{ x: x + 1, y: y + 2 },
		{ x: x + 1, y: y - 2 },
		{ x: x - 1, y: y + 2 },
		{ x: x - 1, y: y - 2 },
	];

	const attackingMoves: LegalMove[] = allMoves.filter(move => move.x >= 1 && move.x <= 8 && move.y >= 1 && move.y <= 8);
 
	return attackingMoves;
};

const calculateKnight = (positionHistory: BoardHistory, piece: PieceBoard, isChecked: boolean, stopCheck: LegalMove[]) => {
	const { color } = piece;
	const latestPosition: PositionBoard[] = [];
	const isPinned = Object.values(piece.pins).includes(true);

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	const validMoves = calculateKnightAttacking(piece);
 
	if(!isPinned) {
		validMoves.forEach((move: LegalMove) => {
			const ocupied = latestPosition[0].filter((piece: PieceBoard) => piece.x === move.x && piece.y === move.y && piece.color === color && !piece.isCaptured)[0];
			if (!ocupied) piece.legalMoves.push(move);
		});
	}

	if(isChecked) {
		const moves = getBlockerMoves(piece, stopCheck);
		piece.legalMoves = moves;
	}
};

export default calculateKnight;