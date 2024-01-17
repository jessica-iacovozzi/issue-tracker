import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import IssuesTable, { IssueQuery, columnNames } from './IssuesTable';
import IssuesToolbar from './IssuesToolbar';


interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const issuesCount = await prisma.issue.count({ where: { status }});
  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  return (
    <>
      <IssuesToolbar />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page} />
    </>
  )
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
