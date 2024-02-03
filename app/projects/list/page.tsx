import Pagination from "@/app/components/Pagination";
import { Metadata } from "next";
import ProjectsTable, { ProjectQuery } from "./ProjectsTable";
import prisma from "@/prisma/client";
import ProjectsToolbar from "./ProjectsToolbar";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

interface Props {
  searchParams: ProjectQuery
}

const ProjectList = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  const projectCount = await prisma.project.count({ where: { manager: session?.user }});
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const projects = await prisma.project.findMany({
    where: { manager: session?.user },
    orderBy: searchParams.orderBy === 'title' ? { title: searchParams.orderDirection } : undefined,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  return (
    <>
      <ProjectsToolbar />
      <ProjectsTable searchParams={searchParams} projects={projects} />
      <Pagination
        itemCount={projectCount}
        pageSize={pageSize}
        currentPage={page} />
    </>
  )
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Project List',
  description: 'View all projects'
};

export default ProjectList
