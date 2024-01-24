import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const ProjectsToolbar = () => {
  return (
    <Button mb='5'>
      <Link href='/projects/new'>New Project</Link>
    </Button>
  )
}

export default ProjectsToolbar
