'use server';

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const authenticateUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    }
  });

  if (!user) {
    return {
      status: 404,
      message: 'User not found',
    };
  }

  return {
    status: 200,
    data: user,
  };
}

export const isProjectOwner = async (projectId: string) => {
  const { data: user } = await authenticateUser();

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    }
  });

  if (!project) {
    return {
      status: 404,
      message: 'Project not found',
    };
  }

  if (project.ownerId !== user.id) {
    return {
      status: 403,
      message: 'Forbidden',
    };
  }

  return {
    status: 200,
    data: project,
  };
}