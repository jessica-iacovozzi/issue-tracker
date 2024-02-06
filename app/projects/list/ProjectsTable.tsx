import { Issue, Project, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";

export interface ProjectQuery {
  orderBy: string | Status;
  orderDirection: 'asc' | 'desc';
  page: string;
  project: string;
}

interface Props {
  searchParams: ProjectQuery;
  projects: ({
    issues: Issue[];
  } & Project)[];
}

const ProjectsTable = ({ searchParams, projects }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            <Link href={{
              query: { ...searchParams, orderBy: 'title', orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc' }
            }}>Project</Link>
            {searchParams.orderBy === 'title' && (
              <>
                {searchParams.orderDirection === 'asc' ? (
                  <ArrowUpIcon className='inline align-text-bottom ms-1' />
                ) : (
                  <ArrowDownIcon className='inline align-text-bottom ms-1' />
                )}
              </>
            )}
          </Table.ColumnHeaderCell>
          {columns.map(column => (
            <TableColumnHeaderCell key={column.status} align="center" className="hidden sm:table-cell">
              {column.label} Issues
            </TableColumnHeaderCell>
          ))}
          <TableColumnHeaderCell align="center">
          <Link href={{
              query: { ...searchParams, orderBy: 'issues', orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc' }
            }}>Total issues</Link>
            {searchParams.orderBy === 'issues' && (
              <>
                {searchParams.orderDirection === 'asc' ? (
                  <ArrowUpIcon className='inline align-text-bottom ms-1' />
                ) : (
                  <ArrowDownIcon className='inline align-text-bottom ms-1' />
                )}
              </>
            )}
          </TableColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {projects.map(project => (
          <Table.Row key={project.id}>
            <Table.Cell>
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </Table.Cell>
            {columns.map(column => (
              <Table.Cell align="center" className="hidden sm:table-cell">
                {project.issues.filter(issue => issue.status === column.status).length}
              </Table.Cell>
            ))}
            <Table.Cell align="center">
              {project.issues.length}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const columns: { label: string, status: Status }[] = [
  { label: 'Open', status: 'OPEN' },
  { label: 'Ongoing', status: 'ONGOING' },
  { label: 'Closed', status: 'CLOSED' }
]

export default ProjectsTable
