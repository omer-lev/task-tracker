import IconContainer from '@/components/global/icon-container';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dog, Plus, StretchHorizontal } from 'lucide-react';
import React from 'react'
import IconPicker from './icon-picker';

type Props = {}

const NewProject = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-baseline gap-2'>
            <IconContainer icon={<StretchHorizontal size={22} />} />
            Add New Project
          </DialogTitle>
          <DialogDescription>
            Enter your project details here. Click 'Add Project' when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className='flex gap-3 items-end mb-5'>
          <div className='leading-8 grow'>
            <Label className='text-muted-foreground'>Project Name</Label>
            <Input type='text' placeholder='Enter Project Name...' />
          </div>
          <div className='w-fit leading-8'>
            <Label className='text-muted-foreground'>Icon</Label>
            <IconPicker />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' type="button">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Add Project</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewProject;