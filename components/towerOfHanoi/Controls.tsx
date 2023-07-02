import { Button, Row, Text, styled } from '@nextui-org/react';
import { DiskInput } from '@/components/towerOfHanoi/DiskInput';
import { useTowerOfHanoiStore } from '@/stores/towerOfHanoiStore';

const ControlsContainer = styled(Row, { py: '$12', gap: '$10' });

export function Controls() {
  const { moves, resetGame } = useTowerOfHanoiStore();

  return (
    <ControlsContainer justify="center" align="center" wrap="wrap">
      <DiskInput />
      <Text>Moves: {moves}</Text>
      <Button onClick={resetGame}>Restart</Button>
    </ControlsContainer>
  );
}
