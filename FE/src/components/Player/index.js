import { PlayerCards } from "../PlayerCards"
import './style.css'

export const Player = ({player, turnDegrees, index}) => {
    return (
        <div key={player.index} style={{transform: `rotate(${index * turnDegrees}deg)`}} className="player-element">
            <div style={{transform: `rotate(-${index * turnDegrees}deg)`}} className="player">
                <div className="circle">
                <PlayerCards player={player}/>  
                </div>
                <h1>    
                Igrač {index + 1}
                </h1>
            </div>
        </div>
    )
}
