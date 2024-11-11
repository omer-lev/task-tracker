import { createProject, deleteProject, updateProject } from "@/actions/project.actions";
import { createTask, deleteTask, updateTask } from "@/actions/task.actions";
import { useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProjects = (data: any) => {
  const queryClient = useQueryClient();

  // CREATE
  const { mutate: createMutation } = useMutation({
    mutationFn: createProject,
    mutationKey: ['create-project'],
    onError: (error) => {
      toast.error('Oops! Something went wrong. Please try again');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Project created successfully`);
    }
  });

  // UPDATE
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateProject,
    mutationKey: ['update-project', data],
    onError: (error) => {
      toast.error('Oops! Something went wrong. Please try again');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Project updated successfully`);
    }
  });

  // DELETE
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteProject,
    mutationKey: ['delete-project', data],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    }
  });

  return { createMutation, updateMutation, deleteMutation };
}

export const useOptimistic = <T>(mutationKey: any) => {
  const variables = useMutationState({
    filters: {
      mutationKey,
      status: 'pending',
    },
    select: (mutation) => mutation.state.variables as T[] | any,
  });

  return variables;
}

export const useTasks = (data: any) => {
  const queryClient = useQueryClient();

  // CREATE
  // write a mutation for creating a task and put it inside a function called createMutation
  const { mutate: createMutation } = useMutation({
    mutationFn: createTask,
    mutationKey: ['create-task'],
    onError: (error) => {
      toast.error('Oops! Something went wrong. Please try again');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(`Task created successfully`);
    }
  });

  // UPDATE
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateTask,
    mutationKey: ['update-task', data],
    onError: (error) => {
      toast.error('Oops! Something went wrong. Please try again');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(`Task updated successfully`);
    }
  });

  // // DELETE
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteTask,
    mutationKey: ['delete-task', data],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    }
  });

  return { createMutation, updateMutation, deleteMutation };
}