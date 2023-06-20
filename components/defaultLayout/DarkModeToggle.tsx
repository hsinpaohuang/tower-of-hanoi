import { useTheme as useNextTheme } from 'next-themes';
import { useTheme, SwitchEvent, Switch, Row, styled } from '@nextui-org/react';
import { IoSunny, IoMoon } from 'react-icons/io5';

const Container = styled(Row, { gap: '8px' });

export function DarkModeToggle() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const toggleDarkMode = (e: SwitchEvent) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  return (
    <Container align="center">
      <IoSunny />
      <Switch checked={isDark} onChange={toggleDarkMode} />
      <IoMoon />
    </Container>
  );
}
