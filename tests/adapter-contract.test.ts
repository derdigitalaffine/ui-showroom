import { describe, expect, it } from 'vitest';
import { catalog } from '../src/catalog';
import { capabilityFor } from '../src/contracts';
import { muiAdapter } from '../src/adapters/mui';
import { mantineAdapter } from '../src/adapters/mantine';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const adapters = [muiAdapter, mantineAdapter];

describe('Pflichtfall-Parität der Live-Adapter', () => {
  it.each(adapters)('$name erklärt jede kanonische Variante', (adapter) => {
    for (const entry of catalog) {
      for (const variant of entry.variants) {
        expect(adapter.capabilities[entry.id][variant], `${adapter.id}: ${entry.id}/${variant}`).toBeDefined();
        expect(capabilityFor(adapter, entry.id, variant).status).toBe('supported');
      }
    }
  });

  it('hat für alle Pflichtfälle denselben Capability-Status', () => {
    for (const entry of catalog) {
      for (const variant of entry.variants) {
        expect(capabilityFor(muiAdapter, entry.id, variant).status).toBe(
          capabilityFor(mantineAdapter, entry.id, variant).status,
        );
      }
    }
  });

  it.each(['input', 'select'] as const)('nutzt bei Doppel-MUI eindeutige IDs für %s', (component) => {
    const html = renderToStaticMarkup(createElement(Fragment, null,
      createElement(muiAdapter.render, { component, variant: 'error', onAction: () => {} }),
      createElement(muiAdapter.render, { component, variant: 'error', onAction: () => {} }),
    ));
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    expect(ids.length).toBeGreaterThan(1);
    expect(new Set(ids).size).toBe(ids.length);
    for (const match of html.matchAll(/\s(?:aria-describedby|aria-labelledby)="([^"]+)"/g)) {
      for (const reference of match[1]!.split(' ')) expect(ids).toContain(reference);
    }
  });
});
