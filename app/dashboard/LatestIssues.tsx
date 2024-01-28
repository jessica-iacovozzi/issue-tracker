import { Table, Flex, Avatar, Card, Heading } from '@radix-ui/themes'
import prisma from '@/prisma/client';
import { IssueStatusBadge } from '../components';
import Link from 'next/link';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignee: true
    }
  });

  if (!issues) return null;
  
  return (
    <Card>
      <Heading m='3' size='7'>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify='between' align='center'>
                  <Flex direction='column' align='start' gap='1'>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignee && (
                    <Avatar size='2' radius='full' src={issue.assignee.image!} fallback='?' />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues
