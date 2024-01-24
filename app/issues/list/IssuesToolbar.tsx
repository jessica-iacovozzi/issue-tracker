import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesToolbar = ({ link }: { link: string }) => {
  const query = link.includes('projects') ? `?project=${link.split('/')[2]}` : '';
  
  return (
    <Flex mb='5' justify='between'>
      <Button>
        <Link href={'/issues/new' + query}>New Issue</Link>
      </Button>
      <IssueStatusFilter link={link} />
    </Flex>
  )
}

export default IssuesToolbar
