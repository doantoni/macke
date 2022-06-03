import React, {useState, useEffect} from 'react'
import { Deck } from './Deck'
import './App.css';

function App() {

const [deck, setDeck] = useState([])
const [stackedCards, setStackedCards] = useState([])
const [myCards, setMyCards] = useState([])

const giveMeCards = () => {
  setMyCards([
    '/imgs/Cool.png',
    '/imgs/Bomba.png',
    '/imgs/Macka 3.png',
    '/imgs/Macka 5.png',
    '/imgs/Zmesaj.png',
  ])
}

const resetDeck = () => {
  setDeck(Deck)
  giveMeCards()
  setStackedCards([])
}

useEffect(() => {
  resetDeck()
}, [])

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
      return (<img onClick={() => transferFromDeckToMe(i)} key={`deck-${card}`} style={{transform: `rotate(${degrees}deg)`}} src={card} alt={card}/>)
    })
  )
}

const renderStackedCards = () => {
  return (
    stackedCards.map(card => {
   const degrees = Math.floor(Math.random() * 10 + 1)
    return (<img onClick={resetDeck} key={`stacked-${card}`} style={{transform: `rotate(${degrees}deg)`}} src={card} alt={card}/>)
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
    
      myCards.map((card, i) => <img key={card} onClick={() => throwCard(i)} src={card} alt={card}/>)
  
  )
}


  return (
    <div className='app'>
      <div className="container">
        <h1>Mačke</h1>
        <div className="deck">
          {
            renderDeck()
          }
        </div>
        <div className="stacked-cards">
          {
            renderStackedCards()  
          }
        </div>
        <div className="players">
          <div className='player'>igrač 1</div>
          <div className='player'>igrač 2</div>
          <div className='player'>igrač 3</div>
          <div className='player'>igrač 4</div>
        </div>
        <div className="my-cards">
        {
          renderMyCards()
        }
        </div>
        
      </div> 
    </div>
  );
}

export default App;
