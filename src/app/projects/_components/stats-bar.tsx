'use client';

import { getProjects } from '@/actions/project.actions'
import { getAllTasks } from '@/actions/task.actions'
import IconContainer from '@/components/global/icon-container';
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar'
import { isProjectCompleted } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { StretchHorizontal } from 'lucide-react';
import React from 'react'

type Props = {}

const StatsBar = (props: Props) => {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  const projectsRemaining = projects?.data?.filter((project) => !isProjectCompleted(project.tasks)) || [];
  const { tasksCompleted, tasksRemaining } = projects?.data?.reduce(
    (acc, project) => {
      const completed = project.tasks.filter((task) => task.completed).length;
      const incomplete = project.tasks.length - completed;

      return {
        tasksCompleted: acc.tasksCompleted + completed,
        tasksRemaining: acc.tasksRemaining + incomplete,
      };
    },
    { tasksCompleted: 0, tasksRemaining: 0 }
  ) || { tasksCompleted: 0, tasksRemaining: 0 };

  const progress = Math.floor(tasksCompleted / (tasksCompleted + tasksRemaining) * 100);

  return (
    <div className='h-full min-w-[325px] bg-white flex flex-col items-center pt-14 overflow-y-auto thin-scrollbar'>
      <h2 className='text-xl font-semibold text-center mb-10'>Projects Completed</h2>

      {projects?.data && (
        <>
          <AnimatedCircularProgressBar
            min={0}
            max={100}
            gaugePrimaryColor='#27C0B1'
            gaugeSecondaryColor='#e6f7f6'
            value={progress || 0}
            className='mb-3'
          />

          <h3 className='font-semibold text-lg'>{projects?.data?.length - projectsRemaining.length} Completed</h3>
          <p className='text-sm text-muted-foreground'>{tasksCompleted} Tasks Done</p>

          <h3 className='font-semibold text-xl mt-14 mb-4'>Remaining Projects</h3>
          <div className='w-full px-6 space-y-8'>
            {projects.data.map((project, idx) => (
              <div key={project.id} className={`flex items-center mt-3 gap-3 ${idx < projects.data.length && 'border-b'} pb-3`}>
                <IconContainer icon={<StretchHorizontal />} className='' />
                <div>
                  <p className='font-medium'>{project.title}</p>
                  <p className='text-xs text-muted-foreground'>{project.tasks.filter(task => !task.completed).length} Tasks Remaining</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default StatsBar