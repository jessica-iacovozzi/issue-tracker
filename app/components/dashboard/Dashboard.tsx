import prisma from "@/prisma/client";
import { Button, Flex, Grid, Link } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/authOptions";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return (
    <Flex justify='center'>
      <Link href='/projects/new'>
        <Button size='3'>Get Started</Button>
      </Link>
    </Flex>
  )

  const open = await prisma.issue.count({ where: {
    status: 'OPEN',
    creator: session!.user
  }});

  const closed = await prisma.issue.count({ where: {
    status: 'CLOSED',
    creator: session!.user
  }});

  const ongoing = await prisma.issue.count({ where: {
    status: 'ONGOING',
    creator: session!.user
  }});

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5' mb='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} closed={closed} ongoing={ongoing} />
        <IssueChart open={open} closed={closed} ongoing={ongoing} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};

export default Dashboard
