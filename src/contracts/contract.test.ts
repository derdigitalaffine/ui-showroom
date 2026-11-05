import { describe, expect, it } from 'vitest';
import { catalog, demoContent, getCase, isValidVariant, validateEmail, validateRole } from '../catalog';
import { capabilityFor, componentIds, type AdapterDefinition } from './index';
import { muiAdapter } from '../adapters/mui';
import { mantineAdapter } from '../adapters/mantine';

describe('kanonischer Katalog', () => {
  it('enthält jeden Pflichtfall genau einmal und nur sinnvolle Varianten', () => {
    expect(catalog.map((entry) => entry.id)).toEqual(componentIds);
    expect(new Set(catalog.map((entry) => entry.id)).size).toBe(componentIds.length);
    for (const entry of catalog) {
      expect(entry.variants).toContain('default');
      expect(entry.variants.length).toBeGreaterThan(1);
      expect(getCase(entry.id)).toBe(entry);
      expect(isValidVariant(entry, 'unbekannt')).toBe(false);
    }
    expect(getCase('unbekannt')).toBeUndefined();
  });

  it('teilt feste Vergleichsdaten zwischen Adaptern', () => {
    expect(demoContent.select.options.map((option) => option.value)).toEqual([
      'design', 'development', 'research',
    ]);
    expect(demoContent.input.errorMessage).toBeTruthy();
    expect(demoContent.dialog.title).toBeTruthy();
  });

  it('wendet dieselbe Validierung für beide Bibliotheken an', () => {
    expect(validateEmail('')).toBe(demoContent.input.requiredMessage);
    expect(validateEmail('ungültig')).toBe(demoContent.input.errorMessage);
    expect(validateEmail('team@beispiel.de')).toBeNull();
    expect(validateRole('')).toBe(demoContent.select.requiredMessage);
    expect(validateRole('design')).toBeNull();
    expect(validateRole('fremd')).toBe(demoContent.select.requiredMessage);
  });
});

describe('Adapter-Capabilities', () => {
  it('zeigt fehlende Varianten explizit als nicht unterstützt', () => {
    const adapter: AdapterDefinition = {
      id: 'test',
      name: 'Test',
      render: () => null,
      capabilities: {
        button: { default: { status: 'supported' } },
        input: {},
        select: {},
        dialog: {},
      },
    };
    expect(capabilityFor(adapter, 'button', 'default')).toEqual({ status: 'supported' });
    expect(capabilityFor(adapter, 'button', 'loading')).toMatchObject({ status: 'unsupported' });
  });

  it('meldet für beide Live-Adapter jeden kanonischen Zustand explizit', () => {
    for (const adapter of [muiAdapter, mantineAdapter]) {
      for (const entry of catalog) {
        for (const variant of entry.variants) {
          expect(adapter.capabilities[entry.id][variant], `${adapter.id}: ${entry.id}/${variant}`).toBeDefined();
          expect(capabilityFor(adapter, entry.id, variant).status).toBe('supported');
        }
      }
    }
  });
});
