'use client';

import { Avatar, Box, Container, DropdownMenu, Text, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from "react-icons/bs";
import { Skeleton } from './components';

const Navbar = () => {
  return (
    <nav className='flex border-b px-6 space-x-6 items-center mb-6 h-14'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='4'>
            <Link href='/'><BsBugFill /></Link>
            <NavLinks />
          </Flex>
          <AuthLinks />
        </Flex>
      </Container>
    </nav>
  )
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' }
  ];

  return (
    <ul className='flex space-x-4'>
      {links.map(link =>
        <li key={link.label}>
        <Link href={link.href}
              className={classnames({
                'text-gray-500': currentPath !== link.href,
                'text-gray-950': currentPath === link.href,
                'hover:text-gray-800 transition-colors': true
              })}>{link.label}</Link></li>)}
    </ul>
  )
};

const AuthLinks = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width='3rem'></Skeleton>
  if (status === 'unauthenticated') return <Link href='/api/auth/signin'>Login</Link>
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );};

export default Navbar;
