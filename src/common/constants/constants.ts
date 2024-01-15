export type Piece = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

export type PieceBoard = {
	color: PieceColor;
	piece: Piece;
	x: number;
	y: number;
	isCaptured: boolean;
	row: string;
	col: string;
	pins: PinTypes;
	checked?: boolean;
};

export type PositionBoard = PieceBoard[];

export type PinTypes = {
    topVertical: boolean;
    bottomVertical: boolean;
    leftHorizontal: boolean;
    rightHorizontal: boolean;
    LTDiagonal: boolean;
    LBDiagonal: boolean;
    RTDiagonal: boolean;
    RBDiagonal: boolean;
};

export const DEF_POSITION: PositionBoard = [
	{
		color: 'white',
		piece: 'king',
		x: 5,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'e',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		},
		checked: false,
	},
	{
		color: 'white',
		piece: 'queen',
		x: 4,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'rook',
		x: 1,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'a',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'rook',
		x: 8,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'h',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'bishop',
		x: 3,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'bishop',
		x: 6,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'f',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'knight',
		x: 2,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'b',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'knight',
		x: 7,
		y: 8,
		isCaptured: false,
		row: '1',
		col: 'g',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 1,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'a',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 2,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'b',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 3,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 4,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 5,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'e',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 6,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'f',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 7,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'g',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 8,
		y: 7,
		isCaptured: false,
		row: '2',
		col: 'h',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'king',
		x: 5,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'e',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		},
		checked: false,
	},
	{
		color: 'black',
		piece: 'queen',
		x: 4,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'rook',
		x: 1,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'a',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'rook',
		x: 8,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'h',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'bishop',
		x: 3,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'bishop',
		x: 2,
		y: 5,
		isCaptured: false,
		row: '8',
		col: 'f',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'knight',
		x: 2,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'b',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'knight',
		x: 7,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'g',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 1,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'a',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 2,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'b',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 3,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 4,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 5,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'e',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 6,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'f',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 7,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'g',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 8,
		y: 2,
		isCaptured: false,
		row: '7',
		col: 'h',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
];

export const TEST_WHITE_POSITION: PositionBoard = [
	{
		color: 'white',
		piece: 'king',
		x: 5,
		y: 5,
		isCaptured: false,
		row: '1',
		col: 'e',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'queen',
		x: 6,
		y: 4,
		isCaptured: false,
		row: '1',
		col: 'c',
		pins: {
			topVertical: true,
			bottomVertical: true,
			leftHorizontal: true,
			rightHorizontal: true,
			LTDiagonal: true,
			LBDiagonal: true,
			RTDiagonal: true,
			RBDiagonal: true,
		}
	},
	{
		color: 'white',
		piece: 'queen',
		x: 5,
		y: 4,
		isCaptured: false,
		row: '1',
		col: 'd',
		pins: {
			topVertical: true,
			bottomVertical: true,
			leftHorizontal: true,
			rightHorizontal: true,
			LTDiagonal: true,
			LBDiagonal: true,
			RTDiagonal: true,
			RBDiagonal: true,
		}
	},
	{
		color: 'white',
		piece: 'queen',
		x: 4,
		y: 4,
		isCaptured: false,
		row: '1',
		col: 'f',
		pins: {
			topVertical: true,
			bottomVertical: true,
			leftHorizontal: true,
			rightHorizontal: true,
			LTDiagonal: true,
			LBDiagonal: true,
			RTDiagonal: true,
			RBDiagonal: true,
		}
	},
	{
		color: 'black',
		piece: 'queen',
		x: 8,
		y: 2,
		isCaptured: false,
		row: '8',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'rook',
		x: 5,
		y: 1,
		isCaptured: false,
		row: '8',
		col: 'a',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'bishop',
		x: 2,
		y: 2,
		isCaptured: false,
		row: '8',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
];

export const TEST_BLACK_POSITION: PositionBoard = [
	{
		color: 'black',
		piece: 'king',
		x: 5,
		y: 5,
		isCaptured: false,
		row: '1',
		col: 'e',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'queen',
		x: 4,
		y: 6,
		isCaptured: false,
		row: '1',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'queen',
		x: 5,
		y: 6,
		isCaptured: false,
		row: '1',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'black',
		piece: 'queen',
		x: 6,
		y: 6,
		isCaptured: false,
		row: '1',
		col: 'f',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'queen',
		x: 2,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'd',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'rook',
		x: 5,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'a',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
	{
		color: 'white',
		piece: 'bishop',
		x: 8,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'c',
		pins: {
			topVertical: false,
			bottomVertical: false,
			leftHorizontal: false,
			rightHorizontal: false,
			LTDiagonal: false,
			LBDiagonal: false,
			RTDiagonal: false,
			RBDiagonal: false,
		}
	},
];