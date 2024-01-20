import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  ongoing: number;
  closed: number;
}

const IssueSummary = ({ open, ongoing, closed }: Props) => {
  const containers: { label: string, value: number, status: Status, color: string, bgColor: string }[] = [
    { label: 'Open', value: open, status: 'OPEN', color: 'var(--red-a11)', bgColor: 'var(--red-a2)' },
    { label: 'Ongoing', value: ongoing, status: 'ONGOING', color: 'var(--yellow-a11)', bgColor: 'var(--yellow-a2)' },
    { label: 'Closed', value: closed, status: 'CLOSED', color: 'var(--green-a11)', bgColor: 'var(--green-a2)' }
  ];

  return (
    <Flex gap='5'>
      {containers.map(container => (
        <Link style={{ color: container.color }} key={container.label} className='text-sm font-medium w-full' href={`/issues/list?status=${container.status}`}>
          <Card style={{ borderColor: container.color, backgroundColor: container.bgColor }} size='2'>
            <Flex direction='column' gap='1' align='center'>
              {container.label}
              <Text weight='bold' size='5'>{container.value}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
      <Link key='Total Issues' className='hidden xs:block text-sm font-medium w-full' href={'/issues/list'}>
        <Card size='2'>
          <Flex direction='column' gap='1' align='center'>
            Total
            <Text weight='bold' size='5'>{closed + ongoing + open}</Text>
          </Flex>
        </Card>
      </Link>
    </Flex>
  )
}

export default IssueSummary
