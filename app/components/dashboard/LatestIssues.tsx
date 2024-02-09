import prisma from '@/prisma/client';
import { Card, Heading, Table } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { IssueStatusBadge } from '..';

const LatestIssues = async () => {
  const session = await getServerSession();
  const issues = await prisma.issue.findMany({
    where: { creator: session?.user },
    orderBy: { createdAt: 'desc' },
    take: 7,
    include: {
      assignee: true
    }
  });

  if (!issues) return null;

  return (
    <Card>
      <Heading mx='3' my='4' size='7'>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.RowHeaderCell>
              <Table.Cell className='flex justify-end'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
