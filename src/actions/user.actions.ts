import prisma from "@/lib/db";
import { User } from "@prisma/client";

export const createUser = async (userData: {
  clerkId: string;
  name: string | null;
  email: string;
  photoUrl: string | null;
}) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });

    if (user) return {
      status: 200,
      message: 'User created successfully',
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