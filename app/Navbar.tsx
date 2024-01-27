'use client';

import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsBugFill } from "react-icons/bs";
import { Skeleton } from './components';
import { usePathname } from 'next/navigation';
import { Project } from '@prisma/client';
import classnames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';

const Navbar = ({ projects }: { projects: Project[]}) => {
  return (
    <nav className='flex border-b px-6 space-x-6 items-center mb-6 h-14'>
      <Container>
        <Flex align='center' justify='between' gap='5'>
          <Link href='/' className='w-1/5'>
            <Flex align='center' gap='2'>
              <BsBugFill color='var(--accent-10)' />
              <Text className='hidden sm:block'>ISSUE TRACꓘER</Text>
            </Flex>
          </Link>
          <NavLinks projects={projects} />
          <AuthLinks />
        </Flex>
      </Container>
    </nav>
  )
};

const NavLinks = ({ projects }: { projects: Project[]}) => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues/list' }
  ];

  return (
    <ul className='flex items-center'>
      {links.map(link =>
        <li key={link.label}>
          <Link href={link.href}
                className={classnames({
                  '!text-gray-950': currentPath === link.href,
                  'nav-link': true
                })}>
            {link.label}
          </Link>
        </li>
      )}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant='ghost' size='3' color='gray'>
            Projects
            <CaretDownIcon width="16" height="16" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {projects.map(project => (
            <DropdownMenu.Item>
              <Link href={`/projects/${project.id}`}>
                {project.title}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </ul>
  )
};

const AuthLinks = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Flex justify='end' className='w-1/5'><Skeleton width='3rem'></Skeleton></Flex>
  if (status === 'unauthenticated') return <Link className="nav-link w-1/5 flex justify-end" href='/api/auth/signin'>Login</Link>
  return (
    <Box className='w-1/5 flex justify-end'>
      <Link className='hidden md:block me-10' href={'/projects/new'}>
        <Button variant='soft'>
          Create project
        </Button>
      </Link>
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
          <Link className="nav-link" href="/api/auth/signout">
            <DropdownMenu.Item>Log out</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
