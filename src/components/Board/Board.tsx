import { Fragment, useEffect, useRef, useCallback, useState } from 'react';
import './Board.scss';
import { DEF_POSITION } from '../../common/constants/constants';
import Piece from '../Piece/Piece';
import getLegalMoves from '../../common/helpers/getLegalMoves';
import type { PositionBoard, PieceBoard, LegalMove, PieceColor } from '../../common/constants/constants';
import getBoardByColor from '../../common/helpers/getBoardByColor';
import BoardSquares from '../BoardSquares/BoardSquares';
import useBoardSize from '../../hooks/useBoardSize';


export type BoardHistory = PositionBoard[];

type Props = {
	color?: PieceColor;
	cols?: number;
	rows?: number;
};

const Board = ({color='white', cols = 8, rows = 8}: Props) => {	

	const innerRef = useRef<HTMLDivElement>(null);

	const [boardHistory, setBoardHistory] = useState<BoardHistory>([DEF_POSITION]);
	const [selectedPiece, setSelectedPiece] = useState<PieceBoard | null>(null);
	const [selectedColor, setSelectedColor] = useState<PieceColor>(color);	
	
	const lMoves = getLegalMoves(boardHistory, 'white');

	const selectPiece = useCallback((row: number, col: number) => {
		const p = boardHistory[boardHistory.length - 1].find(
			(el: PieceBoard) => el.y === row && el.x === col
		);

		if(p) {
			setSelectedPiece(p);
		}
	}, [boardHistory, setSelectedPiece]);

	const boardArray = getBoardByColor(selectedColor, rows, cols);	

	useBoardSize(innerRef);

	return (
		<div className='board'>
			<div className='board__inner' ref={innerRef}>
				<BoardSquares
					boardArray={boardArray}
					selectedPiece={selectedPiece}
				/>

				<div className='board__figures' onClick={() => setSelectedPiece(null)}>
					{boardHistory[boardHistory.length - 1].map((piece) => {
						return (
							<Piece
								handleClick={(e: React.MouseEvent<HTMLDivElement>) => {
									e.stopPropagation();
									selectPiece(piece.y, piece.x);
								}}
								setSelectedPiece={setSelectedPiece}
								key={piece.id}
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
