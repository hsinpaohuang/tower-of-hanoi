import { ChangeEvent, useCallback } from 'react';
import { Button, FormElement, Input, styled } from '@nextui-org/react';
import {
  useTowerOfHanoiStore,
  MIN_DISKS,
  MAX_DISKS,
} from '@/stores/towerOfHanoiStore';

const StyledInput = styled(Input, { $space$1: 0, $$inputBorderRadius: 0 });

export function DiskInput() {
  const { diskCount, setDiskCount, isDiskCountInvalid, resetGame } =
    useTowerOfHanoiStore();

  const updateDisks = useCallback(
    (newValue: number) => {
      if (Number.isNaN(newValue)) return;
      setDiskCount(newValue);
      resetGame();
    },
    [setDiskCount, resetGame],
  );

  const isDecreaseDisabled = diskCount <= MIN_DISKS;

  const decreaseDiskCount = useCallback(() => {
    updateDisks(diskCount - 1);
  }, [updateDisks, diskCount]);

  const isIncreaseDisabled = diskCount >= MAX_DISKS;

  const increaseDiskCount = useCallback(() => {
    updateDisks(diskCount + 1);
  }, [updateDisks, diskCount]);

  const setDisks = useCallback(
    (e: ChangeEvent<FormElement>) => {
      updateDisks(Number(e.target.value));
    },
    [updateDisks],
  );

  const inputStatus = isDiskCountInvalid ? 'error' : 'default';

  const helperText = isDiskCountInvalid
    ? `Must be between ${MIN_DISKS} and ${MAX_DISKS}`
    : '';

  return (
    <Button.Group>
      <Button disabled={isDecreaseDisabled} onPress={decreaseDiskCount}>
        -
      </Button>
      <StyledInput
        labelPlaceholder="Disks"
        status={inputStatus}
        helperText={helperText}
        helperColor="error"
        value={String(diskCount)}
        onChange={setDisks}
        required
      />
      <Button disabled={isIncreaseDisabled} onPress={increaseDiskCount}>
        +
      </Button>
    </Button.Group>
  );
}
