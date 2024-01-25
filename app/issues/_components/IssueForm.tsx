'use client';

import BackButton from '@/app/components/BackButton';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { Issue, Project } from '@prisma/client';
import { AspectRatio, Button, Callout, Flex, Grid, IconButton, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { RxInfoCircled } from "react-icons/rx";
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import { Cross1Icon } from '@radix-ui/react-icons';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
  projects: Project[];
  stringProjectId?: string
}

interface CloudinaryResult {
  public_id: string
}

const IssueForm = ({ issue, projects, stringProjectId }: Props) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>();
  const project = parseInt(stringProjectId || '');
  const [projectId, setProjectId] = useState<number>(project);
  const [imageIds, setImageIds] = useState<string[]>(issue?.images || []);
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const removeImage = (idToRemove: string) => {
    setImageIds(imageIds.filter(id => id !== idToRemove));
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      data.projectId = projectId;
      data.images = imageIds;

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
        <Grid columns='2' gap='5' mt='5'>
          {imageIds && imageIds.map((id) => (
            <div className='relative' key={id}>
              <IconButton type='button' onClick={() => removeImage(id)} color='red' radius='full' className='z-10 absolute -right-3 -top-3'>
                <Cross1Icon />
              </IconButton>
              <AspectRatio ratio={4/3}>
                <CldImage className='rounded-lg' src={id} fill alt={id} />
              </AspectRatio>
            </div>
          ))}
        </Grid>
        <Flex justify='between' mt='5'>
          <Flex gap='4'>
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
            <CldUploadWidget
              uploadPreset="ydriuq72"
              onUpload={(result) => {
                if (result.event !== 'success') return;
                const info = result.info as CloudinaryResult;
                setImageIds([...imageIds, info.public_id])
              }}>
              {({ open }) => {
                return (
                  <Button type='button' variant='surface' onClick={() => open()}>
                    Upload images
                  </Button>
                );
              }}
            </CldUploadWidget>
          </Flex>
          <Button type='submit'>
            { issue ? 'Edit Issue' : 'Create new issue' }{' '}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  )
}

export default IssueForm
