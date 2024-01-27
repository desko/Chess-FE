import type { LegalMove, PieceBoard, PieceColor, PositionBoard } from "../../constants/positionConstant";

const calculateStopCheck = (latestPosition: PositionBoard, checkingPieces: PieceBoard[], color: PieceColor) => {
	const king = latestPosition.find((piece: PieceBoard) => piece.piece === 'king' && piece.color === color);
	const squaresToTake: LegalMove[] = []; 
	const squaresToBlock: LegalMove[] = []; 
	
	if(king) {
		checkingPieces.forEach((piece: PieceBoard) => {
			squaresToTake.push({x: piece.x, y: piece.y});
	
			let count = 1;
			const xKey = piece.x === king.x ? 'x' : piece.x > king.x ? 'rx' : 'lx';
			const yKey = piece.y === king.y ? 'y' : piece.y > king.y ? 'ty' : 'by';
			

			interface BlockerPos extends LegalMove {
				conditionX: boolean;
				conditionY: boolean;
			}
			const mapBlockersDirection = {
				lxty: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x + count,
						y: piece.y - count,
						conditionX: piece.x + count < king.x, 
						conditionY: piece.y - count > king.y, 
					};
				},
				xty: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x,
						y: piece.y - count,
						conditionX: piece.x === king.x, 
						conditionY: piece.y - count > king.y, 
					};
				},
				rxty: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x - count,
						y: piece.y - count,
						conditionX: piece.x - count > king.x, 
						conditionY: piece.y - count > king.y, 
					};
				},
				lxy: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x + count,
						y: piece.y,
						conditionX: piece.x + count < king.x, 
						conditionY: piece.y === king.y, 
					};
				},
				rxy: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x - count,
						y: piece.y,
						conditionX: piece.x - count > king.x, 
						conditionY: piece.y === king.y, 
					};
				},
				lxby: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x + count,
						y: piece.y + count,
						conditionX: piece.x + count < king.x, 
						conditionY: piece.y + count < king.y, 
					};
				},
				xby: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x,
						y: piece.y + count,
						conditionX: piece.x === king.x, 
						conditionY: piece.y + count < king.y, 
					};
				},
				rxby: (piece: PieceBoard, count: number): BlockerPos => {
					return {
						x: piece.x - count,
						y: piece.y + count,
						conditionX: piece.x - count > king.x, 
						conditionY: piece.y + count < king.y, 
					};
				},
			}

			const keyCoords  = (xKey + yKey) as keyof typeof mapBlockersDirection;

			let condX = mapBlockersDirection[keyCoords](piece, count).conditionX;
			let condY = mapBlockersDirection[keyCoords](piece, count).conditionY;
			
			while(condX && condY) {
				const {x,y} = mapBlockersDirection[keyCoords](piece, count);
				squaresToBlock.push({x, y});

				count++;
				condX = mapBlockersDirection[keyCoords](piece, count).conditionX;
				condY = mapBlockersDirection[keyCoords](piece, count).conditionY;
			}
		});
	}

	return [...squaresToTake, ...squaresToBlock]
}

export default calculateStopCheck;
