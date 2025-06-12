
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default async function getPokemon(number) {
  if (!number) {
    number = getRandomInt(983);
  }

  const reqUrl = 'https://pokeapi.co/api/v2/pokemon/' + number
  const response = await fetch( 
      reqUrl, 
      { mode: 'cors'} 
  )
  const returnedData = await response.json();

  const reqUrl2 = 'https://pokeapi.co/api/v2/type/' + returnedData.types[0].type.name
  const response2 = await fetch( 
      reqUrl2, 
      { mode: 'cors'} 
  )
  const returnedData2 = await response2.json();
  //console.error(returnedData2.sprites.versions);
  //console.log(returnedData2.sprites.versions['generation-vii'][0]);
  returnedData.types[0].sprite = returnedData2.sprites['generation-vii']['sun-moon'].name_icon;
  //return returnedData2.sprites['generation-vii']['sun-moon'].name_icon
  //return returnedData.types[0]
  return returnedData
}

//console.log(await getPokemon());