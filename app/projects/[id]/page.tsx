import { cache } from "react";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import BackButton from "@/app/components/BackButton";
import { Grid, Box, Flex, Heading, Table } from "@radix-ui/themes";
import EditProjectButton from "./EditProjectButton";
import DeleteProjectButton from "./DeleteProjectButton";
import { notFound } from "next/navigation";
import IssuesToolbar from "@/app/issues/list/IssuesToolbar";
import Pagination from "@/app/components/Pagination";
import { Status } from "@prisma/client";
import IssuesTable, { IssueQuery } from "@/app/issues/list/IssuesTable";

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

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='max-w-3xl sm:col-span-4'>
        <BackButton />
        <Heading size='7' mb='5'>{project.title}</Heading>
        <IssuesToolbar link={`/projects/${project.id}`} />
        <IssuesTable searchParams={searchParams} issues={issues} />
        <Pagination
          itemCount={issuesCount}
          pageSize={pageSize}
          currentPage={page}/>
      </Box>
      {session &&
        <Box>
          <Flex direction='column' gap='4'>
            <EditProjectButton projectId={project.id} />
            <DeleteProjectButton projectId={project.id} />
          </Flex>
        </Box>
      }
    </Grid>
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
