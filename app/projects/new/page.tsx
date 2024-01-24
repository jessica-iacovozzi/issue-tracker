import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ProjectFormSkeleton from '../_components/ProjectFormSkeleton'

const ProjectForm = dynamic(
  () => import('@/app/projects/_components/ProjectForm'),
  {
    ssr: false,
    loading: () => <ProjectFormSkeleton />
  }
)

const page = () => {
  return (
    <ProjectForm />
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Create a new Project',
  description: 'Create a new project.'
};

export default page
