'use client';

import IconContainer from '@/components/global/icon-container';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, StretchHorizontal } from 'lucide-react';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTasks } from '@/hooks/projects';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/actions/project.actions';
import { useParams } from 'next/navigation';
import { Priority, Task } from '@prisma/client';
import { Textarea } from '@/components/ui/textarea';


type FormFields = {
  title: string;
  description?: string;
  priority: Priority;
  projectId: string;
};

type Props = {
  isEdit?: boolean;
  onOpenChange?: (open: boolean) => void;
  taskData?: Task;
}

const TaskDialog = ({ isEdit = false, taskData, onOpenChange }: Props) => {
  const { projectId }: { projectId: string } = useParams();
  const [isOpen, setIsOpen] = useState(isEdit);
  const { createMutation, updateMutation } = useTasks(taskData?.id);


  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: () => getProjects() });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    setValue,
  } = useForm<FormFields>({
    defaultValues: isEdit ? taskData : {
      priority: 'LOW',
      projectId,
      description: '',
    },
  });
  const descriptionField = watch('description');

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (isEdit && taskData) {
        updateMutation({ ...data, id: taskData.id });
      } else {
        createMutation(data);
      }

      onOpenChange?.(false);
      setIsOpen(false);
    } catch (error) {
      setError('root', { message: 'Oops! Something went wrong. Please try again' });
    }
  }

  const onDialogOpenChange = (open: boolean) => {
    onOpenChange?.(open);
    setIsOpen(open);
    reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild className={`${isEdit && 'hidden'}`}>
        <Button>
          <Plus />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 leading-8'>
          <DialogHeader className='space-y-3'>
            <DialogTitle className='flex items-center gap-3'>
              <IconContainer icon={<StretchHorizontal />} />
              {isEdit ? 'Edit Task' : 'Add New Task'}
            </DialogTitle>
            <DialogDescription>
              Enter your task details here. Click 'Add Task' when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className='flex gap-3 items-end'>
            <div className='grow'>
              <Label className='text-muted-foreground'>Task Title</Label>
              <Input
                type='text'
                placeholder='Enter task title...'
                {...register('title', { required: 'task title is required.' })}
              />
            </div>
          </div>
          {errors.title && <span className='text-red-500 text-sm'>{errors.title.message}</span>}

          <div>
            <Label className='text-muted-foreground'>Description (optional)</Label>
            <Textarea
              placeholder='Enter task description...'
              maxLength={200}
              {...register('description')}
            />
            <span className='text-muted-foreground text-xs'>({descriptionField?.length || 0}/200)</span>
          </div>

          <div className='flex gap-3'>
            <div className='w-full'>
              <Label className='text-muted-foreground'>Priority</Label>
              <Select defaultValue={taskData?.priority || 'LOW'} onValueChange={(val: Priority) => setValue('priority', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='LOW'>
                    <div className='inline-block align-middle rounded-full w-2.5 h-2.5 mr-2.5 bg-green-500' />
                    Low
                  </SelectItem>
                  <SelectItem value='MEDIUM'>
                    <div className='inline-block align-middle rounded-full w-2.5 h-2.5 mr-2.5 bg-yellow-500' />
                    Medium
                  </SelectItem>
                  <SelectItem value='HIGH'>
                    <div className='inline-block align-middle rounded-full w-2.5 h-2.5 mr-2.5 bg-red-500' />
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='w-full'>
              <Label className='text-muted-foreground'>Project</Label>
              <Select defaultValue={taskData?.projectId || projectId} onValueChange={(val) => setValue('projectId', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projects?.data?.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            </div>
          </div>

          <DialogFooter className='mt-5'>
            <DialogClose asChild>
              <Button variant='outline' type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isEdit ? 'Save' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default TaskDialog;