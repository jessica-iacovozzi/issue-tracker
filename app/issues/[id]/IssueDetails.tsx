import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const IssueDetails = async ({ issue }: { issue: Issue }) => {
  const project = await prisma.project.findUnique({
    where: { id: issue.projectId }
  });

  return (
    <>
      <Flex gap='4' my='2' align='center' justify='between'>
        <Flex direction='column' gap='2'>
          <Heading>{issue.title}</Heading>
          <Heading weight='light' size='2' as='h2'>
            Project: <Link href={`/projects/${project!.id}`}>{project!.title}</Link>
          </Heading>
        </Flex>
        <Flex gap='4'>
          <IssueStatusBadge status={issue.status} />
          <Text className='initial:hidden xs:block'>{issue.createdAt.toDateString()}</Text>
        </Flex>
      </Flex>
      <Card className='px-6 py-4' mt='4'>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  )
}

export default IssueDetails
