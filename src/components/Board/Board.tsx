import { Fragment } from 'react';
import './Board.scss';
import { DEF_POSITION } from '../../common/constants/constants';
import Piece from '../Piece/Piece';

const Board = () => {
	type Square = {
		rowCount: number;
		colCount: number;
		row: string;
		col: string;
		code: string;
		color: 'white' | 'black';
	};

	type Column = Square[];
	type Rows = Column[];

	const cols = 8;
	const rows = 8;
	const charA = 97;
	const boardArray: Rows = [];

	for (let i = rows; i > 0; i--) {
		const colArray: Column = [];

		for (let j = 0; j < cols; j++) {
			const square: Square = {
				rowCount: j + 1,
				colCount: i,
				row: String.fromCharCode(charA + j),
				col: i.toString(),
				code: String.fromCharCode(charA + j) + i.toString(),
				color: (i + j) % 2 === 0 ? 'white' : 'black',
			};
			colArray.push(square);
		}

		boardArray.push(colArray);
	}

	return (
		<div className='board'>
			<div className='board__squares'>
				{boardArray.map((col, columnIndex) => (
					<Fragment key={'col' + columnIndex}>
						{col.map((square, rowIndex) => (
							<div
								key={'row' + columnIndex + 'sqr' + rowIndex}
								className={`square ${square.code} ${
									(columnIndex + rowIndex) % 2 === 0
										? 'white'
										: 'black'
								}`}
							></div>
						))}
					</Fragment>
				))}
			</div>

			<div className='board__figures'>
				{DEF_POSITION.white.figures.map((piece) => {
					return (
						<Piece
							key={piece.col + piece.row}
							color='white'
							piece={piece.piece}
						/>
					);
				})}

				{DEF_POSITION.black.figures.map((piece) => {
					return (
						<Piece
							key={piece.col + piece.row}
							color='black'
							piece={piece.piece}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Board;
