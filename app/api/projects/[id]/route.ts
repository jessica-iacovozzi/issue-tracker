import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchProjectSchema } from "@/app/validationSchema";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 })

  const body = request.json();
  const validation = patchProjectSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const project = await prisma.project.findUnique(
    { where: { id: parseInt(params.id) } }
  );

  if (!project)
    return NextResponse.json({ error: 'Project does not exist' }, { status: 404 })

  const updatedProject = await prisma.project.update({
    where: { id: project.id },
    data: { title: project.title }
  });

  return NextResponse.json(updatedProject)
};

export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
  const session = getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 })

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id)}
  });

  if (!project)
    return NextResponse.json({ error: 'Project does not exist.'}, { status: 404 })

  await prisma.project.delete({
    where: { id: project.id }
  })

  return NextResponse.json({})
}
