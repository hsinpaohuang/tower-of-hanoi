import type { ChangeEvent } from 'react';
import { Button, FormElement, Input, styled } from '@nextui-org/react';
import {
  useTowerOfHanoiStore,
  MIN_DISKS,
  MAX_DISKS,
} from '@/stores/towerOfHanoiStore';

const StyledInput = styled(Input, { $space$1: 0, $$inputBorderRadius: 0 });

export function DiskInput() {
  const { disks, setDisks, isDisksInvalid } = useTowerOfHanoiStore();

  const changeDisks = (e: ChangeEvent<FormElement>) => {
    const numberValue = Number(e.target.value);
    if (Number.isNaN(numberValue)) return;
    setDisks(numberValue);
  };

  const inputStatus = isDisksInvalid ? 'error' : 'default';

  const helperText = isDisksInvalid
    ? `Must be between ${MIN_DISKS} and ${MAX_DISKS}`
    : '';

  return (
    <Button.Group>
      <Button onPress={() => setDisks(disks - 1)}>-</Button>
      <StyledInput
        labelPlaceholder="Disks"
        status={inputStatus}
        helperText={helperText}
        helperColor="error"
        value={String(disks)}
        onChange={changeDisks}
        required
      />
      <Button onPress={() => setDisks(disks + 1)}>+</Button>
    </Button.Group>
  );
}
