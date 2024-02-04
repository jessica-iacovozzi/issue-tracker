'use client';

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface Props {
  open: number;
  ongoing: number;
  closed: number;
}

const IssueChart = ({ open, ongoing, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'Ongoing', value: ongoing },
    { label: 'Closed', value: closed }
  ];

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar dataKey='value' barSize={60} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
