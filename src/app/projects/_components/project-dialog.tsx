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
import { useProjects } from '@/hooks/projects';


type FormFields = {
  title: string;
  icon: string;
}

type Props = {
  isEdit?: boolean;
  onOpenChange?: (open: boolean) => void;
  projectData?: {
    title: string;
    icon: string;
    id: string;
  };
}

const ProjectDialog = ({ isEdit=false, projectData, onOpenChange }: Props) => {
  const [isOpen, setIsOpen] = useState(isEdit);
  const { createMutation, updateMutation } = useProjects(projectData?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<FormFields>({
    defaultValues: isEdit ? projectData : { title: '', icon: 'home' }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (isEdit && projectData) {
        updateMutation({ ...data, projectId: projectData?.id });
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
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='space-y-3'>
            <DialogTitle className='flex items-center gap-3'>
              <IconContainer icon={<StretchHorizontal />} />
              {isEdit ? 'Edit Project' : 'Add New Project'}
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
              <IconPicker 
                defaultIcon={projectData?.icon}
                onChange={(icon) => setValue('icon', icon)} 
              />
            </div>
          </div>
          {errors.title && <span className='text-red-500 text-sm'>{errors.title.message}</span>}

          <DialogFooter className='mt-5'>
            <DialogClose asChild>
              <Button variant='outline' type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isEdit ? 'Save' : 'Add Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}

export default ProjectDialog;