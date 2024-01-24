import prisma from '@/prisma/client';
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import ProjectFormSkeleton from "../../_components/ProjectFormSkeleton";
import { Metadata } from 'next';

const ProjectForm = dynamic(
  () => import('@/app/projects/_components/ProjectForm'),
  {
    ssr: false,
    loading: () => <ProjectFormSkeleton />
  }
)

const ProjectEditPage = async ({ params }: { params: { id: string }}) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!project) notFound();

  return (
    <ProjectForm project={project} />
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Edit project',
  description: 'Edit the project details.'
};

export default ProjectEditPage
