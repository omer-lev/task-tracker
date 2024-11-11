'use client';

import { getProjects } from '@/actions/project.actions'
import { getTasksByProjectId } from '@/actions/task.actions';
import IconContainer from '@/components/global/icon-container'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateProgress } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query'
import { StretchHorizontal } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const ProjectDropdown = () => {
  const router = useRouter();
  const { projectId }: { projectId: string } = useParams();

  const [progress, setProgress] = useState(0);

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const { data: tasks } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasksByProjectId(projectId),
  });

  useEffect(() => {
    if (tasks?.data) {
      setProgress(calculateProgress(tasks.data));
    }
  }, [tasks]);

  return (
    <div className='flex gap-3 items-end'>
      <IconContainer icon={<StretchHorizontal />} className='h-9 w-9' />

      <div className='h-9 min-w-[180px] flex flex-col justify-between py-1'>
        <Select defaultValue={projectId as string} onValueChange={(val) => router.push(`/projects/${val}`)}>
          <SelectTrigger className='border-none shadow-none font-semibold focus:ring-0 p-0 max-h-fit'>
            <SelectValue  />
          </SelectTrigger>
          <SelectContent className='bg-muted shadow-none border-none'>
            {projects?.data?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='flex items-center gap-2'>
          <Progress value={progress} className='bg-muted-foreground/20 h-[2px]' />
        </div>
      </div>
      <span className='text-xs text-muted-foreground -mb-1'>{progress}%</span>
    </div>
  )
}

export default ProjectDropdown