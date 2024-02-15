import React from 'react'
import {PieceColor } from '../../common/constants/positionConstant';
import type { Promotion } from '../Board/Board';
import './BoardPromotion.scss';
import QueenWhite from '../../assets/set-online/queen-w.svg?react';
import RookWhite from '../../assets/set-online/rook-w.svg?react';
import BishopWhite from '../../assets/set-online/bishop-w.svg?react';
import KnightWhite from '../../assets/set-online/knight-w.svg?react';

import QueenBlack from '../../assets/set-online/queen-b.svg?react';
import RookBlack from '../../assets/set-online/rook-b.svg?react';
import BishopBlack from '../../assets/set-online/bishop-b.svg?react';
import KnightBlack from '../../assets/set-online/knight-b.svg?react';
import { PieceMap } from '../Piece/Piece';
import Button from '../Button/Button';

type Props = {
	promotion: Promotion;
	turnColor: PieceColor;
	flipColor: PieceColor;
	// TODO pass handle promotion cancel 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClose: any;
	// TODO pass handle promotion 
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleClick: any;
};

const pieceMap: PieceMap = {
	white: {
		queen: <QueenWhite />,
		knight: <KnightWhite />,
		rook: <RookWhite />,
		bishop: <BishopWhite />,
	},
	black: {
		queen: <QueenBlack />,
		knight: <KnightBlack />,
		rook: <RookBlack />,
		bishop: <BishopBlack />,
	},
};

const BoardPromotion = ({promotion, turnColor, flipColor, handleClick, handleClose}: Props) => {
	const promoRotation = turnColor === flipColor ? '' : 'bottom';
	return (
		<div
			className={`board__promotions ${promoRotation}`}
			style={({
				'--col-num': promotion.move.x - 1,
				'--row-num': promotion.move.y - 1,
				'--white': turnColor === 'white' ? 1 : 0,
				'--perspective-white': flipColor === 'white' ? 1 : 0,
				'--black': turnColor === 'white' ? 0 : 1,
				'--perspective-black': flipColor === 'white' ? 0 : 1,
			} as unknown) as React.CSSProperties}
		>
			<div className="board__promotion-figures">
				{
					Object.values(pieceMap[turnColor]).map((PieceComponent, index) => (
						<i
							key={`promotion_${turnColor}_${index}`}
							onClick={() => handleClick(Object.keys(pieceMap[turnColor])[index])}
						>
							{PieceComponent}
						</i>
					))
				}
			</div>
			<Button onClick={handleClose} modifiers={['btn--edge', 'btn--full']}>X</Button>
		</div>
	)
}

export default BoardPromotion;