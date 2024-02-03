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
import { getServerSession } from 'next-auth';
import authOptions from './auth/authOptions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Track your project issues easily. Created by Jessica Iacovozzi',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const projects = await prisma.project.findMany({ where: { manager: session?.user } });

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
