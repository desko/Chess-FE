import type { BoardHistory } from "../../../components/Board/Board";
import type { PieceBoard, PositionBoard, LegalMove } from "../../constants/constants";

const calculateKnight = (positionHistory: BoardHistory, piece: PieceBoard) => {
	const { x, y, color } = piece;
	const latestPosition: PositionBoard[] = [];
	const isPinned = Object.values(piece.pins).includes(true);

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	// Horizontal moves
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

	const validMoves: LegalMove[] = allMoves.filter(move => move.x >= 1 && move.x <= 8 && move.y >= 1 && move.y <= 8);
 
	if(!isPinned) {
		validMoves.forEach((move: LegalMove) => {
			const ocupied = latestPosition[0].find((piece: PieceBoard) => piece.x === move.x && piece.y === move.y && piece.color === color);
			if (!ocupied) piece.legalMoves.push(move);
		});
	}
};

export default calculateKnight;