import Link from 'next/link';
import React from 'react';
import { BsBugFill } from "react-icons/bs";

const Navbar = () => {
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
                className=''>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default Navbar
