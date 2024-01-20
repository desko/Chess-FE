import type { BoardHistory } from "../../../components/Board/Board";
import type { PieceBoard, PositionBoard } from "../../constants/constants";

const calculateBishop = (positionHistory: BoardHistory, piece: PieceBoard) => {
	const { x, y, color } = piece;
	const latestPosition: PositionBoard[] = [];
	const pinnedHorizontal = [piece.pins.leftHorizontal, piece.pins.rightHorizontal].includes(true);
	const pinnedVertical = [piece.pins.bottomVertical, piece.pins.topVertical].includes(true);

	if(positionHistory.length > 0) latestPosition.push(positionHistory[positionHistory.length - 1]);

	let diag1 = false;
	let diagCount1 = 1;
	let diag2 = false;
	let diagCount2 = 1;
	let diag3 = false;
	let diagCount3 = 1;
	let diag4 = false;
	let diagCount4 = 1;

    if(!pinnedHorizontal && !pinnedVertical) {
        if(!piece.pins.RTDiagonal && !piece.pins.LBDiagonal && !piece.pins.RBDiagonal) {
            //left top
            while(x - diagCount1 >= 1 && y + diagCount1 <= 8 && !diag1) {
                const currX = x - diagCount1;
                const currY = y + diagCount1;
                const current = latestPosition[0].find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diag1 = true;
                }
    
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diag1 = true;
                }
        
                diagCount1++;
            }
        }

        if(!piece.pins.RTDiagonal && !piece.pins.LTDiagonal && !piece.pins.LBDiagonal) {
            //right bottom
            while(x + diagCount2 <= 8 && y - diagCount2 >= 1 && !diag2) {
                const currX = x + diagCount2;
                const currY = y - diagCount2;
                const current = latestPosition[0].find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diag2 = true;
                }
                
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diag2 = true;
                }
        
                diagCount2++;
            }
        }
    
        if(!piece.pins.LTDiagonal && !piece.pins.LBDiagonal && !piece.pins.RBDiagonal) {
            //right top
            while(x + diagCount3 <= 8 && y + diagCount3 >= 1 && !diag3) {
                const currX = x + diagCount3;
                const currY = y + diagCount3;
                const current = latestPosition[0].find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diag3 = true;
                }
                
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diag3 = true;
                }
        
                diagCount3++;
            }
        }
        
        if(!piece.pins.RTDiagonal && !piece.pins.LTDiagonal && !piece.pins.RBDiagonal) {
            //left bottom
            while(x - diagCount4 <= 8 && y - diagCount4 >= 1 && !diag4) {
                const currX = x - diagCount4;
                const currY = y - diagCount4;
                const current = latestPosition[0].find((piece: PieceBoard) => piece.x === currX && piece.y === currY);
                
                if(!current) {
                    piece.legalMoves.push({x: currX, y: currY});
                }
                
                if(current && current.color === color) {
                    diag4 = true;
                }
                
                if(current && current.color !== color) {
                    piece.legalMoves.push({x: currX, y: currY});
                    diag4 = true;
                }
        
                diagCount4++;
            }
        }
    }
};

export default calculateBishop;