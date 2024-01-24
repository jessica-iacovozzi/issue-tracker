'use client';

import BackButton from '@/app/components/BackButton';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { projectSchema } from '@/app/validationSchema';
import { Project } from '@prisma/client';
import { Button, Callout, Flex, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { RxInfoCircled } from "react-icons/rx";
import { z } from 'zod';

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectForm = ({ project }: { project?: Project }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      if (project)
        await axios
                .patch('/api/projects/' + project.id, data)
                .then(() => {
                  setTimeout(() => { router.push('/projects/' + project.id); }, 1000);
                  toast.success('Project was edited successfully!');
                })
      else
        await axios
                .post('/api/projects', data)
                .then(() => {
                  toast.success('Project was created successfully!');
                  router.push('/projects/list');
                })
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
    }
  });

  return (
    <>
      <Toaster />
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <RxInfoCircled />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>)}
      <BackButton />
      <Flex align='center' direction='column'>
        <Heading mb='5'>{ project ? 'Edit your project' : 'Create a new project' }</Heading>
        <form onSubmit={onSubmit} id='projectform'>
          <Flex align='center' direction='column'>
            <TextField.Root mb='5'>
              <TextField.Input defaultValue={project?.title} placeholder="Title" {...register('title')} />
            </TextField.Root>
            <ErrorMessage>
              {errors.title?.message}
            </ErrorMessage>
            <Button>
              { project ? 'Save' : 'Create' }{' '}
              {isSubmitting && <Spinner />}
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  )
}

export default ProjectForm
