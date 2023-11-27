import { useRef, useState, type ReactElement } from 'react';
import { throttle } from 'lodash-es';
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

const Piece = ({ piece, color }: Props) => {
	const [dragged, setDragged] = useState(false);
	const pieceRef = useRef<HTMLDivElement>(null);
	const movePiece = () => {};
	const dragPieceStart = () => {
		setDragged(true);
	};

	const dragPieceEnd = () => {
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
			console.log(e);
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
			onClick={movePiece}
			onMouseDown={dragPieceStart}
			onTouchStart={dragPieceStart}
			onMouseUp={dragPieceEnd}
			onTouchEnd={dragPieceEnd}
			onMouseMove={dragPiece}
			onTouchMove={dragPiece}
			style={{
				'--row-num': piece.rowCount,
				'--col-num': piece.colCount,
			}}
			className={`piece ${piece.piece} ${dragged ? 'dragged' : 'static'}`}
		>
			{pieceMap[color][piece.piece]}
		</div>
	);
};

export default Piece;
