import './style.css'

export const RenderPlayedCards = ({stackedCards, resetDeck}) => {
    return (
      stackedCards.map(card => {
    const degrees = Math.floor(Math.random() * 10 + 1)
      return (
        <div className="played-cards">
          <img onClick={resetDeck} key={`stacked-${card._id}`} style={{transform: `rotate(${degrees}deg)`}} src={card.img} alt={card.img}/>
        </div>
      )
    })
    )
  }