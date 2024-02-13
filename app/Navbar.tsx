'use client';

import { Project } from '@prisma/client';
import { CaretDownIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from "react-icons/bs";
import { Skeleton } from './components';

const Navbar = ({ projects }: { projects?: Project[]}) => {
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

const NavLinks = ({ projects }: { projects?: Project[]}) => {
  const currentPath = usePathname();
  const links = [
    { label: 'My issues', href: '/issues/list' }
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
      <DropdownMenu.Root key={currentPath}>
        <DropdownMenu.Trigger>
          <Button variant='ghost' size='3' color='gray'>
            My projects
            <CaretDownIcon width="16" height="16" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {projects?.map(project => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <DropdownMenu.Item className='!cursor-pointer'>
                {project.title}
              </DropdownMenu.Item>
            </Link>
          ))}
          {projects?.length && <DropdownMenu.Separator />}
          <Link href='/projects/list'>
            <DropdownMenu.Item className='!cursor-pointer'>
              See all projects
            </DropdownMenu.Item>
          </Link>
          <Link href='/projects/new'>
            <DropdownMenu.Item className='flex items-center gap-1 !cursor-pointer'>
              <PlusCircledIcon />
              Create new project
            </DropdownMenu.Item>
          </Link>
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
          <Link href="/api/auth/signout">
            <DropdownMenu.Item className='!cursor-pointer'>Log out</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
