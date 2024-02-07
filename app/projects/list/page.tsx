import authOptions from "@/app/auth/authOptions";
import BackButton from "@/app/components/BackButton";
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Button, Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProjectsTable, { ProjectQuery } from "./ProjectsTable";
import ProjectsToolbar from "./ProjectsToolbar";

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
    orderBy:
      searchParams.orderBy === 'issues' ?
      { issues: { '_count': searchParams.orderDirection } } :
      { 'title': searchParams.orderDirection }
    || undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      _count: {
        select: {
          issues: {
            where: {
              status: searchParams.status
            }
          }
        }
      },
      issues: true
    }
  });

  if (searchParams.orderBy === 'issues') {
    projects.sort((projectA, projectB) => {
      const countA = projectA._count.issues;
      const countB = projectB._count.issues;

      if (searchParams.orderDirection === 'asc') {
        return countA - countB;
      } else {
        return countB - countA;
      }
    })
  }

  return (
    <Flex direction='column'>
      <BackButton />
      {projects.length ?
        <>
          <ProjectsToolbar />
          <ProjectsTable searchParams={searchParams} projects={projects} />
        </>
        :
        <Button className="w-fit">
          <Link href='/projects/new'>Create your first project</Link>
        </Button>
      }
      <Pagination
        itemCount={projectCount}
        pageSize={pageSize}
        currentPage={page} />
    </Flex>
  )
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Project List',
  description: 'View all projects'
};

export default ProjectList
