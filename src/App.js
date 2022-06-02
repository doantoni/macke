import React, {useState, useEffect} from 'react'
import './App.css';

function App() {


const [myCards, setMyCards] = useState([])

useEffect(() => {
  setMyCards([
    '/imgs/Cool.png',
    '/imgs/Bomba.png',
    '/imgs/Macka 3.png',
    '/imgs/Macka 5.png',
    '/imgs/Zmesaj.png',
  ])
}, [])


const renderMyCards = () => {
  return(
    <>
    {
      myCards.map(card => <img src={card} alt={card}/>)
    }
    </>
  )
}


  return (
    <div className='app'>
      <div className="container">
        <h1>Macke</h1>
        <div className="main-cards">
          <img src="/imgs/Cool.png" alt="" />
        </div>
        <div className="players">
          <div className='player'>player1</div>
          <div className='player'>player2</div>
          <div className='player'>
            {
              renderMyCards()
            }
            player3
            </div>
          <div className='player'>player4</div>
        </div>
      </div> 
    </div>
  );
}

export default App;
