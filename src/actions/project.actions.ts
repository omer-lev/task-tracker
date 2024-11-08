'use server';

import prisma from "@/lib/db";
import { authenticateUser } from "./auth.actions";

// create a new project and save it to the database
export const createProject = async (projectData: {
  title: string;
  icon: string;
}) => {
  const { data: user } = await authenticateUser();  

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }
  
  try {
    const project = await prisma.project.create({
      data: {
        ...projectData,
        ownerId: user.id,
      },
    });

    if (project) return {
      status: 200,
      message: 'Project created successfully',
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

export const getProjects = async () => {
  const { data: user } = await authenticateUser();

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized',
    };
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: user.id,
      },
      select: {
        id: true,
        title: true,
        icon: true,
        tasks: true,
      },
    });

    if (projects) return {
      status: 200,
      data: projects,
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