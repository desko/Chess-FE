const getDiagonalStarts = (x: number,y: number) => {	
	const diagonalMainX = Math.max(1, x + y - 8);
    const diagonalMainY = Math.min(8, x + y - 1);
    const diagonalOppX = Math.min(8, x - y + 8);
    const diagonalOppY = Math.min(8, 8 - (x - y));

	return {
		diagonalMainX,
		diagonalMainY,
		diagonalOppX,
		diagonalOppY
	}
}

export default getDiagonalStarts;