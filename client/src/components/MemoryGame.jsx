import { useState, useEffect } from 'react';

const CARD_EMOJIS = ['🎧', '👕', '☕', '📱', '⌚', '🎮', '📷', '💻'];

function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createBoard() {
    const pairs = [...CARD_EMOJIS, ...CARD_EMOJIS];
    return shuffleArray(pairs).map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
    }));
}

function MemoryGame() {
    const [cards, setCards] = useState(createBoard());
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isPlaying && matches < 8) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, matches]);

    const handleCardClick = (id) => {
        if (isLocked) return;
        const card = cards.find(c => c.id === id);
        if (card.flipped || card.matched) return;

        if (!isPlaying) setIsPlaying(true);

        const newCards = cards.map(c =>
            c.id === id ? { ...c, flipped: true } : c
        );
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setIsLocked(true);

            const [first, second] = newFlipped;
            const card1 = newCards.find(c => c.id === first);
            const card2 = newCards.find(c => c.id === second);

            if (card1.emoji === card2.emoji) {
                setCards(prev => prev.map(c =>
                    c.id === first || c.id === second
                        ? { ...c, matched: true }
                        : c
                ));
                setMatches(m => m + 1);
                setFlippedCards([]);
                setIsLocked(false);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        c.id === first || c.id === second
                            ? { ...c, flipped: false }
                            : c
                    ));
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 800);
            }
        }
    };

    const resetGame = () => {
        setCards(createBoard());
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setIsLocked(false);
        setTimer(0);
        setIsPlaying(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="puzzle-section">
            <div className="puzzle-header">
                <h3>🧩 Product Memory Match</h3>
                <p>Match all the product pairs to win!</p>
            </div>

            <div className="puzzle-stats">
                <div className="puzzle-stat">
                    <div className="puzzle-stat-value">{moves}</div>
                    <div className="puzzle-stat-label">Moves</div>
                </div>
                <div className="puzzle-stat">
                    <div className="puzzle-stat-value">{matches}/8</div>
                    <div className="puzzle-stat-label">Matched</div>
                </div>
                <div className="puzzle-stat">
                    <div className="puzzle-stat-value">{formatTime(timer)}</div>
                    <div className="puzzle-stat-label">Time</div>
                </div>
            </div>

            <div className="memory-grid">
                {cards.map(card => (
                    <div
                        key={card.id}
                        className={`memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {card.flipped || card.matched ? card.emoji : '❓'}
                    </div>
                ))}
            </div>

            <button className="puzzle-reset-btn" onClick={resetGame}>
                🔄 New Game
            </button>

            {matches === 8 && (
                <div className="puzzle-win">
                    <h4>🎉 Congratulations!</h4>
                    <p>You matched all pairs in {moves} moves and {formatTime(timer)}!</p>
                </div>
            )}
        </div>
    );
}

export default MemoryGame;
