import BackButton from "@/app/components/BackButton";
import Pagination from "@/app/components/Pagination";
import IssuesTable, { IssueQuery } from "@/app/issues/list/IssuesTable";
import IssuesToolbar from "@/app/issues/list/IssuesToolbar";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from 'next/link';
import { notFound } from "next/navigation";
import { cache } from "react";
import EditProjectButton from "./EditProjectButton";
import DeleteProjectButton from "./DeleteProjectButton";

interface Props {
  params: { id: string },
  searchParams: IssueQuery
}

const fetchProject = cache((projectId: number) => prisma.project.findUnique({ where: { id: projectId }}))

const ProjectIssuesPage = async ({ params, searchParams }: Props) => {
  const project = await fetchProject(parseInt(params.id));
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  if (!project) return notFound();

  const issuesCount = await prisma.issue.count({ where: { status, projectId: project.id }});
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection }
    : undefined;

    const issues = await prisma.issue.findMany({
    where: { status, projectId: project.id },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignee: true,
      project: true
    }
  });

  return (
    <>
      <BackButton />
      <Flex mb='6' justify='between'>
        <Heading>Project: {project.title}</Heading>
        <Flex gap='2'>
          <EditProjectButton projectId={project.id} />
          <DeleteProjectButton projectId={project.id} />
        </Flex>
      </Flex>
      {issues.length ?
        <>
          <IssuesToolbar link={`/projects/${project.id}`} />
          <IssuesTable searchParams={searchParams} issues={issues} />
        </>
        :
        <Button className="w-fit">
          <Link href={'/issues/new?project=' + project.id}>Create your first issue</Link>
        </Button>
      }
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page}/>
    </>
  )
}

const columnNames = ['title', 'status', 'createdAt', 'projectId', 'assigneeId'];

export async function generateMetadata({ params }: Props) {
  const project = await fetchProject(parseInt(params.id));

  return {
    title: 'Project - ' + project?.title,
    description: 'Project - ' + project?.title
  }
}

export default ProjectIssuesPage
