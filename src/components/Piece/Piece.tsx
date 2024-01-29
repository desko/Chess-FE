import { useRef, useState, type ReactElement } from 'react';
import type { PieceBoard, PieceColor } from '../../common/constants/positionConstant';
import KingWhite from '../../assets/set-online/king-w.svg?react';
import QueenWhite from '../../assets/set-online/queen-w.svg?react';
import RookWhite from '../../assets/set-online/rook-w.svg?react';
import BishopWhite from '../../assets/set-online/bishop-w.svg?react';
import KnightWhite from '../../assets/set-online/knight-w.svg?react';
import PawnWhite from '../../assets/set-online/pawn-w.svg?react';

import KingBlack from '../../assets/set-online/king-b.svg?react';
import QueenBlack from '../../assets/set-online/queen-b.svg?react';
import RookBlack from '../../assets/set-online/rook-b.svg?react';
import BishopBlack from '../../assets/set-online/bishop-b.svg?react';
import KnightBlack from '../../assets/set-online/knight-b.svg?react';
import PawnBlack from '../../assets/set-online/pawn-b.svg?react';
import type { BoardRect } from '../../hooks/useBoardSize';
import { Coords } from '../Board/Board';

type HandleClick = (e: React.MouseEvent<HTMLDivElement>) => void;

type Props = {
	boardRect: BoardRect;
	setNewPosition: (boardRect: BoardRect, coords: Coords, piece: PieceBoard, boardFlip: PieceColor) => void;
	color: 'white' | 'black';
	piece: PieceBoard;
	handleClick: HandleClick;
	selected: boolean;
	setSelectedPiece: React.Dispatch<React.SetStateAction<PieceBoard | null>>;
	boardFlip: PieceColor;
};

type pieceMapSide = {
	king: ReactElement;
	queen: ReactElement;
	rook: ReactElement;
	bishop: ReactElement;
	knight: ReactElement;
	pawn: ReactElement;
};

type PieceMap = {
	white: pieceMapSide;
	black: pieceMapSide;
};

const pieceMap: PieceMap = {
	white: {
		king: <KingWhite />,
		queen: <QueenWhite />,
		rook: <RookWhite />,
		bishop: <BishopWhite />,
		knight: <KnightWhite />,
		pawn: <PawnWhite />,
	},
	black: {
		king: <KingBlack />,
		queen: <QueenBlack />,
		rook: <RookBlack />,
		bishop: <BishopBlack />,
		knight: <KnightBlack />,
		pawn: <PawnBlack />,
	},
};

const Piece = ({ boardRect, setNewPosition, piece, color, handleClick, selected, setSelectedPiece, boardFlip }: Props) => {
	const [dragged, setDragged] = useState(false);
	const pieceRef = useRef<HTMLDivElement>(null);
	const dragPieceStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setDragged(true);
		if(!dragged) setSelectedPiece(piece);
	};

	const dragPieceEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		e.stopPropagation();
		
		setDragged(false);

		const mouseCoords: Coords = {
			x: 0,
			y: 0,
		}

		if ('changedTouches' in e) {
			const { pageX, pageY } = e.changedTouches[0];
			mouseCoords.x = pageX;
			mouseCoords.y = pageY;
		} else {
			mouseCoords.x = e.pageX;
			mouseCoords.y = e.pageY;
		}

		if (
			pieceRef.current &&
			(pieceRef.current as HTMLElement) instanceof HTMLElement
		) {
			(pieceRef.current as HTMLElement).style.setProperty(
				'--mouse-x',
				''
			);
			(pieceRef.current as HTMLElement).style.setProperty(
				'--mouse-y',
				''
			);
		}

		setNewPosition(boardRect, mouseCoords, piece, boardFlip);
	};

	const dragPiece = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
	) => {
		if (dragged) {
			let mouseX, mouseY;

			if ('touches' in e) {
				const { pageX, pageY } = e.touches[0];
				mouseX = pageX;
				mouseY = pageY;
			} else {
				mouseX = e.pageX;
				mouseY = e.pageY;
			}

			if (
				pieceRef.current &&
				(pieceRef.current as HTMLElement) instanceof HTMLElement
			) {
				(pieceRef.current as HTMLElement).style.setProperty(
					'--mouse-x',
					mouseX + 'px'
				);
				(pieceRef.current as HTMLElement).style.setProperty(
					'--mouse-y',
					mouseY + 'px'
				);
			}
		}
	};

	const coordMapBoardRotate = {
		white: {
			x: piece.x,
			y: 8 - piece.y + 1,
		},
		black: {
			x: 8 - piece.x + 1,
			y: piece.y,
		}
	};

	if(piece.isCaptured) return;

	return (
		<div
			ref={pieceRef}
			onClick={handleClick}
			onMouseDown={dragPieceStart}
			onTouchStart={dragPieceStart}
			onMouseUp={dragPieceEnd}
			onTouchEnd={dragPieceEnd}
			onMouseMove={dragPiece}
			onTouchMove={dragPiece}
			style={({
				'--col-num': coordMapBoardRotate[boardFlip].x,
				'--row-num': coordMapBoardRotate[boardFlip].y,
			} as unknown) as React.CSSProperties}
			className={`piece ${piece.piece} ${selected && 'selected'} ${dragged ? 'dragged' : 'static'}`}
		>
			{pieceMap[color][piece.piece]}
		</div>
	);
};

export default Piece;
