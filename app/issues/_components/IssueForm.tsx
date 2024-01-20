'use client';

import BackButton from '@/app/components/BackButton';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RxInfoCircled } from "react-icons/rx";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue)
        await axios
                .patch('/api/issues/' + issue.id, data)
                .then(() => {
                  setTimeout(() => {  router.push('/issues/' + issue.id); }, 1000);
                  toast.success('Issue was edited successfully!');
                })
      else
        await axios
                .post('/api/issues', data)
                .then(() => {
                  toast.success('Issue was created successfully!');
                  router.push('/issues/list');
                })
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
      toast.error('An unexpected error occurred.');
    }
  });

  return (
    <div className='max-w-xl'>
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
      <form onSubmit={onSubmit}>
        <TextField.Root className='mb-5'>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({field}) =>
            <SimpleMDE placeholder='Description' {...field} />
          }>
        </Controller>
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button>
          { issue ? 'Edit Issue' : 'Create new issue' }{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
