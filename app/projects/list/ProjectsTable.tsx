import { Issue, Project } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table, TableColumnHeaderCell } from "@radix-ui/themes";
import Link from "next/link";

export interface ProjectQuery {
  orderBy: string;
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
            <TableColumnHeaderCell align="center" className="hidden sm:table-cell">
              {column.label} Issues
            </TableColumnHeaderCell>
          ))}
          <TableColumnHeaderCell align="center">
            Total Issues
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
                {project.issues.filter(issue => issue.status === column.value).length}
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

const columns = [
  { label: 'Open', value: 'OPEN' },
  { label: 'Ongoing', value: 'ONGOING' },
  { label: 'Closed', value: 'CLOSED' }
]

export default ProjectsTable
