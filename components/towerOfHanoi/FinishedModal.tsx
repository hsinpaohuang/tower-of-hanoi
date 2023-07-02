import { Button, Modal, Text, styled } from '@nextui-org/react';
import { isFinished, useTowerOfHanoiStore } from '@/stores/towerOfHanoiStore';

const ModalBody = styled(Modal.Body, { alignItems: 'center' });

export function FinishedModal() {
  const { moves, resetGame } = useTowerOfHanoiStore();
  const isGameFinished = useTowerOfHanoiStore(isFinished);

  return (
    <Modal open={isGameFinished}>
      <Modal.Header>
        <Text h2>Congratulations!</Text>
      </Modal.Header>
      <ModalBody>
        <Text>You finished the game in {moves} moves</Text>
      </ModalBody>
      <Modal.Footer justify="center">
        <Button onPress={resetGame}>Play Again</Button>
      </Modal.Footer>
    </Modal>
  );
}
