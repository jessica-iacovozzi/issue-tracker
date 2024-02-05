import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
// import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';
import StatusSelect from './StatusSelect';
import BackButton from '@/app/components/BackButton';
import IssueImages from './IssueImages';

interface Props {
  params: { id: string }
}

const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId }}));

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='sm:col-span-4'>
        <BackButton />
        <IssueDetails issue={issue} />
        <IssueImages issue={issue} />
      </Box>
      {session &&
        <Box mt='9' ml='2'>
          <Flex direction='column' gap='4'>
            {/* <AssigneeSelect issue={issue} /> */}
            <StatusSelect issue={issue} />
            <EditIssueButton issue={issue} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      }
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: 'Issue - ' + issue?.title,
    description: 'Issue description: ' + issue?.description
  }
}

export default IssueDetailPage
