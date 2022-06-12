import './style.css'

export const PlayerCards = ({player}) => {
  const turnDegrees = 10
  return (
    <div className="player-cards" style={{
      transform: `rotate(-${player.cards.length * turnDegrees / 2}deg)`
    }}>
      {
        player.cards.map((card, i) => {
          return (
              <img 
                src={card.imgBck} 
                style={{
                  transform: `rotate(${i * turnDegrees}deg)`,
                  transformOrigin: 'bottom center'
                }} 
                key={`player${player.index}-card${i}`} 
                alt={`player${player.index}-card${i}`} />
          )
        })
      }
    </div>
  )
}
