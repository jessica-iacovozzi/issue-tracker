import prisma from '@/prisma/client';
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { Metadata } from 'next';
import { ProjectQuery } from '@/app/projects/list/ProjectsTable';

interface Props {
  searchParams: ProjectQuery;
  params: { id: string }
}

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const IssueEditPage = async ({ searchParams, params }: Props) => {
  const projects = await prisma.project.findMany();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) notFound();

  return (
    <IssueForm issue={issue} projects={projects} stringProjectId={searchParams.project} />
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Edit Issue',
  description: 'Edit the issue details.'
};

export default IssueEditPage
