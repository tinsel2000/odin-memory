export default function DisplayTitle({
    maximum,
    onSubmit,
    count,
    highScore,
    winState,
}) {
    return (
        <>
            <header>The Memory Game</header>
            <div className="game-display">
                <div className="score-result">{
                    winState === 'won' ? 'Congratulations! You have a functional memory!' : 
                    winState === 'lost' ? 'Game Lost, try again?' : 
                    'Test your memory! Click all the cards without repeating yourself to win'
                }
                </div>
                <form 
                    className="set-maximum"
                    onSubmit={onSubmit}
                >
                    <label for="setMaximum">Set Number of Cards: </label>
                    <input
                        name="setMaximum"
                        type="number"
                        defaultValue={maximum}
                        min={6}
                        max={20}
                        placeholder={maximum}
                    />
                    <input 
                        type="submit" 
                        value="Submit" 
                    />
                </form>
                <div className="score-current">Current Score:  {count}</div>
                <div className="score-high">High Score:  {highScore}</div>
            </div>
        </>
    )
}