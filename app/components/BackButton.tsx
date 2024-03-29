'use client';

import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant='ghost' color='gray' ml='2' mb='5' className='w-fit initial:!hidden xs:!inline-flex'>
      <ArrowLeftIcon />
      Back
    </Button>
  )
}

export default BackButton
