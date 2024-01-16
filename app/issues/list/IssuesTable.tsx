import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
  searchParams: {
    status: Status, orderBy: keyof Issue, orderDirection: 'asc' | 'desc' }
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
];


const IssuesTable = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: {
      [searchParams.orderBy]: 'asc'
    }
  });

  return (
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
  )
}

export default IssuesTable
