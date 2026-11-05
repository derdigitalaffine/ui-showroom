import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode; adapterName: string };
type State = { failed: boolean };

export class AdapterBoundary extends Component<Props, State> {
  override state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  override render() {
    if (this.state.failed) return <p role="alert">{this.props.adapterName} konnte dieses Beispiel nicht anzeigen. Bitte eine andere Variante wählen.</p>;
    return this.props.children;
  }
}
