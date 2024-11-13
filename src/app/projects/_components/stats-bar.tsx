'use client';

import { getProjects } from '@/actions/project.actions'
import { getAllTasks } from '@/actions/task.actions'
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar'
import { isProjectCompleted } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {}

const StatsBar = (props: Props) => {
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
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
    <div className='h-full w-[300px] bg-white flex flex-col items-center pt-14'>
      <h2 className='text-xl font-semibold text-center mb-10'>Projects Completed</h2>

      {projects?.data && (
        <>
          <AnimatedCircularProgressBar
            min={0}
            max={100}
            gaugePrimaryColor='#27C0B1'
            gaugeSecondaryColor='#e6f7f6'
            value={progress}
          />

          <h3>{projects?.data?.length - projectsRemaining.length} Completed</h3>
          <p>{tasksCompleted} Tasks Done</p>
        </>
      )}
    </div>
  )
}

export default StatsBar