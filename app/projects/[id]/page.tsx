import BackButton from "@/app/components/BackButton";
import Pagination from "@/app/components/Pagination";
import IssuesTable, { IssueQuery } from "@/app/issues/list/IssuesTable";
import IssuesToolbar from "@/app/issues/list/IssuesToolbar";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectButton from "./EditProjectButton";

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
  const pageSize = 7;
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
        <Heading mr='2'>Project: {project.title}</Heading>
        <Flex gap='3' className="initial:mb-6 xs:m-0 initial:!justify-between">
          <EditProjectButton projectId={project.id} />
          <DeleteProjectButton projectId={project.id} />
        </Flex>
      </Flex>
      <IssuesToolbar link={`/projects/${project.id}`} />
      <IssuesTable searchParams={searchParams} issues={issues} />
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
