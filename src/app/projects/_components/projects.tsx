'use client';

import { getProjects } from '@/actions/project.actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ProjectCard from './project-card';
import { useOptimistic } from '@/hooks/projects';


const Projects = () => {
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects });
  const variables = useOptimistic(['create-project']);

  return (
    <div className='flex gap-5 flex-wrap grow overflow-y-auto pb-6'>
      {isLoading && <p>Loading...</p>}
      {data?.data?.map((project, idx) => (
        <ProjectCard
          key={idx}
          id={project.id}
          title={project.title}
          icon={project.icon}
          tasks={project.tasks}
        />
      ))}
      {variables.map((variable, idx) => {
        return (
          <ProjectCard
            key={idx}
            id={variable.id}
            title={variable.title}
            icon={variable.icon}
            tasks={variable.tasks}
            className='opacity-50'
          />)
      })}
    </div>
  )
}

export default Projects;