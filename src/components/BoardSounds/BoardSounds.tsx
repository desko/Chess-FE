import type { BoardSounds } from "../../common/constants/constants"
import type { SoundRefs } from '../Board/Board';

type Props = {
    sounds: BoardSounds;
    soundRefs: SoundRefs;
}

const BoardSounds = ({sounds, soundRefs}: Props) => {
  return (
    <div className="board__sounds">
        {
            sounds.move.map((sound, index) => {
                return (
                    <audio
                        ref={ref => soundRefs.move.push(ref)}
                        key={`board-move-${index}`}
                    >
                        <source src={sound.url} type='audio/mpeg'/>
                    </audio>
                )
            })
        }
        {
            sounds.check.map((sound, index) => {
                return (
                    <audio
                        ref={ref => soundRefs.check.push(ref)}
                        key={`board-check-${index}`}
                    >
                        <source src={sound.url} type='audio/mpeg'/>
                    </audio>
                )
            })
        }
        {
            sounds.capture.map((sound, index) => {
                return (
                    <audio
                        ref={ref => soundRefs.capture.push(ref)}
                        key={`board-capture-${index}`}
                    >
                        <source src={sound.url} type='audio/mpeg'/>
                    </audio>
                )
            })
        }
    </div>
  )
}

export default BoardSounds