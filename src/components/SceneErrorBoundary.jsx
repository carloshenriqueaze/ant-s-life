import { Component } from "react";

export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("Erro na cena 3D:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <section className="scene-error" aria-label="Erro na cena 3D">
          <strong>Erro ao abrir o mundo 3D</strong>
          <span>{this.state.error.message}</span>
        </section>
      );
    }

    return this.props.children;
  }
}
