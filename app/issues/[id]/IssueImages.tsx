'use client'

import { Issue } from "@prisma/client"
import { AspectRatio, Grid } from "@radix-ui/themes"
import { CldImage } from "next-cloudinary"

const IssueImages = ({ issue }: { issue: Issue }) => {
  return (
    <Grid columns='2' gap='5' mt='5'>
      {issue.images && issue.images.map((id) => (
        <AspectRatio ratio={4/3}>
          <CldImage key={id} src={id} fill alt={id} className="rounded-lg" />
        </AspectRatio>
      ))}
    </Grid>
  )
}

export default IssueImages
