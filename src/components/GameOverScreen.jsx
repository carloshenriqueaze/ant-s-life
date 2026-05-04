export default function GameOverScreen({ food, message, onRestart }) {
  return (
    <section className="game-over" aria-label="Fim de jogo">
      <div className="end-panel">
        <p className="kicker">fim da trilha</p>
        <h2>Game Over</h2>
        <p>{message || "A formiga não sobreviveu aos perigos do quintal."}</p>
        <p className="score-line">Migalhas coletadas: {food}</p>
        <button className="primary-button" onClick={onRestart}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}
