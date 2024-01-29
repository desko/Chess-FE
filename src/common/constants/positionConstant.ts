export type Piece = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

export type LegalMove = {
	x: number;
	y: number;
	promotion?: boolean;
	passant?: boolean;
	castles?: boolean;
}

export type PieceBoard = {
	color: PieceColor;
	piece: Piece;
	x: number;
	y: number;
	isCaptured: boolean;
	row: string;
	col: string;
	id: string;
	pins: PinTypes;
	legalMoves: LegalMove[];
	checked?: boolean;
	moved?: boolean;
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
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'e',
		id: '1e',
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
		legalMoves: [],
		checked: false,
		moved: false,
	},
	{
		color: 'white',
		piece: 'queen',
		x: 4,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'd',
		id: '1d',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'rook',
		x: 1,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'a',
		id: '1a',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'rook',
		x: 8,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'h',
		id: '1h',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'bishop',
		x: 3,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'c',
		id: '1c',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'bishop',
		x: 6,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'f',
		id: '1f',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'knight',
		x: 2,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'b',
		id: '1b',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'knight',
		x: 7,
		y: 1,
		isCaptured: false,
		row: '1',
		col: 'g',
		id: '1g',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 1,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'a',
		id: '2a',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 2,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'b',
		id: '2b',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 3,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'c',
		id: '2c',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 4,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'd',
		id: '2d',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 5,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'e',
		id: '2e',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 6,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'f',
		id: '2f',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 7,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'g',
		id: '2g',
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
		legalMoves: [],
	},
	{
		color: 'white',
		piece: 'pawn',
		x: 8,
		y: 2,
		isCaptured: false,
		row: '2',
		col: 'h',
		id: '2h',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'king',
		x: 5,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'e',
		id: '8e',
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
		legalMoves: [],
		checked: false,
		moved: false,
	},
	{
		color: 'black',
		piece: 'queen',
		x: 4,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'd',
		id: '8d',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'rook',
		x: 1,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'a',
		id: '8a',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'rook',
		x: 8,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'h',
		id: '8h',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'bishop',
		x: 3,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'c',
		id: '8c',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'bishop',
		x: 6,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'f',
		id: '8f',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'knight',
		x: 2,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'b',
		id: '8b',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'knight',
		x: 7,
		y: 8,
		isCaptured: false,
		row: '8',
		col: 'g',
		id: '8g',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 1,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'a',
		id: '7a',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 2,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'b',
		id: '7b',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 3,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'c',
		id: '7c',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 4,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'd',
		id: '7d',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 5,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'e',
		id: '7e',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 6,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'f',
		id: '7f',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 7,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'g',
		id: '7g',
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
		legalMoves: [],
	},
	{
		color: 'black',
		piece: 'pawn',
		x: 8,
		y: 7,
		isCaptured: false,
		row: '7',
		col: 'h',
		id: '7h',
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
		legalMoves: [],
	},
];