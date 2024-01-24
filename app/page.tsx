import { Button, Flex, Heading } from '@radix-ui/themes'
import Link from 'next/link'

const Home = () => {
  return (
    <Flex direction='column' align='center' mx='2' gap='8'>
      <Heading as='h1' size='9' align='center' mt='9' className='max-w-2xl'>
        Track all of your project <span style={{ color: 'var(--accent-9)' }}>issues</span> in one place.
      </Heading>
      <Link href='/projects/new'>
        <Button size='3'>Create a project</Button>
      </Link>
    </Flex>
  )
}

export default Home
