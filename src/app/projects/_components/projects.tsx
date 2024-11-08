'use client';

import { getProjects } from '@/actions/project.actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ProjectCard from './project-card';


const Projects = () => {
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

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
    </div>
  )
}

export default Projects;