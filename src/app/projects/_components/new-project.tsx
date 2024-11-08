'use client';

import IconContainer from '@/components/global/icon-container';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, StretchHorizontal } from 'lucide-react';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import IconPicker from './icon-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/actions/project.actions';
import { toast } from 'sonner';


type FormFields = {
  title: string;
  icon: string;
}

const NewProject = () => {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<FormFields>({
    defaultValues: { icon: 'home' }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      mutate(data);

      setIsOpen(false);

      toast.success('Project created successfully');
    } catch (error) {
      setError('root', { message: 'Oops! Something went wrong. Please try again' });
    }
  }

  const onDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className='flex items-baseline gap-2'>
              <IconContainer icon={<StretchHorizontal size={22} />} />
              Add New Project
            </DialogTitle>
            <DialogDescription>
              Enter your project details here. Click 'Add Project' when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className='flex gap-3 items-end mt-5'>
            <div className='leading-8 grow'>
              <Label className='text-muted-foreground'>Project Title</Label>
              <Input
                type='text'
                placeholder='Enter Project Title...'
                {...register('title', { required: 'project title is required.' })}
              />
            </div>
            <div className='w-fit leading-8'>
              <Label className='text-muted-foreground'>Icon</Label>
              <IconPicker onChange={(icon) => setValue('icon', icon)} />
            </div>
          </div>
          {errors.title && <span className='text-red-500 text-sm'>{errors.title.message}</span>}

          <DialogFooter className='mt-5'>
            <DialogClose asChild>
              <Button variant='outline' type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default NewProject;