import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Row, Text, styled } from '@nextui-org/react';
import { IoHelpCircleOutline } from 'react-icons/io5';

const StyledRow = styled(Row, {
  gap: '$3',
  cursor: 'pointer',
  width: 'auto !important',
});

const StyledHelpIcon = styled(IoHelpCircleOutline, {
  height: '100%',
  verticalAlign: 'middle',
});

export function TutorialModalHandler() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const Modal = useMemo(
    () =>
      dynamic(
        () =>
          import('@/components/tutorialModal/tutorialModal').then(component => {
            setIsLoaded(true);
            return component.TutorialModal;
          }),
        { ssr: false },
      ),
    [],
  );

  const openTutorialModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeTutorialModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <>
      <Row justify="center">
        <StyledRow justify="center" align="center" onClick={openTutorialModal}>
          <Text>How to play</Text>
          <StyledHelpIcon />
        </StyledRow>
      </Row>
      {isLoaded || isOpen ? (
        <Modal isOpen={isOpen} closeModal={closeTutorialModal} />
      ) : null}
    </>
  );
}
