'use client';

import { getProjects } from '@/actions/project.actions';
import { useMutationState, useQuery } from '@tanstack/react-query';
import React from 'react'
import ProjectCard from './project-card';


const Projects = () => {
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

  const mutation = useMutationState({
    filters: { mutationKey: ['create-project'], status: 'pending' },
    select: (mutation) => mutation.state.variables as any
  });

  return (
    <div className='flex gap-5 flex-wrap grow overflow-y-auto pb-6'>
      {isLoading && <p>Loading...</p>}
      {data?.data?.map((project, idx) => (
        <ProjectCard
          key={idx}
          id={project.id}
          title={project.title}
          icon={project.icon}
        />
      ))}
      {mutation.map((variable, idx) => {
        return (
          <ProjectCard
            key={idx}
            id={variable.id}
            title={variable.title}
            icon={variable.icon}
            className='opacity-50'
          />)
      })}
    </div>
  )
}

export default Projects;