import React, {useState, useEffect} from 'react'
import { Deck } from './Deck'
import './App.css';

function App() {
  const numOfPlayers = 5
  const [deck, setDeck] = useState(Deck(numOfPlayers))
  const [stackedCards, setStackedCards] = useState([])
  const [myCards, setMyCards] = useState([])
  const [players, setPlayers] = useState([])

  const initialNumOfCards = 5

    
  const giveMeCards = () => {
    let myCardsArr = []
    let deckArr = deck
    for(let i = 0 ; i < initialNumOfCards ; i++){
      const cardIndex = Math.floor(Math.random()*deckArr.length)
      var card = deckArr[cardIndex];
      myCardsArr.push(card)
      deckArr = deckArr.filter((card, i) => i !== cardIndex)
    }
    setMyCards(myCardsArr)
    setDeck(deckArr)
  }

  const resetDeck = () => {
    setDeck(Deck(numOfPlayers))
  }

  const transferFromDeckToMe = (index) => {
    let takenCard = deck.filter((card, i) => i === index)[0]
    let deckNewCards = deck.filter((card, i) => i !== index)
    setMyCards([...myCards, takenCard])
    setDeck(deckNewCards)
  }

  const renderDeck = () => {
    return (
      deck.map((card, i) => {
        const degrees = Math.floor(Math.random() * 10 + 1)
        return (<img onClick={() => transferFromDeckToMe(i)} key={`deck-${card._id}`} style={{transform: `rotate(${degrees}deg)`}} src={card.imgBck} alt={card.img}/>)
      })
    )
  }

  const renderPlayedCards = () => {
    return (
      stackedCards.map(card => {
    const degrees = Math.floor(Math.random() * 10 + 1)
      return (<img onClick={resetDeck} key={`stacked-${card._id}`} style={{transform: `rotate(${degrees}deg)`}} src={card.img} alt={card.img}/>)
    })
    )
  }

  const throwCard = (index) => {
    let thrownCard = myCards.filter((card, i) => i === index)[0]
    setMyCards(myCards.filter((card, i) => i !== index))
    setStackedCards([...stackedCards, thrownCard])
  }

  const renderMyCards = () => {
    return(
        myCards.map((card, i) => <img key={`my-${card?._id}`} onClick={() => throwCard(i)} src={card?.img} alt={card?.img}/>)
    )
  }

  useEffect(() => {
    resetDeck()
    let playersArr = []
    for(let i = 0; i < numOfPlayers ; i++){
      playersArr.push({
        index: i,
        cards: [
          deck[0],
          deck[1],
          deck[2],
          deck[3],
          deck[4],
          deck[5]
        ]
      })
    }
    setPlayers(playersArr)
  }, [])

  useEffect(() => {
    if(deck.length === Deck(numOfPlayers).length){
      giveMeCards()
      setStackedCards([])
      console.log('Deck: ', deck)
    }
  }, [deck])


    return (
      <div className='app'>
        <div className="container">
        <h1>Mačke</h1>
        <div className="room">
          <div className="table">
            {
              players.map((player, i) => {
                const turnDegrees = 360 / numOfPlayers
                return (
                  <div key={player.index} style={{transform: `rotate(${i * turnDegrees}deg)`}} className="player-element">
                    <div style={{transform: `rotate(-${i * turnDegrees}deg)`}} className="player">
                      <div className="circle">
                       Igrač {i + 1}
                      </div>
                    
                     <div className="player-cards">
                      {
                        player.cards.map(card => {
                          const degrees = Math.floor(Math.random() * 10 + 1)
                        return (<img src={card.imgBck} style={{transform: `rotate(${degrees}deg)`}} key={`player${player.index}-card`} alt={`player${player.index}-card`} />)
                      })
                      }
                     </div>
                    </div>
                  </div>
                )
              })
            }
              
          </div>   
        </div>
        
      
          <div className="deck">
            {
              renderDeck()
            }
          </div>
    
      
    
          <div className="played-cards">
            {
              renderPlayedCards()  
            }
          </div>


          <div className="my-cards">
          { myCards.length !==0 &&
            renderMyCards()
          }
          </div>
          
        </div> 
      </div>
    );
}

export default App;
