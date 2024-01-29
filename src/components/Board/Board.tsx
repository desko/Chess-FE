import { useRef, useCallback, useState, useEffect } from 'react';
import './Board.scss';
import { DEF_POSITION } from '../../common/constants/positionConstant';
import Piece from '../Piece/Piece';
import getLegalMoves from '../../common/helpers/getLegalMoves';
import type { PositionBoard, PieceBoard, LegalMove, PieceColor } from '../../common/constants/positionConstant';
import getBoardByColor from '../../common/helpers/getBoardByColor';
import BoardSquares from '../BoardSquares/BoardSquares';
import useBoardSize, { BoardRect } from '../../hooks/useBoardSize';
import Button from '../Button/Button';
import { cloneDeep } from 'lodash-es';
import { BOARD_SOUNDS } from '../../common/constants/constants';
import playSoundsBoard from '../../common/helpers/playSoundsBoard';

export type BoardHistory = PositionBoard[];
export type Coords = {
	x: number;
	y: number;
};	

export type BoardSounds = 'move' | 'check' | 'capture' | null;
export type SoundRefs = {
	move: (HTMLAudioElement | null)[];
	check: (HTMLAudioElement | null)[];
	capture: (HTMLAudioElement | null)[];
};

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
	const [boardFlip, setBoardFlip] = useState<PieceColor>(selectedColor);	
	const [turnCount, setTurnCount] = useState<number>(0);
	const [boardSounds, setBoardSounds] = useState<BoardSounds>(null);

	const soundRefs: SoundRefs = {
		move: [],
		check: [],
		capture: [],
	};
	
	getLegalMoves(boardHistory, selectedColor);

	const selectPiece = useCallback((row: number, col: number) => {
		const p = boardHistory[boardHistory.length - 1].find(
			(el: PieceBoard) => el.y === row && el.x === col
		);

		if(p) {
			setSelectedPiece(p);
		}
	}, [boardHistory, setSelectedPiece]);

	useEffect(() => {
		playSoundsBoard(soundRefs, boardSounds, setBoardSounds);
	}, [boardSounds]);

	const setNewPosition = (boardRect: BoardRect, coords: Coords, piece: PieceBoard, boardFlip: PieceColor) => {
		const {x: boardX, y: boardY, width: boardW} = boardRect;
		const {x: mouseX, y: mouseY} = coords;
		const {x: pieceX, y: pieceY, id: pieceId} = piece;
		const squareWidth = boardW / 8;
		const calcX = mouseX - boardX;
		const calcY = mouseY - boardY;
		const latestPosition = boardHistory[boardHistory.length - 1];

		const coordMap = {
			white: {
				indexX: Math.floor(calcX / squareWidth) + 1,
				indexY: 8 - Math.floor(calcY / squareWidth),
			},
			black: {
				indexX: 8 - Math.floor(calcX / squareWidth),
				indexY: Math.floor(calcY / squareWidth) + 1,
			},
		}
		
		const {indexX, indexY} = coordMap[boardFlip];
		const move = piece.legalMoves.find((move: LegalMove) => move.x === indexX && move.y === indexY);
		const pieceIndex = latestPosition.findIndex((piece: PieceBoard) => piece.id === pieceId)

		if(move && pieceIndex >= 0) {
			const newPosition = cloneDeep(latestPosition);
			const pieceToTakeIndex = move.passant ? newPosition.findIndex((piece: PieceBoard) => piece.x === indexX && piece.y === pieceY && !piece.isCaptured) : newPosition.findIndex((piece: PieceBoard) => piece.x === indexX && piece.y === indexY && !piece.isCaptured);
			setBoardSounds('move');
			if (pieceToTakeIndex >= 0) {
				newPosition[pieceToTakeIndex].isCaptured = true;
				setBoardSounds('capture');
			}
			newPosition[pieceIndex].x = indexX;
			newPosition[pieceIndex].y = indexY;
			newPosition[pieceIndex].moved = true;
			setBoardHistory(prev => [...prev, newPosition]);
			setSelectedColor(prev => prev === 'white' ? 'black' : prev === 'black' ? 'white' : 'black');
			setTurnCount(boardHistory.length);
		}
	}

	const boardArray = getBoardByColor(boardFlip, rows, cols);	

	const boardRect = useBoardSize(innerRef);

	const handleClickFigures = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		const mouseCoords: Coords = {
			x: 0,
			y: 0,
		}

		if ('touches' in e) {
			const { pageX, pageY } = e.touches[0];
			mouseCoords.x = pageX;
			mouseCoords.y = pageY;
		} else {
			mouseCoords.x = e.pageX;
			mouseCoords.y = e.pageY;
		}
		
		setSelectedPiece(null);
		if(boardRect && selectedPiece) {
			setNewPosition(boardRect, mouseCoords, selectedPiece, boardFlip);
		}
	}
	
	return (
		<div className='board'>
			<div className="board__sounds">
				{
					BOARD_SOUNDS.move.map((sound, index) => {
						return (
							<audio
								ref={ref => soundRefs.move.push(ref)}
								key={`board-move-${index}`}
							>
								<source src={sound.url} type='audio/mpeg'/>
							</audio>
						)
					})
				}
				{
					BOARD_SOUNDS.check.map((sound, index) => {
						return (
							<audio
								ref={ref => soundRefs.check.push(ref)}
								key={`board-check-${index}`}
							>
								<source src={sound.url} type='audio/mpeg'/>
							</audio>
						)
					})
				}
				{
					BOARD_SOUNDS.capture.map((sound, index) => {
						return (
							<audio
								ref={ref => soundRefs.capture.push(ref)}
								key={`board-capture-${index}`}
							>
								<source src={sound.url} type='audio/mpeg'/>
							</audio>
						)
					})
				}
			</div>
			<Button
				type='button'
				onClick={() => setBoardFlip(boardFlip === 'white' ? 'black' : boardFlip === 'black' ? 'white' : 'black')}
			>
				Flip
			</Button>

			<div className="board__turns">
				{
					boardHistory.map((position: PositionBoard, index: number) => {
						return (
							<Button key={`board_position_${index}`} onClick={() => setTurnCount(index)}>{index.toString()}</Button>
						);
					})
				}
			</div>
			
			<div className='board__inner' ref={innerRef}>
				<BoardSquares
					boardArray={boardArray}
					selectedPiece={selectedPiece}
				/>

				<div className={`board__figures ${!!selectedPiece && 'has-selected'}`} onClick={handleClickFigures}>
					{boardHistory[turnCount].map((piece) => {
						return (
							<Piece
								boardRect={boardRect as BoardRect}
								setNewPosition={setNewPosition}
								handleClick={(e: React.MouseEvent<HTMLDivElement>) => {
									e.stopPropagation();
									selectPiece(piece.y, piece.x);
								}}
								selected={selectedPiece?.id === piece.id}
								setSelectedPiece={setSelectedPiece}
								key={piece.id}
								color={piece.color}
								piece={piece}
								boardFlip={boardFlip}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Board;
