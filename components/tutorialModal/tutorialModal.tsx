import { Modal, Text, Button } from '@nextui-org/react';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export function TutorialModal({ isOpen, closeModal }: Props) {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Modal.Header>
        <Text h2>How To Play?</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>
          The goal of this game is to move all of the disks from the left tower
          to the right.
        </Text>
        <Text>You can only stack a smaller disk on top of a larger one.</Text>
      </Modal.Body>
      <Modal.Footer justify="center">
        <Button onPress={closeModal}>Got it</Button>
      </Modal.Footer>
    </Modal>
  );
}
