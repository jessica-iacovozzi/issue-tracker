import { IssueStatusBadge } from '@/app/components'
import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    page: string,
    orderDirection: 'asc' | 'desc'
  }
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
];


const IssuesTable = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columns.map(column => column.value)
                         .includes(searchParams.orderBy)
                         ? { [searchParams.orderBy]: 'asc' }
                         : undefined;

  const issuesCount = await prisma.issue.count({ where: { status }});
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
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className} width='33%'>
                <Link href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>{column.label}</Link>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline align-text-bottom ms-1' />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell width='33%'>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell width='33%' className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell width='33%' className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page} />
    </>
  )
}

export default IssuesTable
