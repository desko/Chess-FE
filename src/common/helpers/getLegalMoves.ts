import type { PositionBoard, PieceColor, PieceBoard, PinTypes, Piece, LegalMove } from '../constants/positionConstant';
import type { BoardHistory, BoardSounds, SoundRefs } from '../../components/Board/Board';
import calculatePawn, { calculatePawnAttacking } from './calculatePieces/calculatePawn';
import calculateKnight, { calculateKnightAttacking } from './calculatePieces/calculateKnight';
import calculateBishop from './calculatePieces/calculateBishop';
import calculateRook from './calculatePieces/calculateRook';
import calculateQueen from './calculatePieces/calculateQueen';
import calculateKing, {calculateKingAttacking} from './calculatePieces/calculateKing';
import { calculateAxisAttacking } from './calculatePieces/calculateAxis';
import { calculateDiagonalsAttacking } from './calculatePieces/calculateDiagonals';
import getKingsDirections from './getKingsDirections';
import getCheckingPieces from './getCheckingPieces';
import calculateStopCheck from './calculatePieces/calculateStopCheck';
import playSoundsBoard from './playSoundsBoard';

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

	const { piecesCol, piecesRow, piecesDiagonalMain, piecesDiagonalOpp } = getKingsDirections(latestPosition, color);

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

// const getLegalMoves = (positionHistory: BoardHistory, color: PieceColor, boardSounds: BoardSounds, soundRefs: SoundRefs, setBoardSounds: React.Dispatch<React.SetStateAction<BoardSounds>>) => {
const getLegalMoves = (positionHistory: BoardHistory, color: PieceColor) => {
	const piecesToCalculate = positionHistory[positionHistory.length - 1].filter((piece: PieceBoard) => piece.color === color);
	const enemyPieces = positionHistory[positionHistory.length - 1].filter((piece: PieceBoard) => piece.color !== color);

	const latestPosition: PositionBoard[] = [];
	const previousPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1])
	if(positionHistory.length > 1) previousPosition.push(positionHistory[positionHistory.length - 2])
	
	clearPins(latestPosition[0]);
	clearLegalMoves(latestPosition[0]);
	calculatePins(latestPosition[0], color);

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

	const checkingPieces = getCheckingPieces(latestPosition[0], color);
	const isChecked = !!checkingPieces.length;
	
	const stopCheck =  checkingPieces.length === 1 ? calculateStopCheck(latestPosition[0], checkingPieces, color) : [];

	piecesToCalculate.forEach((piece: PieceBoard) => {
		if (piece.piece === 'king') {
			moveMap[piece.piece](positionHistory, piece, isChecked, blockers);
			return;
		}
		         
		moveMap[piece.piece](positionHistory, piece, isChecked, stopCheck);
	});

	//TODO: play check sound when there are cheking pieces
	// if (checkingPieces.length > 0) {
	// 	playSoundsBoard(soundRefs, boardSounds, setBoardSounds);
	// }

	if (checkingPieces.length === 2) {
		clearLegalMoves(latestPosition[0]);
		const king = latestPosition[0].find((piece: PieceBoard) => piece.piece === 'king' && piece.color === color);
		if(king) {
			moveMap[king.piece](positionHistory, king, isChecked, blockers);
		}
	}
	
};

export default getLegalMoves;
