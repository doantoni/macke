import './style.css'

export const RenderDeck = ({ deck, transferFromDeckToMe }) => {

    return (
      deck.map((card, i) => {
        const degrees = Math.floor(Math.random() * 10 + 1)
        return (
          <div className="deck">
            <img onClick={() => transferFromDeckToMe(i)} key={`deck-${card._id}`} style={{transform: `rotate(${degrees}deg)`}} src={card.imgBck} alt={card.img}/>
          </div>
        )
      })
    )
  }