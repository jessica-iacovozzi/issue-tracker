import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesToolbar = () => {
  return (
    <Flex mb='5' justify='between'>
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
      <IssueStatusFilter />
    </Flex>
  )
}

export default IssuesToolbar
