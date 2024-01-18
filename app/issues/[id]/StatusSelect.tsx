'use client';

import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const statuses: { label: string, value: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'Ongoing', value: 'ONGOING' }
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const changeStatus = (status: Status ) => {
    axios
      .patch('/api/issues/' + issue.id, { status })
      .then(() => {
        toast.success('Status was changed successfully!');
        router.refresh();
      })
      .catch(() => toast.error('Status could not be changed.'));
    };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={changeStatus}>
        <Select.Trigger placeholder='Change Status' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map(status => <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>)}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default StatusSelect
