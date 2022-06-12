import './style.css'

export const RenderMyCards = ({myCards, throwCard}) => {
    return(
        <div className="my-cards">
                {
                myCards.map((card, i) => (
                    <img 
                        key={`my-${card?._id}`} 
                        onClick={() => throwCard(i)} 
                        src={card?.img} 
                        alt={card?.img}
                    />
                ))
                }
            </div>
       
    )
  }