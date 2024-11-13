'use server';

import prisma from "@/lib/db";
import { authenticateUser, isProjectOwner } from "./auth.actions";
import { Priority, Task } from "@prisma/client";
import { SortOrder } from "@/types";

export const getAllTasks = async () => {
  const { data: auth } = await authenticateUser();

  const user = await prisma.user.findUnique({
    where: {
      id: auth?.id,
    },
    include: {
      projects: true,
    },
  });

  if (!auth) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: user?.projects.map(project => project.id) },
      },
    });

    return {
      status: 200,
      data: tasks,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 400,
      message: 'Oops! Something went wrong. Please try again',
    };
  }
}

export const getTasksByProjectId = async (projectId: string, sortOrder: SortOrder = 'OLDEST') => {
  const { data: user } = await isProjectOwner(projectId);

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        ...(sortOrder === 'OLDEST' && { createdAt: 'asc' }),
        ...(sortOrder === 'NEWEST' && { createdAt: 'desc' }),
        ...(sortOrder === 'AZ' && { title: 'asc' }),
        ...(sortOrder === 'ZA' && { title: 'desc' }),
      }
    });

    return {
      status: 200,
      data: tasks,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 400,
      message: 'Oops! Something went wrong. Please try again',
    };
  }
}

export const createTask = async (taskData: {
  title: string;
  description?: string;
  projectId: string;
  priority: Priority;
}) => {
  const { data: user } = await isProjectOwner(taskData.projectId);  

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  try {
    const task = await prisma.task.create({
      data: taskData,
    });

    if (task) return {
      status: 200,
      message: 'Task created successfully',
    }

    return {
      status: 400,
      message: 'Oops! Something went wrong. Please try again',
    };
  } catch (error) {
    console.error(error);

    return {
      status: 400,
      message: 'Oops! Something went wrong. Please try again',
    };
  }
}

export const updateTask = async (taskData: {
  id: string;
  title?: string;
  description?: string;
  projectId: string;
  priority?: Priority;
  completed?: boolean;
}) => {
  const { data: user } = await isProjectOwner(taskData.projectId);

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  const task = await prisma.task.update({
    where: {
      id: taskData.id,
    },
    data: taskData,
  });

  if (task) return {
    status: 200,
    message: 'Task updated successfully',
  }

  return {
    status: 400,
    message: 'Oops! Something went wrong. Please try again',
  };
}

export const deleteTask = async (taskData: {
  id: string, 
  projectId: string
}) => {
  const { data: user } = await isProjectOwner(taskData.projectId);

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  const task = await prisma.task.delete({
    where: {
      id: taskData.id,
    },
  });

  if (task) return {
    status: 200,
    message: 'Task deleted successfully',
  }

  return {
    status: 400,
    message: 'Oops! Something went wrong. Please try again',
  };
}