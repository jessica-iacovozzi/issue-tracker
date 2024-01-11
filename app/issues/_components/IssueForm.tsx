'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RxInfoCircled } from "react-icons/rx";
import { z } from 'zod';

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
);

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
        await axios.patch('/api/issues/' + issue.id, data)
      else
        await axios.post('/api/issues', data);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <RxInfoCircled />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>)}
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
