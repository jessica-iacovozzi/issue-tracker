'use client';

import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBugFill } from "react-icons/bs";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' }
  ]

  return (
    <nav className='flex border-b px-6 space-x-6 items-center mb-6 h-14'>
      <Link href='/'><BsBugFill /></Link>
      <ul className='space-x-4'>
        {links.map(link =>
          <Link key={link.label}
                href={link.href}
                className={classnames({
                  'text-gray-500': currentPath !== link.href,
                  'text-gray-950': currentPath === link.href,
                  'hover:text-gray-800 transition-colors': true
                })}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default Navbar
