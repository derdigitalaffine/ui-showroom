import { useId, useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { AdapterDefinition, AdapterProps } from '../../contracts';
import { demoContent, validateEmail, validateRole } from '../../catalog';

function MuiExample({ component, variant, onAction }: AdapterProps) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [roleError, setRoleError] = useState<string | null>(null);
  const [showInitialError, setShowInitialError] = useState(variant === 'error');

  if (component === 'button') {
    return <Button variant="contained" disabled={variant === 'disabled' || variant === 'loading'} onClick={() => onAction(demoContent.button.successMessage)} startIcon={variant === 'loading' ? <CircularProgress size={16} color="inherit" /> : undefined}>{variant === 'loading' ? demoContent.button.loadingLabel : demoContent.button.label}</Button>;
  }
  if (component === 'input') {
    const error = showInitialError ? demoContent.input.errorMessage : emailError;
    return <Box component="form" onSubmit={(event) => { event.preventDefault(); const next = validateEmail(email); setEmailError(next); if (!next) onAction(demoContent.input.successMessage); }} sx={{ display: 'grid', gap: 2, maxWidth: 360 }} noValidate>
      <TextField type="email" label={demoContent.input.label} placeholder={demoContent.input.placeholder} value={email} onChange={(event) => { setEmail(event.target.value); setEmailError(null); setShowInitialError(false); }} disabled={variant === 'disabled'} error={Boolean(error)} helperText={error || ' '} fullWidth />
      <Button type="submit" variant="contained" disabled={variant === 'disabled'}>Prüfen</Button>
    </Box>;
  }
  if (component === 'select') {
    const error = showInitialError ? demoContent.select.requiredMessage : roleError;
    return <Box component="form" onSubmit={(event) => { event.preventDefault(); const next = validateRole(role); setRoleError(next); if (!next) onAction(demoContent.select.successMessage); }} sx={{ display: 'grid', gap: 2, maxWidth: 360 }} noValidate>
      <FormControl fullWidth error={Boolean(error)} disabled={variant === 'disabled'}>
        <InputLabel id={`${id}-role-label`}>{demoContent.select.label}</InputLabel>
        <Select labelId={`${id}-role-label`} label={demoContent.select.label} value={role} onChange={(event) => { setRole(event.target.value); setRoleError(null); setShowInitialError(false); }}>
          <MenuItem value=""><em>{demoContent.select.placeholder}</em></MenuItem>
          {demoContent.select.options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
        </Select>
        <FormHelperText>{error || ' '}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" disabled={variant === 'disabled'}>Auswählen</Button>
    </Box>;
  }
  return <>
    <Button variant="contained" disabled={variant === 'disabled'} onClick={() => setOpen(true)}>{demoContent.dialog.triggerLabel}</Button>
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby={`${id}-dialog-title`} aria-describedby={`${id}-dialog-description`}>
      <DialogTitle id={`${id}-dialog-title`}>{demoContent.dialog.title}</DialogTitle>
      <DialogContent><DialogContentText id={`${id}-dialog-description`}>{demoContent.dialog.description}</DialogContentText></DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{demoContent.dialog.cancelLabel}</Button>
        <Button variant="contained" disabled={variant === 'loading'} onClick={() => { setOpen(false); onAction(demoContent.dialog.successMessage); }}>{variant === 'loading' ? demoContent.dialog.loadingLabel : demoContent.dialog.confirmLabel}</Button>
      </DialogActions>
    </Dialog>
  </>;
}

const supported = { status: 'supported' as const };
export const muiAdapter: AdapterDefinition = {
  id: 'mui', name: 'Material UI', render: MuiExample,
  capabilities: {
    button: { default: supported, disabled: supported, loading: supported },
    input: { default: supported, disabled: supported, error: supported },
    select: { default: supported, disabled: supported, error: supported },
    dialog: { default: supported, disabled: supported, loading: supported },
  },
};
