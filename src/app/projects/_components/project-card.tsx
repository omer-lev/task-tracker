import IconContainer from '@/components/global/icon-container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { icons } from '@/constants/icons';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { useMutationState } from '@tanstack/react-query';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ProjectDialog from './project-dialog';
import { useOptimistic, useProjects } from '@/hooks/projects';

type Props = {
  id: string;
  title: string;
  icon: string;
  tasks?: Task[];
  className?: string;
}

const ProjectCard = ({ id, title, icon, tasks, className }: Props) => {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const { deleteMutation } = useProjects(id);

  const { variables } = useOptimistic(['update-project', id]);

  return (
    <>
      <Card className={cn('w-[350px] h-[300px] overflow-hidden hover:opacity-80 flex flex-col', className)}>
        <CardHeader className='flex flex-row justify-between'>
          <CardTitle className={`flex items-center gap-3 w-full ${variables[0] && 'opacity-50'}`}>
            <IconContainer icon={icons[variables[0]?.icon] || icons[icon]} className='bg-primary text-white' />
            <h3 className='font-medium'>{variables[0]?.title || title}</h3>
          </CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical size={20} className='text-muted-foreground cursor-pointer w-fit' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setEditing(true)}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-red-500 focus:text-red-500'
                onClick={() => deleteMutation(id)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent
          className='grow flex items-center cursor-pointer'
          onClick={() => router.push(`/projects/${id}`)}
        >
          {tasks?.length ? <ul>
            {tasks?.map((task, idx) => (
              <li key={idx} className='flex items-center gap-3'>
                <input type='checkbox' />
                <p>{task.title}</p>
              </li>
            ))}
          </ul>
            : <p className='text-sm font-light text-center w-full'>No current tasks</p>
          }
        </CardContent>

        {/* TODO: replace dummy progress data with real data from tasks */}
        <CardFooter className='h-fit flex-col w-full gap-1'>
          <Progress value={100} className='bg-muted-foreground/20' />
          <div className='flex justify-between w-full text-sm text-muted-foreground'>
            <span>On Progress</span>
            <span>100%</span>
          </div>
        </CardFooter>
      </Card>

      {editing && (
        <ProjectDialog
          isEdit={true}
          projectData={{ id, title, icon }}
          onOpenChange={(open) => setEditing(open)}
        />
      )}
    </>
  )
}

export default ProjectCard;