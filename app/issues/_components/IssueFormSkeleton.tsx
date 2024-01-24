import { Skeleton } from '@/app/components';
import { Box, Flex } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height='2rem' width='4rem' className='mb-5' />
      <Skeleton height='2rem' className='mb-5' />
      <Skeleton height='23rem' className='mb-10' />
      <Flex justify='between'>
        <Skeleton height='2rem' width='8rem' />
        <Skeleton height='2rem' width='8rem' />
      </Flex>
    </Box>
  )
}

export default IssueFormSkeleton;
