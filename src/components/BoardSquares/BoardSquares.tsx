import type { PieceBoard } from "../../common/constants/constants";
import type { Board } from "../../common/helpers/getBoardByColor";
import type { LegalMove } from "../../common/constants/constants";

type Props = {
	boardArray: Board;
	selectedPiece: PieceBoard | null;
};

const BoardSquares = ({boardArray, selectedPiece}: Props) => {
	return (
		<div className='board__squares'>
			{
				boardArray.map((square) => {
						const {x,y} = square;

						let legalMoves = null;
						let contains = null;

						if(selectedPiece) {
							legalMoves = selectedPiece.legalMoves;
							contains = legalMoves.find((move: LegalMove) => move.x === x && move.y === y)
						}
						
						return (
						<div
							key={'row' + y + 'col' + x}
							className={`square ${square.code} ${square.x}_${square.y} ${!!contains ? 'legal' : ''} ${
								(x + y + 1) % 2 === 0
									? 'white'
									: 'black'
							}`}
						></div>
					);
				})
			}
		</div>
	);
};

export default BoardSquares;
