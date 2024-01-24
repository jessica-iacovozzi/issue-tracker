import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../_components/IssueFormSkeleton';
import { Metadata } from 'next';
import prisma from '@/prisma/client';
import { ProjectQuery } from '@/app/projects/list/ProjectsTable';

interface Props {
  searchParams: ProjectQuery
}

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssuePage = async ({ searchParams }: Props) => {
  const projects = await prisma.project.findMany();

  return (
    <IssueForm projects={projects} stringProjectId={searchParams.project} />
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Create a new Issue',
  description: 'Create a new issue.'
};

export default NewIssuePage;
