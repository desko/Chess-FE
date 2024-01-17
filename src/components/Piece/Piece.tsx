import { useRef, useState, type ReactElement } from 'react';
import type { PieceBoard } from '../../common/constants/constants';
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

type Props = {
	color: 'white' | 'black';
	piece: PieceBoard;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClick: any;
	setSelectedPiece: React.Dispatch<React.SetStateAction<PieceBoard | null>>;
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

const Piece = ({ piece, color, handleClick, setSelectedPiece }: Props) => {
	const [dragged, setDragged] = useState(false);
	const pieceRef = useRef<HTMLDivElement>(null);
	const dragPieceStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setDragged(true);
		if(!dragged) setSelectedPiece(piece);
	};

	const dragPieceEnd = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setSelectedPiece(null);
		setDragged(false);
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
				'--row-num': 8-piece.y+1,
				'--col-num': piece.x,
			} as unknown) as React.CSSProperties}
			className={`piece ${piece.piece} ${dragged ? 'dragged' : 'static'}`}
		>
			{pieceMap[color][piece.piece]}
		</div>
	);
};

export default Piece;
