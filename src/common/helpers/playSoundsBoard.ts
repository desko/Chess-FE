import type {BoardSounds, SoundRefs} from '../../components/Board/Board'

const playSoundsBoard = (soundRefs: SoundRefs, boardSounds: BoardSounds, setBoardSounds: React.Dispatch<React.SetStateAction<BoardSounds>>) => {
    if(boardSounds) {
        const sounds = soundRefs[boardSounds].filter((ref: (HTMLAudioElement | null)) => !!ref);
        const randomIndex = Math.floor(Math.random() * sounds.length);
        sounds[randomIndex]?.play();
        setBoardSounds(null);
    }
}

export default playSoundsBoard