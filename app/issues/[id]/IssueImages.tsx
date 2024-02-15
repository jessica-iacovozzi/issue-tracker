'use client'

import { Issue } from "@prisma/client"
import { Grid } from "@radix-ui/themes"
import { CldImage } from "next-cloudinary"

const IssueImages = ({ issue }: { issue: Issue }) => {
  return (
    <Grid columns={{ initial: '1', xs: '2' }} gap='5' mt='5'>
      {issue.images && issue.images.map((id) => (
        <div key={id} className="relative h-80">
          <CldImage src={id} alt={id} fill className="rounded-lg object-cover" />
        </div>
      ))}
    </Grid>
  )
}

export default IssueImages
