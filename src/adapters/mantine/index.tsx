import { useState } from 'react';
import { Button, Group, MantineProvider, Modal, Select, Stack, TextInput } from '@mantine/core';
import type { AdapterDefinition, AdapterProps } from '../../contracts';
import { demoContent, validateEmail, validateRole } from '../../catalog';

function MantineExample({ component, variant, onAction }: AdapterProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [showInitialError, setShowInitialError] = useState(variant === 'error');

  if (component === 'button') return <Button disabled={variant === 'disabled'} loading={variant === 'loading'} onClick={() => onAction(demoContent.button.successMessage)}>{variant === 'loading' ? demoContent.button.loadingLabel : demoContent.button.label}</Button>;
  if (component === 'input') return <form onSubmit={(event) => { event.preventDefault(); const next = validateEmail(email); setEmailError(next); if (!next) onAction(demoContent.input.successMessage); }} noValidate>
    <Stack maw={360}>
      <TextInput type="email" label={demoContent.input.label} placeholder={demoContent.input.placeholder} value={email} onChange={(event) => { setEmail(event.target.value); setEmailError(null); setShowInitialError(false); }} disabled={variant === 'disabled'} error={showInitialError ? demoContent.input.errorMessage : emailError} />
      <Button type="submit" disabled={variant === 'disabled'}>Prüfen</Button>
    </Stack>
  </form>;
  if (component === 'select') return <form onSubmit={(event) => { event.preventDefault(); const next = validateRole(role ?? ''); setRoleError(next); if (!next) onAction(demoContent.select.successMessage); }} noValidate>
    <Stack maw={360}>
      <Select label={demoContent.select.label} placeholder={demoContent.select.placeholder} data={demoContent.select.options} value={role} onChange={(next) => { setRole(next); setRoleError(null); setShowInitialError(false); }} disabled={variant === 'disabled'} error={showInitialError ? demoContent.select.requiredMessage : roleError} clearable />
      <Button type="submit" disabled={variant === 'disabled'}>Auswählen</Button>
    </Stack>
  </form>;
  return <>
    <Button disabled={variant === 'disabled'} onClick={() => setOpen(true)}>{demoContent.dialog.triggerLabel}</Button>
    <Modal opened={open} onClose={() => setOpen(false)} title={demoContent.dialog.title} centered>
      <Stack>
        <p>{demoContent.dialog.description}</p>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setOpen(false)}>{demoContent.dialog.cancelLabel}</Button>
          <Button loading={variant === 'loading'} onClick={() => { setOpen(false); onAction(demoContent.dialog.successMessage); }}>{variant === 'loading' ? demoContent.dialog.loadingLabel : demoContent.dialog.confirmLabel}</Button>
        </Group>
      </Stack>
    </Modal>
  </>;
}

const supported = { status: 'supported' as const };
function MantineAdapter(props: AdapterProps) {
  return <MantineProvider><MantineExample {...props} /></MantineProvider>;
}

export const mantineAdapter: AdapterDefinition = {
  id: 'mantine', name: 'Mantine', render: MantineAdapter,
  capabilities: {
    button: { default: supported, disabled: supported, loading: supported },
    input: { default: supported, disabled: supported, error: supported },
    select: { default: supported, disabled: supported, error: supported },
    dialog: { default: supported, disabled: supported, loading: supported },
  },
};
