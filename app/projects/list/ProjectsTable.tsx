import { Issue, Project, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";

export interface ProjectQuery {
  orderBy: string;
  orderDirection: 'asc' | 'desc';
  page: string;
  project: string;
  status: Status;
}

interface Props {
  searchParams: ProjectQuery;
  projects: ({
    issues: Issue[];
  } & Project)[];
}

const ProjectsTable = ({ searchParams, projects }: Props) => {
  const arrows =
  <>
    {searchParams.orderDirection === 'asc' ? (
      <ArrowUpIcon className='inline align-text-bottom ms-1' />
    ) : (
      <ArrowDownIcon className='inline align-text-bottom ms-1' />
    )}
  </>

  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width={2/5}>
            <Link href={{
              query: { ...searchParams, orderBy: 'title', orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc' }
            }}>Project</Link>
            { searchParams.orderBy === 'title' && arrows }
          </Table.ColumnHeaderCell>

          {columns.map(column => (
            <TableColumnHeaderCell key={column.status} width={1/5} align="center" className="hidden xs:table-cell">
              <Link href={{
              query: { ...searchParams, orderBy: 'issues', status: column.status, orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc' }
            }}>{column.label}</Link>
            { searchParams.orderBy === 'issues' && searchParams.status === column.status && arrows }
            </TableColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {projects.map(project => (
          <Table.Row key={project.id}>
            <Table.Cell width={2/5}>
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </Table.Cell>

            {columns.map(column => (
              <Table.Cell key={column.label} width={1/5} align="center" className="hidden xs:table-cell">
                {project.issues.filter(issue => issue.status === column.status).length}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const columns: { label: string, status: Status }[] = [
  { label: 'Open Issues', status: 'OPEN' },
  { label: 'Ongoing Issues', status: 'ONGOING' },
  { label: 'Closed Issues', status: 'CLOSED' }
]

export default ProjectsTable
