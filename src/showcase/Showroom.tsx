import { useEffect, useState } from 'react';
import { catalog, getCase, isValidVariant } from '../catalog';
import { capabilityFor, type ComponentId, type VariantId } from '../contracts';
import { muiAdapter } from '../adapters/mui';
import { mantineAdapter } from '../adapters/mantine';
import { AdapterBoundary } from './AdapterBoundary';
import './showroom.css';

const adapters = [muiAdapter, mantineAdapter] as const;
const frameworkDirectory = [
  { name: 'Material UI', type: 'Component Library', url: 'https://mui.com/material-ui/', status: 'Live' },
  { name: 'Mantine', type: 'Component Library', url: 'https://mantine.dev/', status: 'Live' },
  { name: 'Chakra UI', type: 'Component Library', url: 'https://chakra-ui.com/', status: 'Geplant' },
  { name: 'Ant Design', type: 'Design System', url: 'https://ant.design/', status: 'Geplant' },
  { name: 'Radix UI', type: 'Primitives', url: 'https://www.radix-ui.com/', status: 'Geplant' },
  { name: 'shadcn/ui', type: 'Component Collection', url: 'https://ui.shadcn.com/', status: 'Geplant' },
  { name: 'React Aria', type: 'Accessibility Primitives', url: 'https://react-aria.adobe.com/', status: 'Geplant' },
  { name: 'Fluent UI', type: 'Design System', url: 'https://react.fluentui.dev/', status: 'Geplant' },
  { name: 'PrimeReact', type: 'Component Library', url: 'https://primereact.org/', status: 'Geplant' },
  { name: 'Blueprint', type: 'Desktop UI', url: 'https://blueprintjs.com/', status: 'Geplant' },
  { name: 'NextUI / HeroUI', type: 'Component Library', url: 'https://www.heroui.com/', status: 'Geplant' },
  { name: 'Headless UI', type: 'Unstyled Components', url: 'https://headlessui.com/', status: 'Geplant' },
] as const;

type ViewState = { component: ComponentId; variant: VariantId; left: string; right: string };
function readState(): ViewState {
  const query = new URLSearchParams(window.location.search);
  const entry = getCase(query.get('component') ?? '') ?? catalog[0]!;
  const requestedVariant = query.get('variant') ?? 'default';
  return {
    component: entry.id,
    variant: isValidVariant(entry, requestedVariant) ? requestedVariant : 'default',
    left: adapters.some((adapter) => adapter.id === query.get('left')) ? query.get('left')! : 'mui',
    right: adapters.some((adapter) => adapter.id === query.get('right')) ? query.get('right')! : 'mantine',
  };
}

function invalidLinkNotice(): string {
  const query = new URLSearchParams(window.location.search);
  const component = query.get('component');
  const entry = component ? getCase(component) : undefined;
  const variant = query.get('variant');
  const invalidAdapter = ['left', 'right'].some((side) => {
    const value = query.get(side);
    return value !== null && !adapters.some((adapter) => adapter.id === value);
  });
  return (component && !entry) || (variant && entry && !isValidVariant(entry, variant)) || invalidAdapter
    ? 'Ein Teil des Links war ungültig. Die Ansicht wurde auf verfügbare Beispiele zurückgesetzt.'
    : '';
}

export function Showroom() {
  const [view, setView] = useState<ViewState>(readState);
  const [search, setSearch] = useState('');
  const [frameworkSearch, setFrameworkSearch] = useState('');
  const [notice, setNotice] = useState(invalidLinkNotice);
  const [tab, setTab] = useState<'compare' | 'directory'>('compare');
  useEffect(() => { const onPopState = () => { setView(readState()); setNotice(invalidLinkNotice()); }; window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState); }, []);
  function navigate(next: ViewState) {
    const params = new URLSearchParams({ component: next.component, variant: next.variant, left: next.left, right: next.right });
    window.history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
    setView(next);
    setNotice('');
  }
  const entry = getCase(view.component)!;
  const matches = catalog.filter((item) => `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase('de').includes(search.toLocaleLowerCase('de')));
  const frameworks = frameworkDirectory.filter((item) => `${item.name} ${item.type} ${item.status}`.toLocaleLowerCase('de').includes(frameworkSearch.toLocaleLowerCase('de')));
  return <div className="showroom">
    <a className="skip-link" href="#main">Zum Inhalt springen</a>
    <header className="site-header">
      <div className="brand"><span className="brand-mark" aria-hidden="true">◈</span><span>UI <strong>Showroom</strong></span></div>
      <nav className="top-nav" aria-label="Hauptnavigation"><button type="button" aria-current={tab === 'compare' ? 'page' : undefined} onClick={() => setTab('compare')}>Vergleich</button><button type="button" aria-current={tab === 'directory' ? 'page' : undefined} onClick={() => setTab('directory')}>Bibliotheken <span className="nav-count">{frameworkDirectory.length}</span></button></nav>
      <span className="header-meta">React UI · live vergleichen</span>
    </header>
    <main id="main">
      <section className="hero"><div className="eyebrow"><span className="live-dot" /> INTERAKTIVER KOMPONENTENVERGLEICH</div><h1>Ein Beispiel.<br /><em>Zwei Perspektiven.</em></h1><p>Vergleiche React UI-Bibliotheken unter denselben Bedingungen. Gleiche Inhalte, gleiche Zustände, echte Komponenten.</p><div className="hero-stats"><span><strong>02</strong> Live-Adapter</span><span><strong>04</strong> Referenzfälle</span><span><strong>12</strong> Bibliotheken im Blick</span></div></section>
      {tab === 'compare' ? <div className="workspace"><aside className="sidebar" aria-label="Komponentenkatalog"><div className="side-heading"><span>KATALOG</span><span>{catalog.length} Komponenten</span></div><label className="search-label" htmlFor="catalog-search">Komponenten suchen</label><input id="catalog-search" type="search" placeholder="Suchen …" value={search} onChange={(event) => setSearch(event.target.value)} />{matches.length ? <div className="catalog-list">{matches.map((item) => <button type="button" key={item.id} className={item.id === view.component ? 'catalog-item active' : 'catalog-item'} onClick={() => navigate({ ...view, component: item.id, variant: 'default' })}><span className="catalog-icon" aria-hidden="true">{item.id === 'button' ? '↗' : item.id === 'input' ? '⌁' : item.id === 'select' ? '▤' : '□'}</span><span><strong>{item.title}</strong><small>{item.category}</small></span><span className="catalog-arrow" aria-hidden="true">→</span></button>)}</div> : <div className="empty-state">Keine Treffer. <button type="button" onClick={() => setSearch('')}>Suche zurücksetzen</button></div>}<div className="sidebar-note"><span>◇</span><p>Jeder Referenzfall nutzt dieselben Texte, Optionen und Interaktionsziele.</p></div></aside>
      <section className="compare-area" aria-labelledby="case-title"><div className="section-kicker">KOMPONENTE / {entry.category.toUpperCase()}</div><div className="case-heading"><div><h2 id="case-title">{entry.title}</h2><p>{entry.description}</p></div><button className="copy-link" type="button" onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setNotice('Link kopiert.'); } catch { setNotice('Kopieren nicht möglich. Die Adresse steht in der Browserleiste.'); } }}>↗ Link kopieren</button></div>
      <div className="controls"><fieldset className="variant-picker"><legend>Zustand</legend><div>{entry.variants.map((variant) => <button type="button" key={variant} aria-pressed={view.variant === variant} onClick={() => navigate({ ...view, variant })}>{({ default: 'Standard', disabled: 'Deaktiviert', error: 'Fehler', loading: 'Lädt' } as const)[variant]}</button>)}</div></fieldset></div>
      <div className="comparison-grid">{(['left', 'right'] as const).map((side, index) => { const adapter = adapters.find((item) => item.id === view[side]) ?? adapters[index]!; const Renderer = adapter.render; const capability = capabilityFor(adapter, view.component, view.variant); return <article className="comparison-card" key={side}><div className="card-top"><div><span className="card-index">0{index + 1} / BIBLIOTHEK</span><label htmlFor={`${side}-adapter`} className="sr-only">{side === 'left' ? 'Linke Bibliothek' : 'Rechte Bibliothek'}</label><select id={`${side}-adapter`} value={adapter.id} onChange={(event) => navigate({ ...view, [side]: event.target.value })}>{adapters.map((option) => <option value={option.id} key={option.id}>{option.name}</option>)}</select></div><span className={`capability ${capability.status}`}>{capability.status === 'supported' ? '● Live' : capability.status}</span></div><div className="demo-surface"><AdapterBoundary key={`${adapter.id}-${view.component}-${view.variant}-${side}`} adapterName={adapter.name}>{capability.status === 'unsupported' ? <p>{capability.reason}</p> : <Renderer component={view.component} variant={view.variant} onAction={setNotice} />}</AdapterBoundary></div><div className="card-footer"><span>{adapter.name}</span><span>React Adapter · {view.variant}</span></div></article>; })}</div>
      <p className="status-message" role="status" aria-live="polite">{notice}</p><div className="context-note"><strong>Faire Bedingungen</strong><p>Die Beispiele teilen Beschriftungen, Optionen und Zielverhalten. Unterschiede in Gestaltung und API stammen aus den Bibliotheken.</p></div></section></div> : <section className="directory" aria-labelledby="directory-title"><div className="section-kicker">ÖKOSYSTEM / ÜBERSICHT</div><div className="directory-heading"><div><h2 id="directory-title">React UI Bibliotheken</h2><p>Ein breiter Überblick. Nur Material UI und Mantine sind hier als interaktive Adapter integriert und geprüft.</p></div><div><label className="search-label" htmlFor="framework-search">Bibliotheken suchen</label><input id="framework-search" type="search" placeholder="Name oder Typ suchen …" value={frameworkSearch} onChange={(event) => setFrameworkSearch(event.target.value)} /></div></div><div className="framework-grid">{frameworks.map((item, index) => <article className="framework-card" key={item.name}><span className="framework-number">{String(index + 1).padStart(2, '0')}</span><span className={item.status === 'Live' ? 'framework-status live' : 'framework-status'}>{item.status}</span><h3>{item.name}</h3><p>{item.type}</p><a href={item.url} target="_blank" rel="noopener noreferrer">Offizielle Website <span aria-hidden="true">↗</span></a></article>)}</div>{!frameworks.length && <div className="empty-state">Keine Bibliothek gefunden. <button type="button" onClick={() => setFrameworkSearch('')}>Suche zurücksetzen</button></div>}</section>}
    </main><footer className="site-footer"><span>UI SHOWROOM / 2026</span><span>Gleiche Beispiele. Klare Unterschiede.</span><a href="https://github.com/derdigitalaffine/ui-showroom" target="_blank" rel="noopener noreferrer">GitHub ↗</a></footer>
  </div>;
}
