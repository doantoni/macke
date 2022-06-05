import React, {useState, useEffect} from 'react'
import { Deck } from './Deck'
import './App.css';

function App() {

const [deck, setDeck] = useState(Deck)
const [stackedCards, setStackedCards] = useState([])
const [myCards, setMyCards] = useState([])
const [players, setPlayers] = useState([])

const initialNumOfCards = 5
const numOfPlayers = 6
  
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
  setDeck(Deck)
  giveMeCards()
  setStackedCards([])
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
      return (<img onClick={() => transferFromDeckToMe(i)} key={`deck-${card.img}`} style={{transform: `rotate(${degrees}deg)`}} src={card.imgBck} alt={card.img}/>)
    })
  )
}

const renderPlayedCards = () => {
  return (
    stackedCards.map(card => {
   const degrees = Math.floor(Math.random() * 10 + 1)
    return (<img onClick={resetDeck} key={`stacked-${card.img}`} style={{transform: `rotate(${degrees}deg)`}} src={card.img} alt={card.img}/>)
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
      myCards.map((card, i) => <img key={`my-${card?.img}`} onClick={() => throwCard(i)} src={card?.img} alt={card?.img}/>)
  )
}

useEffect(() => {
  resetDeck()
  let playersArr = []
  for(let i = 0; i < numOfPlayers ; i++){
    playersArr.push(i)
  }
  setPlayers(playersArr)
}, [])


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
                <div style={{transform: `rotate(${i * turnDegrees}deg)`}} className="player-element">
                  <div style={{transform: `rotate(-${i * turnDegrees}deg)`}} className="player">Igrač {i + 1}</div>
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
