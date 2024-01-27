import { LegalMove, PieceBoard } from '../../constants/positionConstant';

const getBlockerMoves = (piece: PieceBoard, stopCheck: LegalMove[]) => {
    const { legalMoves } = piece;
    const checkStoppers: LegalMove[] = [];

    legalMoves.forEach((move: LegalMove) => {
        const blocker = stopCheck.find((m: LegalMove) => m.x === move.x && m.y === move.y);
        if(blocker) checkStoppers.push(blocker);
    });
    
    return checkStoppers;
}

export default getBlockerMoves;