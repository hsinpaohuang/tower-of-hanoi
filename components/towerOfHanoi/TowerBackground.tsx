import { Col, Container, styled } from '@nextui-org/react';

const BACKGROUND_COLOR = '#4895EF';

const Wrapper = styled(Container, {
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '5% 0 0 !important',
});

const Tower = styled(Col, {
  backgroundColor: BACKGROUND_COLOR,
  width: '5% !important',
  flex: '1',
  borderRadius: '3px',
});

const Base = styled(Col, {
  backgroundColor: BACKGROUND_COLOR,
  height: '20px',
  width: '100%',
  borderRadius: '3px',
});

export function TowerBackground() {
  return (
    <Wrapper
      display="flex"
      alignItems="center"
      direction="column"
      className="bg-wrapper"
    >
      <Tower className="bg-tower" />
      <Base className="bg-base" />
    </Wrapper>
  );
}
