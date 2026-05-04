export default function HUD({ game }) {
  return (
    <aside className="hud" aria-label="Estado do jogo">
      <div className="hud-card health-card">
        <span>Vida</span>
        <div className="health-track">
          <div className="health-fill" style={{ width: `${game.health}%` }} />
        </div>
        <strong>{Math.round(game.health)}%</strong>
      </div>

      <div className="hud-card">
        <span>Comida</span>
        <strong>{game.food}/5</strong>
      </div>

      <div className="hud-card objective">
        <span>Objetivo</span>
        <strong>{game.objective}</strong>
      </div>
    </aside>
  );
}
