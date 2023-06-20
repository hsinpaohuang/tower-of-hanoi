import type { ReactNode } from 'react';
import { DefaultNavbar } from '@/components/defaultLayout/Navbar';
import { Container } from '@nextui-org/react';

type Props = { children: ReactNode };

export function DefaultLayout({ children }: Props) {
  return (
    <div>
      <DefaultNavbar />
      <Container>{children}</Container>
    </div>
  );
}
