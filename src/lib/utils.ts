import { Task } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateProgress = (tasks: Task[]) => {
  const total = tasks.length;
  
  if (!total) return 0;

  const completed = tasks.filter((task) => task.completed).length;

  return Math.round((completed / total) * 100);
}

export const isProjectCompleted = (tasks: Task[]) => {
  return calculateProgress(tasks) === 100;
}