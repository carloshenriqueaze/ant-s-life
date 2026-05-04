import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import HUD from "./components/HUD.jsx";
import GameOverScreen from "./components/GameOverScreen.jsx";
import SceneErrorBoundary from "./components/SceneErrorBoundary.jsx";

const GameScene = lazy(() => import("./components/GameScene.jsx"));

const initialGame = {
  status: "start",
  health: 100,
  food: 0,
  objective: "Colete 5 migalhas e volte ao formigueiro",
  message: "",
};

export default function App() {
  const [runId, setRunId] = useState(0);
  const [game, setGame] = useState(initialGame);

  const startGame = useCallback(() => {
    setRunId((value) => value + 1);
    setGame({ ...initialGame, status: "playing" });
  }, []);

  const updateGame = useCallback((patch) => {
    setGame((current) => {
      const next = typeof patch === "function" ? patch(current) : { ...current, ...patch };
      if (next.health <= 0 && current.status !== "gameover") {
        return {
          ...next,
          health: 0,
          status: "gameover",
          message: "A aranha alcançou a formiga.",
        };
      }
      if (next.food >= 5 && current.status === "playing") {
        return {
          ...next,
          objective: "Volte ao formigueiro para completar a missão",
        };
      }
      return next;
    });
  }, []);

  const uiGame = useMemo(
    () => ({
      health: game.health,
      food: game.food,
      objective: game.objective,
      status: game.status,
    }),
    [game]
  );

  return (
    <main className="app-shell">
      {game.status !== "start" && (
        <SceneErrorBoundary>
          <Suspense fallback={<div className="loading-screen">Carregando quintal...</div>}>
            <GameScene key={runId} game={game} onGameChange={updateGame} />
          </Suspense>
        </SceneErrorBoundary>
      )}
      {game.status !== "start" && <HUD game={uiGame} />}

      {game.status === "start" && (
        <section className="start-screen" aria-label="Tela inicial">
          <div className="title-stack">
            <p className="kicker">protótipo jogável 3D</p>
            <h1>Vida de Formiga</h1>
            <p>
              Atravesse um quintal gigante, colete migalhas e evite a aranha
              antes de voltar para o formigueiro.
            </p>
          </div>
          <button className="primary-button" onClick={startGame}>
            Iniciar jogo
          </button>
          <p className="controls-note">WASD ou setas para andar</p>
        </section>
      )}

      {game.status === "gameover" && (
        <GameOverScreen food={game.food} message={game.message} onRestart={startGame} />
      )}
    </main>
  );
}
