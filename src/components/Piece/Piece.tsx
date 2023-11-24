import type { ReactElement } from 'react';
import type { Piece } from '../../common/constants/constants';

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
	piece: Piece;
};

type pieceMapSide = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	king: ReactElement<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	queen: ReactElement<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rook: ReactElement<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	bishop: ReactElement<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	knight: ReactElement<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pawn: ReactElement<any>;
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
	return <div className={`piece ${piece}`}>{pieceMap[color][piece]}</div>;
};

export default Piece;
