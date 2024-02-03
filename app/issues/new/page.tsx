import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../_components/IssueFormSkeleton';
import { Metadata } from 'next';
import prisma from '@/prisma/client';
import { ProjectQuery } from '@/app/projects/list/ProjectsTable';
import { getServerSession } from 'next-auth';

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
  const session = await getServerSession();
  const projects = await prisma.project.findMany({ where: { manager: session?.user }});

  return (
    <IssueForm projects={projects} stringProjectId={searchParams.project} />
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Create a new Issue',
  description: 'Create a new issue.'
};

export default NewIssuePage;
