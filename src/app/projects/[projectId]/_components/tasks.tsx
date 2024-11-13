'use client';

import { getAllTasks, getTasksByProjectId } from '@/actions/task.actions'
import { QueryCache, useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TaskCard from './task-card';
import { useOptimistic } from '@/hooks/projects';
import { Task } from '@prisma/client';
import Link from 'next/link';
import IconContainer from '@/components/global/icon-container';

const Tasks = () => {
  const { projectId }: { projectId: string } = useParams();
  const completed = JSON.parse(useSearchParams().get('completed') as string);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);


  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksByProjectId(projectId),
  });

  const variables = useOptimistic(['create-task']);

  const filterTasks = (tasks: Task[]) => {
    const projectTasks = tasks?.filter(t => t.projectId === projectId);
    setProjectTasks(projectTasks);

    if (completed) {
      const filtered = projectTasks.filter(t => t.completed);
      setFilteredTasks(filtered);

      return filtered;
    } else {
      const filtered = projectTasks.filter(t => !t.completed);
      setFilteredTasks(filtered);

      return filtered;
    }
  }

  useEffect(() => {
    tasks?.data && filterTasks(tasks.data);
  }, [tasks, completed]);

  if (isLoading) {
    return <div className='text-muted-foreground'>Loading...</div>
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-8 text-[15px] font-medium text-muted-foreground'>
        <Link href={`/projects/${projectId}?completed=false`} className={`flex items-center gap-2 ${!completed && 'text-primary'}`}>
          On Going Tasks
          <IconContainer
            icon={<span className='text-sm'>{!completed ? filteredTasks.length : projectTasks.length - filteredTasks.length}</span>}
            className={`w-6 h-6 ${!completed ? 'bg-primary text-white' : 'bg-muted-foreground text-white'}`}
          />
        </Link>
        <Link href={`/projects/${projectId}?completed=true`} className={`flex items-center gap-2 ${completed && 'text-primary'}`}>
          Completed Tasks
          <IconContainer
            icon={<span className='text-sm'>{completed ? filteredTasks.length : projectTasks.length - filteredTasks.length}</span>}
            className={`w-6 h-6 ${completed ? 'bg-primary text-white' : 'bg-muted-foreground text-white'}`}
          />
        </Link>
      </div>

      {filteredTasks.length === 0 && (
        <div className='text-muted-foreground pt-5'>
          No On Going Tasks
        </div>
      )}

      {filteredTasks.map(task => (
        <TaskCard task={task} key={task.id} />
      ))}
      {variables.map((variable, idx) => (
        variable.projectId === projectId && <TaskCard task={variable} key={idx} className='opacity-50' />
      ))}
    </div>
  )
}

export default Tasks;