import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' }});
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' }});
  const ongoing = await prisma.issue.count({ where: { status: 'ONGOING' }});

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} closed={closed} ongoing={ongoing} />
        <IssueChart open={open} closed={closed} ongoing={ongoing} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
