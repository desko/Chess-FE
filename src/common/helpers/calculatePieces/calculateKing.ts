import type { BoardHistory } from "../../../components/Board/Board";
import type { LegalMove, PieceBoard, PositionBoard } from "../../constants/positionConstant";

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
    const { x, y, color } = piece;
    const latestPosition: PositionBoard[] = [];

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

    const allNormalMoves = calculateKingAttacking(piece);

    allNormalMoves.forEach((move: LegalMove) => {
        const curr = latestPosition[0].filter((piece: PieceBoard) => piece.x === move.x && piece.y === move.y && !piece.isCaptured)[0];
        const isProtected = !!blockers.find((blocker: LegalMove) => blocker.x === move.x && blocker.y === move.y);

        if(curr && curr.color !== color && !isProtected) {
            piece.legalMoves.push({x: curr.x, y: curr.y});
        }

        if(!curr && !isProtected) {
            piece.legalMoves.push({x: move.x, y: move.y});
        }
    });

    // TODO Calculate castles

    if(color === 'white') {
        const checkCastleWhite = latestPosition[0].filter((piece: PieceBoard) => piece.y === 1 && !piece.isCaptured).sort((a: PieceBoard, b: PieceBoard) => a.x - b.x);
        const index = checkCastleWhite.findIndex((pieceInd: PieceBoard) => piece.id === pieceInd.id);
        console.log(checkCastleWhite);
        
        const prevPiece = checkCastleWhite[index - 1];
        const nextPiece = checkCastleWhite[index + 1];
        const checkPrev = prevPiece && prevPiece.piece === 'rook' && prevPiece.color === color && !prevPiece?.moved;
        const checkNext = nextPiece && nextPiece.piece === 'rook' && nextPiece.color === color && !nextPiece?.moved;

        if(piece.piece === 'king' && !piece?.moved) {
            if(checkPrev) {
                console.log('prev');
                const checkPossible = !blockers.some((move: LegalMove) => move.y === piece.y && move.x > prevPiece.x && move.x < piece.x);


                if(checkPossible) {
                    if(prevPiece.x < piece.x){
                        piece.legalMoves.push({x: piece.x - 2, y: piece.y, castles: true})
                    }
                    if(prevPiece.x > piece.x){
                        piece.legalMoves.push({x: piece.x + 2, y: piece.y, castles: true})
                    }
                }
            }
            
            if(checkNext) {
                const checkPossible = !blockers.some((move: LegalMove) => move.y === piece.y && move.x < prevPiece.x && move.x > piece.x);

                if(checkPossible) {
                    if(nextPiece.x > piece.x){
                        piece.legalMoves.push({x: piece.x + 2, y: piece.y, castles: true})
                    }
                    if(nextPiece.x < piece.x) {
                        piece.legalMoves.push({x: piece.x - 2, y: piece.y, castles: true})
                    }
                }
            }
        }
    }
    
    if(color === 'black') {
        const checkCastleBlack = latestPosition[0].filter((piece: PieceBoard) => piece.y === 8 && !piece.isCaptured).sort((a: PieceBoard, b: PieceBoard) => a.x - b.x);
        const index = checkCastleBlack.findIndex((pieceInd: PieceBoard) => piece.id === pieceInd.id);
        console.log(checkCastleBlack);
        
        const prevPiece = checkCastleBlack[index - 1];
        const nextPiece = checkCastleBlack[index + 1];
        const checkPrev = prevPiece && prevPiece.piece === 'rook' && prevPiece.color === color && !prevPiece?.moved;
        const checkNext = nextPiece && nextPiece.piece === 'rook' && nextPiece.color === color && !nextPiece?.moved;

        if(piece.piece === 'king' && !piece?.moved) {
            if(checkPrev) {
                console.log('prev');
                const checkPossible = !blockers.some((move: LegalMove) => move.y === piece.y && move.x > prevPiece.x && move.x < piece.x);


                if(checkPossible) {
                    if(prevPiece.x < piece.x){
                        piece.legalMoves.push({x: piece.x - 2, y: piece.y, castles: true})
                    }
                    if(prevPiece.x > piece.x){
                        piece.legalMoves.push({x: piece.x + 2, y: piece.y, castles: true})
                    }
                }
            }
            
            if(checkNext) {
                const checkPossible = !blockers.some((move: LegalMove) => move.y === piece.y && move.x < prevPiece.x && move.x > piece.x);

                if(checkPossible) {
                    if(nextPiece.x > piece.x){
                        piece.legalMoves.push({x: piece.x + 2, y: piece.y, castles: true})
                    }
                    if(nextPiece.x < piece.x) {
                        piece.legalMoves.push({x: piece.x - 2, y: piece.y, castles: true})
                    }
                }
            }
        }
        
        // const checkCastleBlack = latestPosition[0].filter((piece: PieceBoard) => piece.y === 8 && !piece.isCaptured).sort((a: PieceBoard, b: PieceBoard) => a.x - b.x);

        // checkCastleBlack.forEach((piece: PieceBoard, index: number) => {
        //     const {color} = piece;
        //     const prevPiece = checkCastleBlack[index - 1];
        //     const nextPiece = checkCastleBlack[index + 1];
        //     const checkPrev = prevPiece && prevPiece.piece === 'rook' && prevPiece.color === color && !prevPiece?.moved;
        //     const checkNext = nextPiece && nextPiece.piece === 'rook' && nextPiece.color === color && !nextPiece?.moved;

        //     if(piece.piece === 'king' && !piece?.moved) {
        //         if(checkPrev) {
        //             if(prevPiece.x < piece.x){
        //                 piece.legalMoves.push({x: piece.x - 2, y: piece.y})
        //             } else {
        //                 piece.legalMoves.push({x: piece.x + 2, y: piece.y})
        //             }
        //         }
                
        //         if(checkNext) {
        //             if(prevPiece.x < piece.x){
        //                 piece.legalMoves.push({x: piece.x - 2, y: piece.y})
        //             } else {
        //                 piece.legalMoves.push({x: piece.x + 2, y: piece.y})
        //             }
        //         }
        //     }
        // });

        
    }
}

export default calculateKing;