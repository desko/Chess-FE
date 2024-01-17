import type { PositionBoard, PieceColor, PieceBoard, PinTypes, Piece } from '../constants/constants';
import type { BoardHistory } from '../../components/Board/Board';

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

    const diagonalMainX = Math.max(1, x - y + 1);
    const diagonalMainY = Math.max(1, y - x + 1);
    const diagonalOppX = Math.min(8, x + y - 1);
    const diagonalOppY = Math.max(1, x + y - 8);

    const piecesCol = latestPosition.filter((piece: PieceBoard) => piece.x === x).sort((a, b) => a.y - b.y);
    const piecesRow = latestPosition.filter((piece: PieceBoard) => piece.y === y).sort((a, b) => a.x - b.x);
    const piecesDiagonalMain: PieceBoard[] = [];
    const piecesDiagonalOpp: PieceBoard[] = [];

    let countMain = 0;
    let countOpp = 0;

    while (diagonalMainX + countMain <= 8 && diagonalMainY + countMain <= 8) {
        const current = latestPosition.find((el) => el.x === diagonalMainX + countMain && el.y === diagonalMainY + countMain)
        if (current) piecesDiagonalMain.push(current);
        countMain++;
    }

    while (diagonalOppX - countOpp >= 1 && diagonalOppY + countOpp <= 8) {
        const current = latestPosition.find((el) => el.x === diagonalOppX - countOpp && el.y === diagonalOppY + countOpp)
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

const calculatePawn = (positionHistory: BoardHistory, piece: PieceBoard) => {
	const { x, y, color } = piece;
	const latestPosition: PositionBoard[] = [];
	const previousPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);
	if(positionHistory.length > 1) previousPosition.push(positionHistory[positionHistory.length - 2]);

	//TODO: calculate en passant and pawn moves

	//check if at starting pos

	const moveOneCheckWhite = latestPosition[0].filter((piece) => piece.x === x && piece.y === y + 1);
	const moveOneCheckBlack = latestPosition[0].filter((piece) => piece.x === x && piece.y === y - 1);

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
		if((y === 7 && piece.color === 'black') || (y === 2 && piece.color === 'white')) {
			const moveTwoCheckWhite = latestPosition[0].filter((piece) => piece.x === x && (piece.y > y && piece.y < y + 3) );
			const moveTwoCheckBlack = latestPosition[0].filter((piece) => piece.x === x && (piece.y < y && piece.y > y - 3) );
	
			if(piece.color === 'white' && moveTwoCheckWhite.length === 0) {
				piece.legalMoves.push({x: piece.x, y: piece.y + 2})
			}
			
			if(piece.color === 'black' && moveTwoCheckBlack.length === 0) {
				piece.legalMoves.push({x: piece.x, y: piece.y - 2})
			}
		}
	}
	
	
	if(!pinnedVertival && !pinnedHorizontal && !pinnedDiagonaly) {

		//check if capture
		const checkCaptureWhite = latestPosition[0].filter((piece: PieceBoard) => (piece.x === x - 1 || piece.x === x + 1) && piece.y === y + 1 && piece.color !== color);
		const checkCaptureBlack = latestPosition[0].filter((piece: PieceBoard) => (piece.x === x - 1 || piece.x === x + 1) && piece.y === y - 1 && piece.color !== color);

		if(checkCaptureWhite.length) {
			checkCaptureWhite.forEach((capturable) => piece.legalMoves.push({x: capturable.x, y: capturable.y}));
		}

		if(checkCaptureBlack.length) {
			checkCaptureWhite.forEach((capturable) => piece.legalMoves.push({x: capturable.x, y: capturable.y}));
		}
	}
		
	//check if en passant is possible
	if((y === 5 && piece.color === 'white') || (y === 4 && piece.color === 'black') && previousPosition.length) {
		const checkPassantWhite = latestPosition[0].filter((piece: PieceBoard) => piece.y === y && (piece.x === x - 1 || piece.x === x + 1) && piece.color !== color)
		const checkPassantBlack = latestPosition[0].filter((piece: PieceBoard) => piece.y === y && (piece.x === x - 1 || piece.x === x + 1) && piece.color !== color)

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
};

const calculateKnight = (positionHistory: BoardHistory, piece: PieceBoard) => {};

const calculateBishop = (positionHistory: BoardHistory, piece: PieceBoard) => {};

const calculateRook = (positionHistory: BoardHistory, piece: PieceBoard) => {};

const calculateQueen = (positionHistory: BoardHistory, piece: PieceBoard) => {};

const calculateKing = (positionHistory: BoardHistory, piece: PieceBoard) => {};

const moveMap = {
	pawn: calculatePawn,
	bishop: calculateBishop,
	knight: calculateKnight,
	rook: calculateRook,
	queen: calculateQueen,
	king: calculateKing,
};

const getLegalMoves = (positionHistory: BoardHistory, color: CalculateColors = 'both') => {
	const piecesToCalculate = color !== 'both' ? positionHistory[positionHistory.length - 1].filter((piece: PieceBoard) => piece.color === color) : positionHistory[positionHistory.length - 1]

	const latestPosition: PositionBoard[] = [];
	const previousPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1])
	if(positionHistory.length > 1) previousPosition.push(positionHistory[positionHistory.length - 2])
	
	clearPins(latestPosition[0]);
	clearLegalMoves(latestPosition[0]);

	if(color !== 'both') {
		calculatePins(latestPosition[0], color);
	} else {
		const blackPins = calculatePins(latestPosition[0], 'black');
		const whitePins = calculatePins(latestPosition[0], 'white');
	}
	
	piecesToCalculate.forEach((piece: PieceBoard) => {
		const legalMoves = moveMap[piece.piece](positionHistory, piece);
	});
	
};

export default getLegalMoves;
