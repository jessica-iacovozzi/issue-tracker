import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: { label: string, value: number, status: Status, color: string, bgColor: string }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN', color: 'var(--red-a11)', bgColor: 'var(--red-a2)' },
    { label: 'Issues In Progress', value: inProgress, status: "IN_PROGRESS", color: 'var(--yellow-a11)', bgColor: 'var(--yellow-a2)' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED', color: 'var(--green-a11)', bgColor: 'var(--green-a2)' }
  ];

  return (
    <Flex gap='4'>
      {containers.map(container => (
        <Link style={{ color: container.color }} key={container.label} className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>
          <Card style={{ borderColor: container.color, backgroundColor: container.bgColor }} size='2'>
            <Flex direction='column' gap='1'>
              {container.label}
              <Text weight='bold' size='5'>{container.value}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  )
}

export default IssueSummary
