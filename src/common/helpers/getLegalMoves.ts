import type { PositionBoard, PieceColor, PieceBoard, PinTypes } from '../constants/constants';
import type { BoardHistory } from '../../components/Board/Board';

type CalculateColors = PieceColor | 'both';

const calculatePins = (latestPosition: PositionBoard, color: PieceColor) => {
    const pins: PieceBoard[] = [];
    const king  = latestPosition.find((piece: PieceBoard) => piece.color === color && piece.piece === 'king') as PieceBoard;

    const {x,y} = king;

    let diagonalMainX = Math.max(1, x - y + 1);
    let diagonalMainY = Math.max(1, y - x + 1);
    let diagonalOppX = Math.min(8, x + y - 1);
    let diagonalOppY = Math.max(1, x + y - 8);

    const piecesCol = latestPosition.filter((piece: PieceBoard) => piece.x === x).sort((a, b) => a.y - b.y);
    const piecesRow = latestPosition.filter((piece: PieceBoard) => piece.y === y).sort((a, b) => a.x - b.x);
    const piecesDiagonalMain: PieceBoard[] = [];
    const piecesDiagonalOpp: PieceBoard[] = [];

    // const setPins = (piece: PieceBoard, prevPiece: PieceBoard, nextPiece: PieceBoard, pinName: keyof PinTypes) => {

    // }

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

    piecesDiagonalMain.sort((a, b) => a.x - b.x)
    piecesDiagonalOpp.sort((a, b) => b.x - a.x)

    piecesCol.forEach((piece: PieceBoard, index: number) => {
        const prevPiece = piecesCol[index - 1];
        const nextPiece = piecesCol[index + 1];
        
        if(prevPiece && nextPiece) {
            if(
                prevPiece.piece === 'king' &&
                prevPiece.color === piece.color &&
                (nextPiece.piece === 'queen' || nextPiece.piece === 'rook') &&
                nextPiece.color !== piece.color
            ) {
                piece.pins.bottomVertical = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
            
            if(
                nextPiece.piece === 'king' &&
                nextPiece.color === piece.color &&
                (prevPiece.piece === 'queen' || prevPiece.piece === 'rook') &&
                prevPiece.color !== piece.color
                ) {
                    piece.pins.topVertical = true;
                    if(!pins.includes(piece)) pins.push(piece);
            }
        }
    });

    piecesRow.forEach((piece: PieceBoard, index: number) => {
        const prevPiece = piecesRow[index - 1];
        const nextPiece = piecesRow[index + 1];
        
        if(prevPiece && nextPiece) {
            if(
                prevPiece.piece === 'king' &&
                prevPiece.color === piece.color &&
                (nextPiece.piece === 'queen' || nextPiece.piece === 'rook') &&
                nextPiece.color !== piece.color
            ) {
                piece.pins.rightHorizontal = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
            
            if(
                nextPiece.piece === 'king' &&
                nextPiece.color === piece.color &&
                (prevPiece.piece === 'queen' || prevPiece.piece === 'rook') &&
                prevPiece.color !== piece.color
            ) {
                piece.pins.leftHorizontal = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
        }
    });

    piecesDiagonalMain.forEach((piece: PieceBoard, index: number) => {
        const prevPiece = piecesDiagonalMain[index - 1];
        const nextPiece = piecesDiagonalMain[index + 1];        
        
        if(prevPiece && nextPiece) {
            if(
                prevPiece.piece === 'king' &&
                prevPiece.color === piece.color &&
                (nextPiece.piece === 'queen' || nextPiece.piece === 'bishop') &&
                nextPiece.color !== piece.color
            ) {
                piece.pins.RBDiagonal = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
            
            if(
                nextPiece.piece === 'king' &&
                nextPiece.color === piece.color &&
                (prevPiece.piece === 'queen' || prevPiece.piece === 'bishop') &&
                prevPiece.color !== piece.color
            ) {
                piece.pins.LTDiagonal = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
        }
    });

    piecesDiagonalOpp.forEach((piece: PieceBoard, index: number) => {
        const prevPiece = piecesDiagonalOpp[index - 1];
        const nextPiece = piecesDiagonalOpp[index + 1];
        
        if(prevPiece && nextPiece) {
            if(
                prevPiece.piece === 'king' &&
                prevPiece.color === piece.color &&
                (nextPiece.piece === 'queen' || nextPiece.piece === 'bishop') &&
                nextPiece.color !== piece.color
            ) {
                piece.pins.LBDiagonal = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
            
            if(
                nextPiece.piece === 'king' &&
                nextPiece.color === piece.color &&
                (prevPiece.piece === 'queen' || prevPiece.piece === 'bishop') &&
                prevPiece.color !== piece.color
            ) {
                piece.pins.RTDiagonal = true;
                if(!pins.includes(piece)) pins.push(piece);
            }
        }
    });

    console.log(pins);
    
    return pins;
}

const calculatePawn = (positionHistory: BoardHistory, piece: PieceBoard) => {
    // const {y, x} = piece;
    const latestPosition: PositionBoard[] = [];
    const previousPosition: PositionBoard[] = [];

    if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1])
    if(positionHistory.length > 1) previousPosition.push(positionHistory[positionHistory.length - 2])

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
    
    piecesToCalculate.forEach((piece: PieceBoard) => {
        moveMap[piece.piece](positionHistory, piece);
    });

    if(color !== 'both') {
        calculatePins(latestPosition[0], color);
    }
};

export default getLegalMoves;
