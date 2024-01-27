import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import '@radix-ui/themes/styles.css';
import './globals.css';
import './theme-config.css';
import prisma from '@/prisma/client';
import { Container, Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Track your project issues easily. Created by Jessica Iacovozzi',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const projects = await prisma.project.findMany();

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="teal">
              <Navbar projects={projects} />
              <main className='p-5'>
                <Container>
                  {children}
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
};
