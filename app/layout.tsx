import { Theme, Container } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Created by Jessica Iacovozzi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="teal">
          <Navbar />
          <main className='p-5'>
            <Container>
              {children}
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  )
};
