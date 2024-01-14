import { Fragment, useEffect, useRef, useCallback, useState } from 'react';
import './Board.scss';
import { DEF_POSITION, TEST_WHITE_POSITION } from '../../common/constants/constants';
import Piece from '../Piece/Piece';
import getLegalMoves from '../../common/helpers/getLegalMoves';
import type { PositionBoard, PieceBoard } from '../../common/constants/constants';

type Square = {
	y: number;
	x: number;
	row: string;
	col: string;
	code: string;
	color: 'white' | 'black';
};

type Column = Square[];
type Rows = Column[];
export type BoardHistory = PositionBoard[];


const Board = () => {

	const cols = 8;
	const rows = 8;
	const charA = 97;
	const boardArray: Rows = [];

	const innerRef = useRef<HTMLDivElement>(null);

	const [boardHistory, setBoardHistory] = useState<BoardHistory>([TEST_WHITE_POSITION]);
	const [selectedPiece, setselectedPiece] = useState<PieceBoard | null>(null);
	
	const legalMoves = getLegalMoves(boardHistory, 'white');
	console.log(boardHistory);

	console.log(boardHistory[0].filter((el) => Object.values(el.pins).includes(true)));
	

	const selecPiece = (row: number, col: number) => {
		const p = boardHistory[boardHistory.length - 1].find(
			(el: PieceBoard) => el.y === row && el.x === col
		);
	};

	for (let i = rows; i > 0; i--) {
		const colArray: Column = [];

		for (let j = 0; j < cols; j++) {
			const square: Square = {
				y: j + 1,
				x: i,
				row: String.fromCharCode(charA + j),
				col: i.toString(),
				code: String.fromCharCode(charA + j) + i.toString(),
				color: (i + j) % 2 === 0 ? 'white' : 'black',
			};
			colArray.push(square);
		}

		boardArray.push(colArray);
	}

	const handleBoardSizes = useCallback(() => {
		if (
			innerRef.current &&
			(innerRef.current as HTMLElement) instanceof HTMLElement
		) {
			(innerRef.current as HTMLElement).style.setProperty(
				'--inner-size',
				(innerRef.current as HTMLElement).clientWidth + 'px'
			);
			const { top, left: boardLeft } = (
				innerRef.current as HTMLElement
			).getBoundingClientRect();
			const docTop = document.documentElement.scrollTop;

			const boardTop = docTop + top;

			(innerRef.current as HTMLElement).style.setProperty(
				'--inner-x',
				boardLeft + 'px'
			);
			(innerRef.current as HTMLElement).style.setProperty(
				'--inner-y',
				boardTop + 'px'
			);
		}
	}, [innerRef]);

	useEffect(() => {
		handleBoardSizes();
		window.addEventListener('resize', handleBoardSizes);

		return () => {
			window.removeEventListener('resize', handleBoardSizes);
		};
	}, [handleBoardSizes]);

	return (
		<div className='board'>
			<div className='board__inner' ref={innerRef}>
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
					{boardHistory[boardHistory.length - 1].map((piece) => {
						return (
							<Piece
								handleClick={() => {
									selecPiece(piece.y, piece.x);
								}}
								key={piece.col + piece.row}
								color={piece.color}
								piece={piece}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Board;
