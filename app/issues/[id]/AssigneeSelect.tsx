'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@/app/components';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AssigneeSelect = ({ issue }: { issue: Issue } ) => {
  const { data: users, error, isLoading } = useUsers();
  const router = useRouter();

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, { assigneeId: userId === 'unassigned' ? null : userId })
      .then(() => {
        toast.success('Changes were saved successfully!');
        router.refresh();
      })
      .catch(() => toast.error('Changes could not be saved.'))
  };

  if (isLoading) return <Skeleton height='2rem' />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assigneeId || 'unassigned' }
        onValueChange={assignIssue}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value='unassigned'>Unassigned</Select.Item>
            {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),
  retry: 3
});

export default AssigneeSelect
