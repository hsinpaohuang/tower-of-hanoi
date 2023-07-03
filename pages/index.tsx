import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Text, styled } from '@nextui-org/react';
import { TutorialModalHandler } from '@/components/tutorialModal/tutorialModalHandler';
import { TowerOfHanoi } from '@/components/towerOfHanoi/TowerOfHanoi';

const inter = Inter({ subsets: ['latin'] });

const Title = styled(Text, { textAlign: 'center' });

const Main = styled('main', { paddingTop: '$12' });

export default function Home() {
  return (
    <>
      <Head>
        <title>Tower of Hanoi</title>
        <meta name="description" content="Play Tower of Hanoi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main className={inter.className}>
        <Title h1>Tower of Hanoi</Title>
        <TutorialModalHandler />
        <TowerOfHanoi />
      </Main>
    </>
  );
}
