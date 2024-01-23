import type { PositionBoard, PieceColor, PieceBoard, PinTypes, Piece, LegalMove } from '../constants/constants';
import type { BoardHistory } from '../../components/Board/Board';
import getDiagonalStarts from './getDiagonalsStarts';
import calculatePawn, { calculatePawnAttacking } from './calculatePieces/calculatePawn';
import calculateKnight, { calculateKnightAttacking } from './calculatePieces/calculateKnight';
import calculateBishop from './calculatePieces/calculateBishop';
import calculateRook from './calculatePieces/calculateRook';
import calculateQueen from './calculatePieces/calculateQueen';
import calculateKing, {calculateKingAttacking} from './calculatePieces/calculateKing';
import { calculateAxisAttacking } from './calculatePieces/calculateAxis';
import { calculateDiagonalsAttacking } from './calculatePieces/calculateDiagonals';

type CalculateColors = PieceColor | 'both';

const clearPins = (position: PositionBoard) => {
	position.forEach((piece: PieceBoard) => {
		for (const key of Object.keys(piece.pins)) {
			piece.pins[key as keyof PinTypes] = false;
		}
	});
}

const clearLegalMoves = (position: PositionBoard) => {
	position.forEach((piece: PieceBoard) => {
		piece.legalMoves = [];
	});
}

const setPins = (pins: PositionBoard, piecesDir: PositionBoard, pinTypeNext: keyof PinTypes, pinTypePrev: keyof PinTypes, pinners: Piece[]) => {
	piecesDir.forEach((piece: PieceBoard, index: number) => {
		const prevPiece = piecesDir[index - 1];
		const nextPiece = piecesDir[index + 1];
		
		if(prevPiece && nextPiece) {
			const checkPrev = (
				prevPiece.piece === 'king' &&
				prevPiece.color === piece.color &&
				pinners.includes(nextPiece.piece) &&
				nextPiece.color !== piece.color
			);

			const checkNext = (
				nextPiece.piece === 'king' &&
				nextPiece.color === piece.color &&
				pinners.includes(prevPiece.piece) &&
				prevPiece.color !== piece.color
			);

			if(checkPrev) {
				piece.pins[pinTypeNext] = true;
				if(!pins.includes(piece)) pins.push(piece);
			}
			
			if(checkNext) {
				piece.pins[pinTypePrev] = true;
				if(!pins.includes(piece)) pins.push(piece);
			}
		}
	});
}

const calculatePins = (latestPosition: PositionBoard, color: PieceColor) => {
    const pins: PieceBoard[] = [];
    const king  = latestPosition.find((piece: PieceBoard) => piece.color === color && piece.piece === 'king') as PieceBoard;

    const {x,y} = king;

	const {diagonalMainX, diagonalMainY, diagonalOppX, diagonalOppY} = getDiagonalStarts(x,y);

    const piecesCol = latestPosition.filter((piece: PieceBoard) => piece.x === x).sort((a, b) => a.y - b.y);
    const piecesRow = latestPosition.filter((piece: PieceBoard) => piece.y === y).sort((a, b) => a.x - b.x);
    const piecesDiagonalMain: PieceBoard[] = [];
    const piecesDiagonalOpp: PieceBoard[] = [];

    let countMain = 0;
    let countOpp = 0;

    while (diagonalMainX + countMain <= 8 && diagonalMainY - countMain >= 1) {
        const current = latestPosition.find((el) => el.x === diagonalMainX + countMain && el.y === diagonalMainY - countMain)
        if (current) piecesDiagonalMain.push(current);
        countMain++;
    }

    while (diagonalOppX - countOpp >= 1 && diagonalOppY - countOpp >= 1) {
        const current = latestPosition.find((el) => el.x === diagonalOppX - countOpp && el.y === diagonalOppY - countOpp)
        if (current) piecesDiagonalOpp.push(current);
        countOpp++;
    }

    piecesDiagonalMain.sort((a, b) => a.x - b.x);
    piecesDiagonalOpp.sort((a, b) => b.x - a.x);

	setPins(pins, piecesCol, 'bottomVertical', 'topVertical', ['queen', 'rook']);
	setPins(pins, piecesRow, 'rightHorizontal', 'leftHorizontal', ['queen', 'rook']);
	setPins(pins, piecesDiagonalMain, 'RBDiagonal', 'LTDiagonal', ['queen', 'bishop']);
	setPins(pins, piecesDiagonalOpp, 'LBDiagonal', 'RTDiagonal', ['queen', 'bishop']);
	
    return pins;
}

const moveMap = {
	pawn: calculatePawn,
	bishop: calculateBishop,
	knight: calculateKnight,
	rook: calculateRook,
	queen: calculateQueen,
	king: calculateKing,
};

const getLegalMoves = (positionHistory: BoardHistory, color: CalculateColors = 'both') => {
	const piecesToCalculate = positionHistory[positionHistory.length - 1].filter((piece: PieceBoard) => piece.color === color);
	const enemyPieces = positionHistory[positionHistory.length - 1].filter((piece: PieceBoard) => piece.color !== color);

	const latestPosition: PositionBoard[] = [];
	const previousPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1])
	if(positionHistory.length > 1) previousPosition.push(positionHistory[positionHistory.length - 2])
	
	clearPins(latestPosition[0]);
	clearLegalMoves(latestPosition[0]);

	if(color !== 'both') {
		calculatePins(latestPosition[0], color);
	} else {
		if(positionHistory.length % 2 === 0) {
			calculatePins(latestPosition[0], 'white');
			calculatePins(latestPosition[0], 'black');
		} else {
			calculatePins(latestPosition[0], 'black');
			calculatePins(latestPosition[0], 'white');
		}
	}

	//TODO: Add all possible enemy moves and compare king moves to determine legal king moves

	const enemyMoveMap = {
		pawn: calculatePawnAttacking,
		bishop: calculateDiagonalsAttacking,
		knight: calculateKnightAttacking,
		rook: calculateAxisAttacking,
		queen: (piece: PieceBoard, latestPosition: PositionBoard) => {
			const diagMoves = calculateDiagonalsAttacking(piece, latestPosition);
			const axisMoves = calculateAxisAttacking(piece, latestPosition);

			return [...diagMoves, ...axisMoves];
		},
		king: calculateKingAttacking,
	};
	
	const enemyMoves = enemyPieces.map((piece: PieceBoard) => {
		const moves = enemyMoveMap[piece.piece](piece, latestPosition[0])
		
		return moves;
	});
	
	const blockers: LegalMove[] = enemyMoves.reduce((acc, val) => acc.concat(val));

	piecesToCalculate.forEach((piece: PieceBoard) => {
		if (piece.piece === 'king') {
			moveMap[piece.piece](positionHistory, piece, blockers);
			return;
		}
		moveMap[piece.piece](positionHistory, piece);
	});
	
};

export default getLegalMoves;
