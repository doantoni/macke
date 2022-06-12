import { Player } from '../Player'
import './style.css'

export const Table = ({players, numOfPlayers}) => {
    return (
        <div className="table">
        {
          players.map((player, i) => {
            const turnDegrees = 360 / numOfPlayers
            return (<Player player={player} turnDegrees={turnDegrees} index={i}/>)
          })
        }
      </div> 
    )
}