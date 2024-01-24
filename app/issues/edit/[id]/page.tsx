import prisma from '@/prisma/client';
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";
import { Metadata } from 'next';

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const IssueEditPage = async ({ params }: { params: { id: string }}) => {
  const projects = await prisma.project.findMany();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) notFound();

  return (
    <IssueForm issue={issue} projects={projects} />
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Edit Issue',
  description: 'Edit the issue details.'
};

export default IssueEditPage
