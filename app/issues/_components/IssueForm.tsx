'use client';

import BackButton from '@/app/components/BackButton';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { Issue, Project } from '@prisma/client';
import { Button, Callout, Flex, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { RxInfoCircled } from "react-icons/rx";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
  projects: Project[];
  stringProjectId?: string
}

const IssueForm = ({ issue, projects, stringProjectId }: Props) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>();
  const project = parseInt(stringProjectId || '');
  const [projectId, setProjectId] = useState<number>(project);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      data.projectId = projectId;

      if (issue)
        await axios
                .patch('/api/issues/' + issue.id, data)
                .then(() => {
                  setTimeout(() => { router.push('/issues/' + issue.id); }, 1000);
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
      <form onSubmit={onSubmit} id='issueform'>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>
          {errors?.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({field}) =>
            <SimpleMDE className='mt-5' placeholder='Description' {...field} />
          }>
        </Controller>
        <ErrorMessage>
          {errors?.description?.message}
        </ErrorMessage>
        <Flex justify='between' mt='5'>
          <Flex direction='column'>
            <Select.Root
              {...register('projectId')}
              onValueChange={(value) => setProjectId(parseInt(value))}
              defaultValue={issue?.projectId.toString() || stringProjectId}>
              <Select.Trigger placeholder='Select a project' />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Projects</Select.Label>
                  {projects.map(project => <Select.Item key={project.id} value={project.id.toString()}>{project.title}</Select.Item>)}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <ErrorMessage>
              {errors?.projectId?.message}
            </ErrorMessage>
          </Flex>
          <Button>
            { issue ? 'Edit Issue' : 'Create new issue' }{' '}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  )
}

export default IssueForm
