import authOptions from '@/app/auth/authOptions';
import BackButton from '@/app/components/BackButton';
import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Prisma, Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import IssuesTable, { IssueQuery } from './IssuesTable';
import IssuesToolbar from './IssuesToolbar';

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = {
    status,
    OR: [
      { creator: session?.user },
      { assignee: session?.user }
    ]
  };

  const issuesCount = await prisma.issue.count({ where });
  const orderBy: Prisma.IssueOrderByWithRelationInput = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection }
    : { createdAt: 'desc' };

  const pageSize = 8;
  const page = parseInt(searchParams.page) || 1

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignee: true,
      project: true
    }
  });

  return (
    <Flex direction='column'>
      <BackButton />
      <IssuesToolbar link='/issues/list' />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page} />
    </Flex>
  )
};

const columnNames = ['title', 'status', 'createdAt', 'updatedAt', 'projectId', 'assigneeId'];

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage;
