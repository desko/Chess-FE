import { useCallback, useEffect, useState } from "react";

export type BoardRect = {
	x: number;
	y: number;
	width: number;
};

const useBoardSize = (ref: React.RefObject<HTMLDivElement>) => {
	const [boardRect, setBoardRect] = useState<BoardRect>();
	
    const handleBoardSizes = useCallback(() => {
		if (
			ref.current &&
			ref.current instanceof HTMLElement
		) {
			ref.current.style.setProperty(
				'--inner-size',
				(ref.current as HTMLElement).clientWidth + 'px'
			);
			const { top, left: boardLeft } = (
				ref.current as HTMLElement
			).getBoundingClientRect();
			const docTop = document.documentElement.scrollTop;

			const boardTop = docTop + top;

			ref.current.style.setProperty(
				'--inner-x',
				boardLeft + 'px'
			);
			ref.current.style.setProperty(
				'--inner-y',
				boardTop + 'px'
			);

			setBoardRect({
				x: boardLeft,
				y: boardTop,
				width: ref.current.clientWidth
			})
		}
	}, [ref]);

	useEffect(() => {
		handleBoardSizes();
		window.addEventListener('resize', handleBoardSizes);

		return () => {
			window.removeEventListener('resize', handleBoardSizes);
		};
	}, [handleBoardSizes]);

	return boardRect;
}

export default useBoardSize;