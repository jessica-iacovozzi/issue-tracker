import authOptions from "@/app/auth/authOptions";
import { projectSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 })

  const body = await request.json();
  const validation = projectSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const newProject = await prisma.project.create({
    data: {
      title: body.title,
      managerId: body.managerId
    }
  });

  return NextResponse.json(newProject, { status: 201 })
}
