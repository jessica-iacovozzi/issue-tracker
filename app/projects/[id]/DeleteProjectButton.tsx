'use client';

import { Spinner } from '@/app/components';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const DeleteProjectButton = ({projectId}: {projectId: number}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteProject = async () => {
    try {
      setDeleting(true);
      await axios
              .delete('/api/projects/' + projectId)
              .then(() => {
                toast.success('Project was deleted successfully.');
                setTimeout(() => {
                  router.push('/projects/list');
                  router.refresh();
                }, 1000);
              })
    } catch (error) {
      setError(true);
      setDeleting(false);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color='red' className='gap-2'>
            <TrashIcon className='xs:hidden' />
            <span className='hidden xs:block'>Delete project</span>
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this project? This action cannot be undone.
          </AlertDialog.Description>
          <Flex mt='5' gap='3'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button onClick={deleteProject} color='red'>Delete project</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This project could not be deleted.</AlertDialog.Description>
          <Button color='gray' variant='soft' mt='4' onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <Toaster />
    </>
  )
}

export default DeleteProjectButton
