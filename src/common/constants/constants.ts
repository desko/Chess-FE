
export type BoardSound = {
	url: string;
};

export type BoardSoundArray = BoardSound[];

export type BoardSounds = {
	capture: BoardSoundArray;
	move: BoardSoundArray;
	check: BoardSoundArray;
};

export const BOARD_SOUNDS: BoardSounds = {
	capture: [
		{
			url: 'src/assets/sounds/capture.mp3'
		}
	],
	move: [
		{
			url: 'src/assets/sounds/move-1.mp3'
		},
		{
			url: 'src/assets/sounds/move-2.mp3'
		},
		{
			url: 'src/assets/sounds/move-3.mp3'
		},
		{
			url: 'src/assets/sounds/move-4.mp3'
		},
		{
			url: 'src/assets/sounds/move-5.mp3'
		},
	],
	check: [
		{
			url: 'src/assets/sounds/check.mp3'
		}
	],

}