import { Flex } from '@radix-ui/themes';
import { Spinner } from './components';

const Loading = () => {
  return (
    <Flex justify='center' align='center'>
      <Spinner />
    </Flex>
  )
}

export default Loading
