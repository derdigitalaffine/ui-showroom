import type { ComponentId, VariantId } from '../contracts';

export type CatalogCase = {
  id: ComponentId;
  title: string;
  category: 'Aktion' | 'Formular' | 'Overlay';
  description: string;
  variants: readonly VariantId[];
};

export const catalog: readonly CatalogCase[] = [
  {
    id: 'button',
    title: 'Button',
    category: 'Aktion',
    description: 'Eine eindeutige Aktion mit Normal-, Sperr- und Ladezustand.',
    variants: ['default', 'disabled', 'loading'],
  },
  {
    id: 'input',
    title: 'Textfeld',
    category: 'Formular',
    description: 'Eingabe einer E-Mail-Adresse mit derselben Validierung.',
    variants: ['default', 'disabled', 'error'],
  },
  {
    id: 'select',
    title: 'Select',
    category: 'Formular',
    description: 'Auswahl aus denselben festen Optionen.',
    variants: ['default', 'disabled', 'error'],
  },
  {
    id: 'dialog',
    title: 'Dialog',
    category: 'Overlay',
    description: 'Bestätigung mit Escape, Fokusführung und Rückgabe des Fokus.',
    variants: ['default', 'disabled', 'loading'],
  },
];

export const demoContent = {
  button: {
    label: 'Änderung speichern',
    loadingLabel: 'Wird gespeichert …',
    successMessage: 'Änderung gespeichert.',
  },
  input: {
    label: 'E-Mail-Adresse',
    placeholder: 'name@beispiel.de',
    requiredMessage: 'Bitte eine E-Mail-Adresse eingeben.',
    errorMessage: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    successMessage: 'E-Mail-Adresse geprüft.',
  },
  select: {
    label: 'Teamrolle',
    placeholder: 'Rolle auswählen',
    options: [
      { value: 'design', label: 'Design' },
      { value: 'development', label: 'Entwicklung' },
      { value: 'research', label: 'Research' },
    ],
    requiredMessage: 'Bitte eine Teamrolle auswählen.',
    successMessage: 'Teamrolle ausgewählt.',
  },
  dialog: {
    triggerLabel: 'Dialog öffnen',
    title: 'Änderung bestätigen',
    description: 'Möchtest du die Änderung übernehmen?',
    confirmLabel: 'Übernehmen',
    cancelLabel: 'Abbrechen',
    loadingLabel: 'Wird übernommen …',
    successMessage: 'Änderung übernommen.',
  },
} as const;

export function getCase(id: string): CatalogCase | undefined {
  return catalog.find((entry) => entry.id === id);
}

export function isValidVariant(entry: CatalogCase, variant: string): variant is VariantId {
  return entry.variants.includes(variant as VariantId);
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return demoContent.input.requiredMessage;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    ? null
    : demoContent.input.errorMessage;
}

export function validateRole(value: string): string | null {
  return demoContent.select.options.some((option) => option.value === value)
    ? null
    : demoContent.select.requiredMessage;
}
