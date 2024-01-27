import { Skeleton } from '@/app/components';
import { Flex, Box } from '@radix-ui/themes';

const ProjectFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height='2rem' width='4rem' className='mb-3' />
      <Flex align='center' direction='column'>
        <Skeleton height='2rem' width='12rem' className='mb-4' />
        <Skeleton height='2rem' width='8rem' className='mb-4' />
        <Skeleton height='2rem' width='4rem' />
      </Flex>
    </Box>
  )
}

export default ProjectFormSkeleton;
