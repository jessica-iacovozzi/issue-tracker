import { Flex, Heading } from '@radix-ui/themes'
import Dashboard from './components/dashboard/Dashboard'

const Home = () => {
  return (
    <>
      <Flex direction='column' align='center' mx='2' gap='8' my='8'>
        <Heading as='h1' size='9' align='center' mx='2' mb='5' className='max-w-2xl'>
          Track all of your project <span style={{ color: 'var(--accent-9)' }}>issues</span> in one place.
        </Heading>
      </Flex>
      <Dashboard />
    </>
  )
}

export default Home
