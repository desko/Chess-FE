import type { Piece, PieceBoard, PieceColor, PositionBoard } from "../constants/constants";
import getKingsDirections from "./getKingsDirections";

const setChecks = (checks: PositionBoard, piecesDir: PositionBoard, checkingPieces: Piece[]) => {
    
    piecesDir.forEach((piece: PieceBoard, index: number) => {
        const prevPiece = piecesDir[index - 1];
        const nextPiece = piecesDir[index + 1];
        
        if(nextPiece) {
            const nextCheck = nextPiece.color !== piece.color &&
                checkingPieces.includes(nextPiece.piece) &&
                piece.piece === 'king';
            
            if (nextCheck && !checks.includes(nextPiece)) checks.push(nextPiece);
        }
        
        if(prevPiece) {
            const prevCheck = prevPiece.color !== piece.color &&
                checkingPieces.includes(prevPiece.piece) &&
                piece.piece === 'king';

            if (prevCheck && !checks.includes(prevPiece)) checks.push(prevPiece);
        }
    });
}

const getCheckingPieces = (latestPosition: PositionBoard, color: PieceColor) => {
    const king = latestPosition.find((piece: PieceBoard) => piece.piece === 'king' && piece.color === color) as PieceBoard;
    const {x,y} = king;

    const { piecesCol, piecesRow, piecesDiagonalMain, piecesDiagonalOpp } = getKingsDirections(latestPosition, color);
    const checks: PieceBoard[] = [];
    
    if(color === 'white') {
        
        //check pawn check
        const pawnCheckWhiteKing = latestPosition.filter((piece: PieceBoard) => piece.color !== color && (piece.x === x - 1 || piece.x === x + 1) && piece.y === y + 1);

        pawnCheckWhiteKing.forEach((piece: PieceBoard) => checks.push(piece))
        
        //check knight check
        const knightCheckWhiteKing = latestPosition.filter((piece: PieceBoard) => piece.color !== color &&
        piece.piece === 'knight' &&
        (
            (piece.x === x - 1 || piece.x === x + 1) && (piece.y === y - 2 || piece.y === y + 2) ||
            (piece.x === x - 2 || piece.x === x + 2) && (piece.y === y - 1 || piece.y === y + 1)
            )
        );
            
        knightCheckWhiteKing.forEach((piece: PieceBoard) => checks.push(piece))

        //check bishop/queen check
        setChecks(checks, piecesDiagonalMain, ['queen', 'bishop']);
        setChecks(checks, piecesDiagonalOpp, ['queen', 'bishop']);
        
        //check rook/queen check
        setChecks(checks, piecesCol, ['queen', 'rook']);
        setChecks(checks, piecesRow, ['queen', 'rook']);
        
    }
    
    if(color === 'black') {
        //check pawn check
        const pawnCheckBlackKing = latestPosition.filter((piece: PieceBoard) => piece.color !== color && (piece.x === x + 1 || piece.x === x - 1) && piece.y === y - 1);

        pawnCheckBlackKing.forEach((piece: PieceBoard) => checks.push(piece))

        //check knight check
        const knightCheckBlackKing = latestPosition.filter((piece: PieceBoard) => piece.color !== color && 
            piece.piece === 'knight' &&
            (
                (piece.x === x - 1 || piece.x === x + 1) && (piece.y === y - 2 || piece.y === y + 2) ||
                (piece.x === x - 2 || piece.x === x + 2) && (piece.y === y - 1 || piece.y === y + 1)
            )
        );

        knightCheckBlackKing.forEach((piece: PieceBoard) => checks.push(piece))

        //check bishop/queen check
        setChecks(checks, piecesDiagonalMain, ['queen', 'bishop']);
        setChecks(checks, piecesDiagonalOpp, ['queen', 'bishop']);
        
        //check rook/queen check
        setChecks(checks, piecesCol, ['queen', 'rook']);
        setChecks(checks, piecesRow, ['queen', 'rook']);
    }

    return checks;
}

export default getCheckingPieces;