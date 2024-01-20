import type { PieceBoard, PositionBoard } from "../../constants/constants";

const calculateAxis = (piece: PieceBoard, latestPosition: PositionBoard) => {
    const { x, y, color } = piece;
    const pinnedHorizontal = [piece.pins.leftHorizontal, piece.pins.rightHorizontal].includes(true);
	const pinnedVertical = [piece.pins.bottomVertical, piece.pins.topVertical].includes(true);
	const pinnedDiagonaly = [piece.pins.LBDiagonal , piece.pins.LTDiagonal , piece.pins.RBDiagonal, piece.pins.RTDiagonal].includes(true);

    let leftHorizontal = false;
    let leftCount = 1;
    let rightHorizontal = false;
    let rightCount = 1;
    let topVertical = false;
    let topCount = 1;
    let bottomVertical = false;
    let bottomCount = 1;

    if(!pinnedDiagonaly) {
        if(!pinnedVertical) {
            while(x - leftCount >= 1 && !leftHorizontal) {
                const currX = x - leftCount;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === y);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: y});
                }
        
                if(current && current.color === color) {
                    leftHorizontal = true;
                }
        
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: y});
                    leftHorizontal = true;
                }
                
                leftCount++;
            }
            
            while(x + rightCount <= 8 && !rightHorizontal) {
                const currX = x + rightCount;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === currX && piece.y === y);
        
                if(!current) {
                    piece.legalMoves.push({x: currX, y: y});
                }
        
                if(current && current.color === color) {
                    rightHorizontal = true;
                }
        
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: y});
                    leftHorizontal = true;
                }
                
                rightCount++;
            }
        }
        
        if(!pinnedHorizontal) {
            while(y + topCount <= 8 && !topVertical) {
                const currY = y + topCount;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === x && piece.y === currY);
        
                if(!current) {
                    piece.legalMoves.push({x: x, y: currY});
                }
        
                if(current && current.color === color) {
                    topVertical = true;
                }
        
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: x, y: currY});
                    topVertical = true;
                }
                
                topCount++;
            }
            
            while(y - bottomCount >= 1 && !bottomVertical) {
                const currY = y - bottomCount;
                const current = latestPosition.find((piece: PieceBoard) => piece.x === x && piece.y === currY);
        
                if(!current) {
                    piece.legalMoves.push({x: x, y: currY});
                }
        
                if(current && current.color === color) {
                    bottomVertical = true;
                }
        
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: x, y: currY});
                    bottomVertical = true;
                }
                
                bottomCount++;
            }
        }
    }
}

export default calculateAxis;