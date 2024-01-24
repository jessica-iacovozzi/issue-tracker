import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesToolbar = ({ link }: { link: string }) => {
  return (
    <Flex mb='5' justify='between'>
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
      <IssueStatusFilter link={link} />
    </Flex>
  )
}

export default IssuesToolbar
