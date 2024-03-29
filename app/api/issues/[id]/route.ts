import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from '@/prisma/client';
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 })

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { title, description, assigneeId, projectId, status, images, creatorId } = body;

  if (assigneeId) {
    const user = await prisma.user.findUnique({ where: { id: assigneeId }});
    if (!user) return NextResponse.json({ error: 'Invalid user.' }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!issue)
    return NextResponse.json({ error: 'Issue does not exist.' }, { status: 404 })

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! }
  });

  if (issue.creatorId !== user?.id)
    return NextResponse.json({ error: 'Only the issue creator can edit this issue.' }, { status: 403 })

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assigneeId,
      projectId,
      status,
      images,
      creatorId
    }
  });

  return NextResponse.json(updatedIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 })

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!issue)
    return NextResponse.json({ error: 'Issue does not exist.' }, { status: 404 })

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! }
  });

  if (issue.creatorId !== user?.id)
    return NextResponse.json({ error: 'Only the issue creator can delete this issue.' }, { status: 403 })
  
  await prisma.issue.delete({
    where: { id: issue.id }
  });

  return NextResponse.json({});
}
