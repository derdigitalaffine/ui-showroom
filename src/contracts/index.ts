import type { ComponentType } from 'react';

export const componentIds = ['button', 'input', 'select', 'dialog'] as const;
export type ComponentId = (typeof componentIds)[number];

export const variantIds = ['default', 'disabled', 'error', 'loading'] as const;
export type VariantId = (typeof variantIds)[number];

export type CapabilityStatus = 'supported' | 'partial' | 'unsupported';
export type Capability = { status: CapabilityStatus; reason?: string };

export type AdapterProps = {
  component: ComponentId;
  variant: VariantId;
  onAction: (message: string) => void;
};

export type AdapterDefinition = {
  id: string;
  name: string;
  render: ComponentType<AdapterProps>;
  capabilities: Record<ComponentId, Partial<Record<VariantId, Capability>>>;
};

export function capabilityFor(adapter: AdapterDefinition, component: ComponentId, variant: VariantId): Capability {
  return adapter.capabilities[component][variant] ?? {
    status: 'unsupported',
    reason: 'Diese Variante ist für die Bibliothek nicht verfügbar.',
  };
}
