'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

export const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'Ongoing', value: 'ONGOING' }
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateParams = (status: Status) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status)
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!)

    const query = params.size ? '?' + params.toString() : '';
    router.push('/issues/list' + query);
  }

  return (
    <Select.Root onValueChange={updateParams} defaultValue={searchParams.get('status') || ''}>
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.label} value={status.value || 'ALL'}>{status.label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
