import type { BoardHistory } from "../../../components/Board/Board";
import type { PieceBoard, PositionBoard, LegalMove } from "../../constants/positionConstant";
import getBlockerMoves from "./getBlockerMoves";

export const calculatePawnAttacking = (piece: PieceBoard) => {
	const {color, x, y} = piece;
	const attackY = color === 'white' ? y + 1 : y - 1;
	const moves: LegalMove[] = [
		{x: x-1, y: attackY},
		{x: x+1, y: attackY}
	];

	return moves;
}

const calculatePawn = (positionHistory: BoardHistory, piece: PieceBoard, isChecked: boolean, stopCheck: LegalMove[]) => {
	const { x, y, color } = piece;
	const latestPosition: PositionBoard[] = [];
	const previousPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);
	if(positionHistory.length > 1) previousPosition.push(positionHistory[positionHistory.length - 2]);

	const moveOneCheckWhite = latestPosition[0].filter((piece) => piece.x === x && piece.y === y + 1 && !piece.isCaptured);
	const moveOneCheckBlack = latestPosition[0].filter((piece) => piece.x === x && piece.y === y - 1 && !piece.isCaptured);

	const pinnedDiagonaly = [piece.pins.LBDiagonal, piece.pins.LTDiagonal, piece.pins.RBDiagonal, piece.pins.RTDiagonal].includes(true);
	const pinnedHorizontal = [piece.pins.leftHorizontal, piece.pins.rightHorizontal].includes(true);
	const pinnedVertival = [piece.pins.topVertical, piece.pins.bottomVertical].includes(true);

	if(!pinnedDiagonaly && !pinnedHorizontal) {
		//check if can move once
		if(moveOneCheckWhite.length === 0 && color === 'white') {
			piece.legalMoves.push({x: piece.x, y: piece.y + 1})
		}
		
		if(moveOneCheckBlack.length === 0 && color === 'black') {
			piece.legalMoves.push({x: piece.x, y: piece.y - 1})
		}

		//check if can move twice
		if((y === 7 && color === 'black') || (y === 2 && color === 'white')) {
			const moveTwoCheckWhite = latestPosition[0].filter((piece) => piece.x === x && (piece.y > y && piece.y < y + 3) && !piece.isCaptured );
			const moveTwoCheckBlack = latestPosition[0].filter((piece) => piece.x === x && (piece.y < y && piece.y > y - 3) && !piece.isCaptured );
	
			if(color === 'white' && moveTwoCheckWhite.length === 0) {
				piece.legalMoves.push({x: piece.x, y: piece.y + 2})
			}
			
			if(color === 'black' && moveTwoCheckBlack.length === 0) {
				piece.legalMoves.push({x: piece.x, y: piece.y - 2})
			}
		}
	}
	
	
	if(!pinnedVertival && !pinnedHorizontal && !pinnedDiagonaly) {
		//check if capture
		const checkCaptureWhite = latestPosition[0].filter((piece: PieceBoard) => (piece.x === x - 1 || piece.x === x + 1) && piece.y === y + 1 && piece.color !== color && !piece.isCaptured);
		const checkCaptureBlack = latestPosition[0].filter((piece: PieceBoard) => (piece.x === x - 1 || piece.x === x + 1) && piece.y === y - 1 && piece.color !== color && !piece.isCaptured);
		
		if(color === 'white') {
			checkCaptureWhite.forEach((capturable) => {
				const legalMove: LegalMove = {x: capturable.x, y: capturable.y};
				if(y === 7 && color === 'white') legalMove.promotion = true;
				
				piece.legalMoves.push(legalMove);
			});
		}
		
		if(color === 'black') {
			checkCaptureBlack.forEach((capturable) => {
				const legalMove: LegalMove = {x: capturable.x, y: capturable.y};
				if(y === 2 && color === 'black') legalMove.promotion = true;
				
				piece.legalMoves.push(legalMove);
			});
		}
	}
		
	//check if en passant is possible
	if((y === 5 && piece.color === 'white') || (y === 4 && piece.color === 'black') && previousPosition.length) {
		const checkPassantWhite = latestPosition[0].filter((piece: PieceBoard) => piece.y === y && (piece.x === x - 1 || piece.x === x + 1) && piece.color !== color && !piece.isCaptured);
		const checkPassantBlack = latestPosition[0].filter((piece: PieceBoard) => piece.y === y && (piece.x === x - 1 || piece.x === x + 1) && piece.color !== color && !piece.isCaptured);

		checkPassantWhite.forEach((enemyPiece: PieceBoard) => {
			const prev = previousPosition[0].find((piece: PieceBoard) => piece.id === enemyPiece.id);

			if(prev && prev.y === y + 2 && prev.x === enemyPiece.x) {
				piece.legalMoves.push({x: enemyPiece.x, y: piece.y + 1});
			}
		})
		
		checkPassantBlack.forEach((enemyPiece: PieceBoard) => {
			const prev = previousPosition[0].find((piece: PieceBoard) => piece.id === enemyPiece.id);
			
			if(prev && prev.y === y - 2 && prev.x === enemyPiece.x) {
				piece.legalMoves.push({x: enemyPiece.x, y: piece.y - 1});
			}
		})
	}

	if(isChecked) {
		const moves = getBlockerMoves(piece, stopCheck);
		piece.legalMoves = moves;
	}
};

export default calculatePawn;