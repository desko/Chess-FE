import { useCallback, useEffect } from "react";

const useBoardSize = (ref: React.RefObject<HTMLDivElement>) => {
    const handleBoardSizes = useCallback(() => {
		if (
			ref.current &&
			(ref.current as HTMLElement) instanceof HTMLElement
		) {
			(ref.current as HTMLElement).style.setProperty(
				'--inner-size',
				(ref.current as HTMLElement).clientWidth + 'px'
			);
			const { top, left: boardLeft } = (
				ref.current as HTMLElement
			).getBoundingClientRect();
			const docTop = document.documentElement.scrollTop;

			const boardTop = docTop + top;

			(ref.current as HTMLElement).style.setProperty(
				'--inner-x',
				boardLeft + 'px'
			);
			(ref.current as HTMLElement).style.setProperty(
				'--inner-y',
				boardTop + 'px'
			);
		}
	}, [ref]);

	useEffect(() => {
		handleBoardSizes();
		window.addEventListener('resize', handleBoardSizes);

		return () => {
			window.removeEventListener('resize', handleBoardSizes);
		};
	}, [handleBoardSizes]);
}

export default useBoardSize;