import React, {useState, useEffect} from 'react'
import './style.css'
import { Deck } from '../../utils/Deck'
import { RenderDeck } from '../../components/Deck'
import { RenderPlayedCards } from '../../components/PlayedCards'
import { RenderMyCards } from '../../components/MyCards'
import { Table } from '../../components/Table'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as Colyseus from "colyseus.js"; 


export default function Game(){
    const [room, setRoom] = useState()
    const [numOfPlayers, setNumOfPlayers] = useState(7)
    const [deck, setDeck] = useState(Deck(numOfPlayers))
    const [stackedCards, setStackedCards] = useState([])
    const [myCards, setMyCards] = useState([])
    const [players, setPlayers] = useState([])
    const client = new Colyseus.Client('ws://localhost:3000');
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
  
    const throwCard = (index) => {
      let thrownCard = myCards.filter((card, i) => i === index)[0]
      setMyCards(myCards.filter((card, i) => i !== index))
      setStackedCards([...stackedCards, thrownCard])
    }
  
    // initial setup

    useEffect(() => {
      resetDeck()

      // Join room as client

      client.joinOrCreate("gameroom").then(room => {
        setRoom(room)
        console.log('Room: ', room)
        room.onStateChange(state => {
          console.log('New room state')
        })
        console.log(room.sessionId, "joined", room.name);
      }).catch(e => {
          console.log("JOIN ERROR", e);
      });

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
  
    // reset everything when deck resets

    useEffect(() => {
      if(deck.length === Deck(numOfPlayers).length){
        giveMeCards()
        setStackedCards([])
        console.log('Deck: ', deck)
      }
    }, [deck])
  
  
      return (
      <div className='game'>
          <div className="room">
            <Table players={players} numOfPlayers={numOfPlayers}/>  
            
          </div>
          <RenderDeck deck={deck} transferFromDeckToMe={transferFromDeckToMe}/>
          <RenderPlayedCards stackedCards={stackedCards} resetDeck={resetDeck}/>  
          <Popup trigger={<button style={{position: 'absolute', bottom: '1rem', right: '5rem'}}> Moje karte</button>} position="left center" modal>
          { myCards.length !==0 &&
            <RenderMyCards myCards={myCards} throwCard={throwCard}/>
          }
            </Popup>
        </div>
      );
}

 