import { deleteProject } from '@/actions/project.actions';
import IconContainer from '@/components/global/icon-container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { icons } from '@/constants/icons';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

type Props = {
  id: string;
  title: string;
  icon: string;
  tasks?: Task[];
}

const ProjectCard = ({ id, title, icon, tasks }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    }
  })

  return (
    <Card className='w-[350px] h-[300px] overflow-hidden  hover:opacity-80 flex flex-col'>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle className='flex items-center gap-3 w-full'>
          <IconContainer icon={icons[icon]} className='bg-primary text-white' />
          <h3 className='shrink font-medium'>{title}</h3>
        </CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical size={20} className='text-muted-foreground cursor-pointer w-fit' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className='text-red-500 focus:text-red-500'
              onClick={() => mutate()}
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
  )
}

export default ProjectCard