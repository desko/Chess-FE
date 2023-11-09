type Square = {
	code: string;
	color: string;
};

const BoardSquare = ({ color, code }: Square) => {
	return (
		<div className='square'>
			<span className='square__tag'>{code}</span>
		</div>
	);
};

export default BoardSquare;
