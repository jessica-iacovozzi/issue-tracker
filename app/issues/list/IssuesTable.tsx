'use client';

import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Avatar, Table, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export interface IssueQuery {
  status: Status,
  orderBy: keyof Issue,
  page: string,
  orderDirection: 'asc' | 'desc'
}

interface Assignee {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  hashedPassword: string | null;
  image: string | null;
}

interface Project {
  title: string
}

interface Props {
  searchParams: IssueQuery;
  issues: ({ assignee: Assignee | null } & { project: Project } & Issue)[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  const pathname = usePathname();
  const isIssuesListPage = pathname === '/issues/list';

  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            (isIssuesListPage || column.value !== 'projectId') && (
            <Table.ColumnHeaderCell key={column.value} className={column.className} align={column.value === 'assigneeId' ? 'center' : 'left'}>
              <Link href={{
                query: { ...searchParams, orderBy: column.value, orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc' }
              }}>
                {column.label}
              </Link>
              {column.value === searchParams.orderBy && (
                <>
                  {searchParams.orderDirection === 'asc' ? (
                    <ArrowUpIcon className='inline align-text-bottom ms-1' />
                  ) : (
                    <ArrowDownIcon className='inline align-text-bottom ms-1' />
                  )}
                </>
              )}
            </Table.ColumnHeaderCell>
            )
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id} className='justify-between'>
            <Table.Cell width='35%'>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className='block sm:hidden'>
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell width='15%' className='hidden sm:table-cell'>
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell width='20%' className='hidden sm:table-cell'>
              {issue.createdAt.toDateString()}
            </Table.Cell>
            {issue.projectId && isIssuesListPage && (
              <Table.Cell width='20%'>
                <Text>{issue.project.title}</Text>
              </Table.Cell>
            )}
            <Table.Cell align='center'>
            {issue.assigneeId && (
              <Avatar size='2' radius='full' src={issue.assignee!.image!} fallback='?' />
            )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const columns: { label: string, value: string, className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden sm:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden sm:table-cell' },
  { label: 'Project', value: 'projectId' },
  { label: 'Assignee', value: 'assigneeId' }
];

export default IssuesTable
