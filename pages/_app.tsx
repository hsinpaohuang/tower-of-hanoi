import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { DefaultLayout } from '@/components/defaultLayout/DefaultLayout';

const lightTheme = createTheme({ type: 'light' });

const darkTheme = createTheme({ type: 'dark' });

function Root({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{ light: lightTheme.className, dark: darkTheme.className }}
    >
      <NextUIProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default Root;
