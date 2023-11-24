export type Piece = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export type PieceBoard = {
	piece: Piece;
	isCaptured: boolean;
	rowCount: number;
	colCount: number;
	row: string;
	col: string;
};

export type PlayerBoard = {
	figures: PieceBoard[];
};

export type PositionBoard = {
	white: PlayerBoard;
	black: PlayerBoard;
};

export const DEF_POSITION: PositionBoard = {
	white: {
		figures: [
			{
				piece: 'king',
				isCaptured: false,
				rowCount: 8,
				colCount: 5,
				row: '1',
				col: 'e',
			},
			{
				piece: 'queen',
				isCaptured: false,
				rowCount: 8,
				colCount: 4,
				row: '1',
				col: 'd',
			},
			{
				piece: 'rook',
				isCaptured: false,
				rowCount: 8,
				colCount: 1,
				row: '1',
				col: 'a',
			},
			{
				piece: 'rook',
				isCaptured: false,
				rowCount: 8,
				colCount: 8,
				row: '1',
				col: 'h',
			},
			{
				piece: 'bishop',
				isCaptured: false,
				rowCount: 8,
				colCount: 3,
				row: '1',
				col: 'c',
			},
			{
				piece: 'bishop',
				isCaptured: false,
				rowCount: 8,
				colCount: 6,
				row: '1',
				col: 'f',
			},
			{
				piece: 'knight',
				isCaptured: false,
				rowCount: 8,
				colCount: 2,
				row: '1',
				col: 'b',
			},
			{
				piece: 'knight',
				isCaptured: false,
				rowCount: 8,
				colCount: 7,
				row: '1',
				col: 'g',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 1,
				row: '2',
				col: 'a',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 2,
				row: '2',
				col: 'b',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 3,
				row: '2',
				col: 'c',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 4,
				row: '2',
				col: 'd',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 5,
				row: '2',
				col: 'e',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 6,
				row: '2',
				col: 'f',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 7,
				row: '2',
				col: 'g',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 7,
				colCount: 8,
				row: '2',
				col: 'h',
			},
		],
	},
	black: {
		figures: [
			{
				piece: 'king',
				isCaptured: false,
				rowCount: 1,
				colCount: 5,
				row: '8',
				col: 'e',
			},
			{
				piece: 'queen',
				isCaptured: false,
				rowCount: 1,
				colCount: 4,
				row: '8',
				col: 'd',
			},
			{
				piece: 'rook',
				isCaptured: false,
				rowCount: 1,
				colCount: 1,
				row: '8',
				col: 'a',
			},
			{
				piece: 'rook',
				isCaptured: false,
				rowCount: 1,
				colCount: 8,
				row: '8',
				col: 'h',
			},
			{
				piece: 'bishop',
				isCaptured: false,
				rowCount: 1,
				colCount: 3,
				row: '8',
				col: 'c',
			},
			{
				piece: 'bishop',
				isCaptured: false,
				rowCount: 1,
				colCount: 6,
				row: '8',
				col: 'f',
			},
			{
				piece: 'knight',
				isCaptured: false,
				rowCount: 1,
				colCount: 2,
				row: '8',
				col: 'b',
			},
			{
				piece: 'knight',
				isCaptured: false,
				rowCount: 1,
				colCount: 7,
				row: '8',
				col: 'g',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 1,
				row: '7',
				col: 'a',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 2,
				row: '7',
				col: 'b',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 3,
				row: '7',
				col: 'c',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 4,
				row: '7',
				col: 'd',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 5,
				row: '7',
				col: 'e',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 6,
				row: '7',
				col: 'f',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 7,
				row: '7',
				col: 'g',
			},
			{
				piece: 'pawn',
				isCaptured: false,
				rowCount: 2,
				colCount: 8,
				row: '7',
				col: 'h',
			},
		],
	},
};
