import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 })

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { title, description, projectId } = body;

  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
      projectId
    }
  });

  return NextResponse.json(newIssue, { status: 201 });
};
