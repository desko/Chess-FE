import { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import './Board.scss';
import { DEF_POSITION } from '../../common/constants/positionConstant';
import getLegalMoves, { clearLegalMoves } from '../../common/helpers/getLegalMoves';
import type { PositionBoard, PieceBoard, LegalMove, PieceColor, PieceType } from '../../common/constants/positionConstant';
import getBoardByColor from '../../common/helpers/getBoardByColor';
import BoardSquares from '../BoardSquares/BoardSquares';
import useBoardSize, { BoardRect } from '../../hooks/useBoardSize';
import Button from '../Button/Button';
import { cloneDeep } from 'lodash-es';
import { BOARD_SOUNDS } from '../../common/constants/constants';
import playSoundsBoard from '../../common/helpers/playSoundsBoard';
import BoardPromotion from '../BoardPromotion/BoardPromotion';
import BoardSounds from '../BoardSounds/BoardSounds';
import Piece from '../Piece/Piece';
export type BoardHistory = PositionBoard[];
export type Coords = {
	x: number;
	y: number;
};	

export type BoardSoundsType = 'move' | 'check' | 'capture' | null;
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

export type Promotion = {
	move: LegalMove;
	piece: PieceBoard;
	pieceToCapture: PieceBoard | null;
}

const Board = ({color='white', cols = 8, rows = 8}: Props) => {	
	const innerRef = useRef<HTMLDivElement>(null);
	const [boardHistory, setBoardHistory] = useState<BoardHistory>([DEF_POSITION]);
	const [selectedPiece, setSelectedPiece] = useState<PieceBoard | null>(null);
	const [selectedColor, setSelectedColor] = useState<PieceColor>(color);	
	const [boardFlip, setBoardFlip] = useState<PieceColor>(selectedColor);	
	const [turnCount, setTurnCount] = useState<number>(0);
	const [boardSounds, setBoardSounds] = useState<BoardSoundsType>(null);
	const [promotion, setPromotion] = useState<Promotion | null>(null);

	const soundRefs = useMemo(() => ({
		move: [],
		check: [],
		capture: [],
	}), []);
	
	if(promotion) {
		clearLegalMoves(boardHistory[boardHistory.length - 1])
	}

	if(!promotion) {
		getLegalMoves(boardHistory, selectedColor);
	}

	const selectPiece = useCallback((row: number, col: number) => {
		const p = boardHistory[boardHistory.length - 1].find(
			(piece: PieceBoard) => piece.y === row && piece.x === col && !piece.isCaptured
		);

		if(p) {
			setSelectedPiece(p);
		}
	}, [boardHistory, setSelectedPiece]);

	useEffect(() => {
		playSoundsBoard(soundRefs, boardSounds, setBoardSounds);
	}, [boardSounds, soundRefs]);

	const setNewPosition = (boardRect: BoardRect, coords: Coords, piece: PieceBoard, boardFlip: PieceColor) => {
		const {x: boardX, y: boardY, width: boardW} = boardRect;
		const {x: mouseX, y: mouseY} = coords;
		const {x: pieceX, y: pieceY, id: pieceId, color} = piece;
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
			
			if (pieceToTakeIndex >= 0 && !move.promotion) {
				newPosition[pieceToTakeIndex].isCaptured = true;
				setBoardSounds('capture');
			}
			
			newPosition[pieceIndex].x = indexX;
			newPosition[pieceIndex].y = indexY;
			newPosition[pieceIndex].moved = true;

			if(move.castles) {
				const bigger =  move.x > pieceX
				const rookToCastle = newPosition.filter((rook: PieceBoard) => rook.piece === 'rook' && rook.color === color && rook.y === pieceY && (bigger ? rook.x > piece.x : rook.x < piece.x))[0];
				const rookIndex = newPosition.findIndex((rook: PieceBoard) => rook.id === rookToCastle.id);
				newPosition[rookIndex].x = bigger ? indexX - 1 : indexX + 1;
				newPosition[rookIndex].moved = true;
			}

			if(move.promotion) {
				const pieceToCapture = pieceToTakeIndex >= 0 ? newPosition[pieceToTakeIndex]: null;
				const promotionMove: Promotion = {
					move: move,
					piece: piece,
					pieceToCapture,
				}
				console.log('promo');
				setPromotion(promotionMove);
			}

			setBoardHistory(prev => [...prev, newPosition]);
			setSelectedColor(prev => prev === 'white' ? 'black' : prev === 'black' ? 'white' : 'black');
			setTurnCount(boardHistory.length);
			setSelectedPiece(null);
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

	const handlePromotion = (pieceToPromote: PieceType) => {
		console.log(pieceToPromote);
		console.log(promotion);
		const latestPosition = cloneDeep(boardHistory[boardHistory.length - 1]);
		const pieceToPromoteIndex = latestPosition.findIndex((piece: PieceBoard) => piece.id === promotion?.piece.id);
		const pieceToCaptureIndex = latestPosition.findIndex((piece: PieceBoard) => piece.id === promotion?.pieceToCapture?.id);
		latestPosition[pieceToPromoteIndex].piece = pieceToPromote;
		setBoardSounds('move')
		if(pieceToCaptureIndex >=0 ) {
			latestPosition[pieceToCaptureIndex].isCaptured = true;
			setBoardSounds('capture')
		}

		setBoardHistory(prev => {
			const prevPos = cloneDeep(prev);
			prevPos[prevPos.length - 1] = latestPosition
			return prevPos;
		})
		setPromotion(null);
		setSelectedPiece(null);
	}

	console.log(selectedPiece);
	
	return (
		<div className={`board ${ boardFlip === 'black' ? 'flipped' : '' }`}>
			<BoardSounds 
				sounds={BOARD_SOUNDS}
				soundRefs={soundRefs}
			/>
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

				{
					promotion &&
					<BoardPromotion
						handleClick={handlePromotion}
						handleClose={() => {}}
						promotion={promotion}
						flipColor={boardFlip}
						turnColor={turnCount % 2 === 0 ? 'black' : 'white'}
					/>
				}

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
