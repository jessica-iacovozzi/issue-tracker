import IssuesToolbar from './IssuesToolbar';
import IssuesTable from './IssuesTable';
import { Issue, Status } from '@prisma/client';

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    orderDirection: 'asc' | 'desc' }
}

const IssuesPage = ({ searchParams }: Props) => {
  return (
    <>
      <IssuesToolbar />
      <IssuesTable searchParams={searchParams} />
    </>
  )
}

export const dynamic = 'force-dynamic';

export default IssuesPage;
