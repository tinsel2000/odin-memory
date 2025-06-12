export default function DisplayPokemon({
    pokemons,
    onClick,
    cardsDisabled
}) {
    return (
        <ul className="pokemon-list">
            {pokemons.map(pokemon => (
            <div 
                key={pokemon.id} 
                className="pokemon-container" 
                onClick={e => {
                    onClick(pokemon)
                }}
                disabled={cardsDisabled}
            >
                <div className="pokemon-top">
                    <p>{pokemon ? pokemon.name : "Loading..."}</p>
                    <div className="pokemon-type-image-container">
                        <img 
                            className="pokemon-type-image" 
                            src={pokemon ? pokemon.typeImage : "Loading..."}
                        >
                        </img>
                    </div>
                </div>
                <div className="pokemon-image-container">
                    <img className="pokemon-image" src={pokemon ? pokemon.imageSource : "Loading..."}></img>
                </div>
                <p>Clicked: {pokemon.clicked ? 'True' : 'False'} </p>
            </div>
            ))}
        </ul>
    )
}