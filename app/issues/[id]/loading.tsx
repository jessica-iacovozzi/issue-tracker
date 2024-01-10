import { Skeleton } from "@/app/components";
import { Card, Flex, Heading } from "@radix-ui/themes";

const IssueDetailLoadingPage = () => {
  return (
    <div className='max-w-xl'>
      <Flex gap='4' my='2' align='center' justify='between'>
        <Heading>
          <Skeleton width='8rem' />
        </Heading>
        <Flex gap='4'>
          <Skeleton width='3rem' />
          <Skeleton width='5rem' />
        </Flex>
      </Flex>
      <Card className='prose px-4 py-2' mt='4'>
        <Skeleton count={5} />
      </Card>
    </div>
  )
}

export default IssueDetailLoadingPage
