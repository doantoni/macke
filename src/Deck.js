import { DeckConfig } from "./DeckConfig"

export const Deck = (numOfPlayers) => { 
    console.log('num of players: ', numOfPlayers)
    const multiplyingDeck = []
    DeckConfig(numOfPlayers).map(card => {
       for(let i = 0; i < card.qty; i++){
        multiplyingDeck.push({...card, _id: `${card.img}${i}`})
       }
    })

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

    let returnDeck = shuffle(multiplyingDeck)
    return returnDeck
}