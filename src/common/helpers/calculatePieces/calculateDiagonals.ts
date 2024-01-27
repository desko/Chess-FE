import type { LegalMove, PieceBoard, PositionBoard } from "../../constants/positionConstant";

export const calculateDiagonalsAttacking = (piece: PieceBoard, latestPosition: PositionBoard) => {
    const attackingMoves: LegalMove[] = [];
    const { x, y } = piece;
    
    let diagLT = false;
	let diagCountLT = 1;
	let diagRB = false;
	let diagCountRB = 1;
	let diagRT = false;
	let diagCountRT = 1;
	let diagLB = false;
	let diagCountLB = 1;

    //left top
    while(x - diagCountLT >= 1 && y + diagCountLT <= 8 && !diagLT) {
        const currX = x - diagCountLT;
        const currY = y + diagCountLT;
        const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
        
        if(!current) {
            attackingMoves.push({x: currX, y: currY});
        }

        if(current) {
            attackingMoves.push({x: currX, y: currY});
            diagLT = true;
        }

        diagCountLT++;
    }

    //right bottom
    while(x + diagCountRB <= 8 && y - diagCountRB >= 1 && !diagRB) {
        const currX = x + diagCountRB;
        const currY = y - diagCountRB;
        const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
        
        if(!current) {
            attackingMoves.push({x: currX, y: currY});
        }
        
        if(current) {
            attackingMoves.push({x: currX, y: currY});
            diagRB = true;
        }

        diagCountRB++;
    }

    //right top
    while(x + diagCountRT <= 8 && y + diagCountRT <= 8 && !diagRT) {
        const currX = x + diagCountRT;
        const currY = y + diagCountRT;
        const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
        
        if(!current) {
            attackingMoves.push({x: currX, y: currY});
        }
        
        if(current) {
            attackingMoves.push({x: currX, y: currY});
            diagRT = true;
        }

        diagCountRT++;
    }

    //left bottom
    while(x - diagCountLB <= 8 && y - diagCountLB >= 1 && !diagLB) {
        const currX = x - diagCountLB;
        const currY = y - diagCountLB;
        const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
        
        if(!current) {
            attackingMoves.push({x: currX, y: currY});
        }
        
        if(current) {
            attackingMoves.push({x: currX, y: currY});
            diagLB = true;
        }

        diagCountLB++;
    }
    
    return attackingMoves;
}

const calculateDiagonals = (piece: PieceBoard, latestPosition: PositionBoard) => {
    const { x, y, color } = piece;
    const pinnedHorizontal = [piece.pins.leftHorizontal, piece.pins.rightHorizontal].includes(true);
	const pinnedVertical = [piece.pins.bottomVertical, piece.pins.topVertical].includes(true);
    
    let diagLT = false;
	let diagCountLT = 1;
	let diagRB = false;
	let diagCountRB = 1;
	let diagRT = false;
	let diagCountRT = 1;
	let diagLB = false;
	let diagCountLB = 1;

    if(!pinnedHorizontal && !pinnedVertical) {
        if(!piece.pins.RTDiagonal && !piece.pins.LBDiagonal && !piece.pins.RBDiagonal) {
            //left top
            while(x - diagCountLT >= 1 && y + diagCountLT <= 8 && !diagLT) {
                const currX = x - diagCountLT;
                const currY = y + diagCountLT;
                const current = latestPosition.filter((piece: PieceBoard) => piece.x === currX && piece.y === currY && !piece.isCaptured)[0];
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diagLT = true;
                }
    
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diagLT = true;
                }
        
                diagCountLT++;
            }
        }

        if(!piece.pins.RTDiagonal && !piece.pins.LTDiagonal && !piece.pins.LBDiagonal) {
            //right bottom
            while(x + diagCountRB <= 8 && y - diagCountRB >= 1 && !diagRB) {
                const currX = x + diagCountRB;
                const currY = y - diagCountRB;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diagRB = true;
                }
                
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diagRB = true;
                }
        
                diagCountRB++;
            }
        }
    
        if(!piece.pins.LTDiagonal && !piece.pins.LBDiagonal && !piece.pins.RBDiagonal) {
            //right top
            while(x + diagCountRT <= 8 && y + diagCountRT <= 8 && !diagRT) {
                const currX = x + diagCountRT;
                const currY = y + diagCountRT;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diagRT = true;
                }
                
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diagRT = true;
                }
        
                diagCountRT++;
            }
        }
        
        if(!piece.pins.RTDiagonal && !piece.pins.LTDiagonal && !piece.pins.RBDiagonal) {
            //left bottom
            while(x - diagCountLB >= 1 && y - diagCountLB >= 1 && !diagLB) {
                const currX = x - diagCountLB;
                const currY = y - diagCountLB;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diagLB = true;
                }
                
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diagLB = true;
                }
        
                diagCountLB++;
            }
        }
    }
}

export default calculateDiagonals;