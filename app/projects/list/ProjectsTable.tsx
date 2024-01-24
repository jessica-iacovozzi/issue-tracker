import { Project } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

export interface ProjectQuery {
  orderBy: string;
  orderDirection: 'asc' | 'desc';
  page: string
}

interface Props {
  searchParams: ProjectQuery;
  projects: Project[];
}

const ProjectsTable = ({ searchParams, projects }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
            <Table.ColumnHeaderCell>
              <Link href={{
                query: { ...searchParams, orderBy: 'title', orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc' }
              }}>Title</Link>
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
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {projects.map(project => (
          <Table.Row key={project.id}>
            <Table.Cell>
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default ProjectsTable
