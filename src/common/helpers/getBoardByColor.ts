import { PieceColor } from "../constants/positionConstant";

type Square = {
	y: number;
	x: number;
	row: string;
	col: string;
	code: string;
	color: 'white' | 'black';
};
export type Board = Square[];

const getBoardByColor = (color: PieceColor, rows: number, cols: number) => {
	const boardArray: Board = [];
    const charA = 96;
    
    if(color === 'white') {
        for(let y = rows; y > 0; y--) {
            for(let x = 1; x <= cols; x++) {
                const square: Square = {
                    x: x,
                    y: y,
                    row: String.fromCharCode(charA - 1 + x),
                    col: y.toString(),
                    code: String.fromCharCode(charA + x) + y.toString(),
                    color: (x + y) % 2 === 0 ? 'black' : 'white',
                };
                boardArray.push(square);
            }
        }
    }
    if(color === 'black') {
        for(let y = 1; y <= rows; y++ ) {
            for(let x = cols; x > 0; x--) {
                const square: Square = {
                    x: x,
                    y: y,
                    row: String.fromCharCode(charA - 1 + x),
                    col: y.toString(),
                    code: String.fromCharCode(charA + x) + y.toString(),
                    color: (x + y) % 2 === 0 ? 'black' : 'white',
                };
                boardArray.push(square);
            }
        }
    }

    return boardArray;
}

export default getBoardByColor;