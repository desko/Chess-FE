import { PieceBoard, PieceColor, PositionBoard } from "../constants/constants";
import getDiagonalStarts from "./getDiagonalsStarts";

const getKingsDirections = (latestPosition: PositionBoard, color: PieceColor) => {
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
    
    return {
        piecesCol,
        piecesRow,
        piecesDiagonalMain,
        piecesDiagonalOpp
    }
}

export default getKingsDirections;