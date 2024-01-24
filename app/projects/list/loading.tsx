import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import ProjectsToolbar from './ProjectsToolbar';

const LoadingProjectsPage = async () => {
  const projects = [1, 2, 3, 4, 5];

  return (
    <div>
      <ProjectsToolbar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Project</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map(issue => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingProjectsPage
