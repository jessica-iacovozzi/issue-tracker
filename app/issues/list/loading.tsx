import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import IssuesToolbar from './IssuesToolbar';

const LoadingIssuesPage = async () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssuesToolbar link='/issues/list' />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width='33%'>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width='33%' className='hidden sm:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width='33%' className='hidden sm:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue}>
              <Table.Cell width='33%'>
                <Skeleton />
                <div className='block sm:hidden'>
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell width='33%' className='hidden sm:table-cell'><Skeleton /></Table.Cell>
              <Table.Cell width='33%' className='hidden sm:table-cell'><Skeleton /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuesPage
