import prisma from '@/prisma/client';
import { Container, Text, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import authOptions from './auth/authOptions';
import './globals.css';
import './theme-config.css';
import { HeartIcon } from '@radix-ui/react-icons';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Issue Tracker App',
  description: 'Track your project issues easily. Created by Jessica Iacovozzi',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const projects = await prisma.project.findMany({
    where: { manager: session?.user },
    take: 4,
    orderBy: { id: 'desc' }
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="teal" className='min-h-screen'>
              <Navbar projects={projects} />
              <main className='p-5 pb-20'>
                <Container>
                  {children}
                </Container>
              </main>
              <footer className='flex justify-center border-t py-5 absolute bottom-0 w-full'>
                <Text align='center' size='1'>© 2024 Issue Tracker - Made with <HeartIcon className='inline' color='teal' /> by Jessica Iacovozzi</Text>
              </footer>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
};
