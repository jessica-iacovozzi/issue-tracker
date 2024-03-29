import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

interface Props {
  status: Status
}

const statusMap: Record<Status, { label: string, color: 'red' | 'yellow' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red'},
  ONGOING: { label: 'Ongoing', color: 'yellow'},
  CLOSED: { label: 'Closed', color: 'green'}
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color} variant='surface'>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
