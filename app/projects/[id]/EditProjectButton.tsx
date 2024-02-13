import { Pencil1Icon } from "@radix-ui/react-icons"
import { Button, Flex } from "@radix-ui/themes"
import Link from "next/link"

const EditProjectButton = ({projectId}: {projectId: number}) => {
  return (
    <Button>
      <Link href={'/projects/edit/' + projectId}>
        <Flex align='center' gap='2'>
          <Pencil1Icon className="xs:hidden" />
          <span className="hidden xs:block">Edit Project</span>
        </Flex>
      </Link>
    </Button>
  )
}

export default EditProjectButton
