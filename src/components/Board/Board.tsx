import { useState, Fragment, useEffect, useRef, useCallback } from 'react';
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

	// component logic

	const [dragged, setDragged] = useState(false);

	const innerRef = useRef(null);

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

	const handleBoardResize = useCallback(() => {
		if (
			innerRef.current &&
			(innerRef.current as HTMLElement) instanceof HTMLElement
		) {
			(innerRef.current as HTMLElement).style.setProperty(
				'--inner-size',
				(innerRef.current as HTMLElement).clientWidth + 'px'
			);
		}
	}, [innerRef]);

	useEffect(() => {
		handleBoardResize();
		window.addEventListener('resize', handleBoardResize);

		return () => {
			window.removeEventListener('resize', handleBoardResize);
		};
	}, [handleBoardResize]);

	const handleBoardDragStart = (e) => {
		setDragged(true);
	};

	const handleBoardDragEnd = (e) => {
		setDragged(false);
		if (
			innerRef.current &&
			(innerRef.current as HTMLElement) instanceof HTMLElement
		) {
			(innerRef.current as HTMLElement).style.setProperty(
				'--board-mouse-x',
				''
			);
			(innerRef.current as HTMLElement).style.setProperty(
				'--board-mouse-y',
				''
			);
		}
	};

	const handleBoardDrag = (e) => {
		if (
			innerRef.current &&
			(innerRef.current as HTMLElement) instanceof HTMLElement
		) {
			const { top, left: boardLeft } = (
				innerRef.current as HTMLElement
			).getBoundingClientRect();
			const docTop = document.documentElement.scrollTop;

			const boardTop = docTop + top;

			const { pageX: mouseX, pageY: mouseY } = e;
			let touchX, touchY;
			if (e?.targetTouches) {
				const { pageX, pageY } = e.targetTouches[0];
				touchX = pageX;
				touchY = pageY;
			}

			const mX = mouseX | touchX;
			const mY = mouseY | touchY;

			(innerRef.current as HTMLElement).style.setProperty(
				'--board-mouse-x',
				mX - boardLeft + 'px'
			);
			(innerRef.current as HTMLElement).style.setProperty(
				'--board-mouse-y',
				mY - boardTop + 'px'
			);
		}
	};

	return (
		<div className='board'>
			<div
				className='board__inner'
				onMouseDown={handleBoardDragStart}
				onTouchStart={handleBoardDragStart}
				onMouseUp={handleBoardDragEnd}
				onTouchEnd={handleBoardDragEnd}
				onMouseMove={handleBoardDrag}
				onTouchMove={handleBoardDrag}
				ref={innerRef}
			>
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
								piece={piece}
							/>
						);
					})}

					{DEF_POSITION.black.figures.map((piece) => {
						return (
							<Piece
								key={piece.col + piece.row}
								color='black'
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
