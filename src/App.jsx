import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import getPokemon from './api.js'
import DisplayPokemon from './DisplayPokemon.jsx'
import DisplayTitle from './DisplayTitle.jsx'

function setPrettyText(input) {
    return input
      .replace(/[^a-zA-Z ]/g, " ") // Remove non-letter symbols
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Change first letter to uppercase
      .join(' ');
  }

export default function App() {
  const initialPokemon = [];
  const [pokemons, setPokemons] = useState(initialPokemon)
  const [count, setCount] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [winState, setWinState] = useState('none')
  const [maximum, setMaximum] = useState(8)
  const [usedNumbers, setUsedNumbers] = useState([])
  const [cardsDisabled, setCardsDisabled] = useState(false)
  const [cardsGotten, setCardsGotten] = useState(false)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getNoDuplicates() {
    let num = getRandomInt(983)
    while (usedNumbers.includes(num)) {
      num = getRandomInt(983);
    }
    //console.log(`Trying ${num}`);
    return num
  }
  
  useEffect(() => {
    async function fetchData() {
      const results = [];
      for (let i = 0; i < maximum; i++) {
        const data = await getPokemon(getNoDuplicates()).catch(error => console.error(error));
        results.push({
          id: data.id || null,
          name: setPrettyText(data.species.name) || null,
          imageSource: data.sprites.front_default || null,
          type: setPrettyText(data.types[0].type.name) || null,
          typeImage: data.types[0].sprite,
          clicked: false,
        });
        //console.log(data.types[0].type);
      }
      setPokemons(results)
    }
    fetchData();
    setCardsGotten(true);
    //console.log(cardsGotten);
  }, [maximum, cardsGotten]);

  function handleClick(item) {
    if (item.clicked === true){
      setCount(0);
      setWinState('lost');
      setCardsDisabled(true);
      //You Lost
    } else {
      setPokemons(prevPokemons =>
        prevPokemons.map(pokemon =>
          pokemon === item
            ? {...pokemon, clicked: true }
            : pokemon
        )
      )
      const nextCount = count + 1;
      setCount(nextCount);
      if (nextCount >= highScore) {setHighScore(nextCount)}
      const shuffle = pokemons => [...pokemons].sort(() => Math.random() - 0.5);
      setPokemons(shuffle);
      if (nextCount >= maximum) {
        //You Won
        setCardsDisabled(true);
        setWinState('won');
      };
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    setWinState('none');
    const form = e.target;
    const userInputField = form.elements['setMaximum'];
    //console.log(Number(userInputField.value));
    setMaximum(Number(userInputField.value));
    setCardsGotten(false);
    setCardsDisabled(false);
  }

  return (
    <>
    <DisplayTitle
      maximum={maximum}
      onSubmit={onSubmit}
      count={count} 
      highScore={highScore}
      winState={winState}
    />
    <DisplayPokemon
      pokemons={pokemons}
      onClick={handleClick}
      cardsDisabled={cardsDisabled}
    />
    </>
  )
}