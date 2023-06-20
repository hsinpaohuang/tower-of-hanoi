import { Navbar, styled, Text } from '@nextui-org/react';
import { DarkModeToggle } from '@/components/defaultLayout/DarkModeToggle';

const Title = styled(Text, {
  textGradient: '45deg, $blue600 -20%, $pink600 50%',
});

const Right = styled(Navbar.Content, { marginLeft: 'auto' });

export function DefaultNavbar() {
  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Title h3>Tower of Hanoi</Title>
      </Navbar.Brand>
      <Right>
        <DarkModeToggle />
      </Right>
    </Navbar>
  );
}
