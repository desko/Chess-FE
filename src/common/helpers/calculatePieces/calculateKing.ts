import type { BoardHistory } from "../../../components/Board/Board";
import type { LegalMove, PieceBoard, PositionBoard } from "../../constants/constants";

export const calculateKingAttacking = (piece: PieceBoard) => {
    const {x,y} = piece;

    const allMoves: LegalMove[] = [
        {x: x - 1, y: y + 1,},
        {x: x, y: y + 1,},
        {x: x + 1, y: y + 1,},
        {x: x - 1, y: y,},
        {x: x + 1, y: y,},
        {x: x - 1, y: y - 1,},
        {x: x, y: y - 1,},
        {x: x + 1, y: y - 1,},
    ];

    const attackingMoves = allMoves.filter((move: LegalMove) => move.x <= 8 && move.x >= 1 && move.y <= 8 && move.y >= 1);

    return attackingMoves;
}

const calculateKing = (positionHistory: BoardHistory, piece: PieceBoard, isChecked: boolean, blockers: LegalMove[]) => {
    const { color } = piece;
    const latestPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

    const allNormalMoves = calculateKingAttacking(piece);

    allNormalMoves.forEach((move: LegalMove) => {
        const curr = latestPosition[0].find((piece: PieceBoard) => piece.x === move.x && piece.y === move.y);
        const isProtected = !!blockers.find((blocker: LegalMove) => blocker.x === move.x && blocker.y === move.y);

        if(curr && curr.color !== color && !isProtected) {
            piece.legalMoves.push({x: curr.x, y: curr.y});
        }

        if(!curr && !isProtected) {
            piece.legalMoves.push({x: move.x, y: move.y});
        }
    });
}

export default calculateKing;