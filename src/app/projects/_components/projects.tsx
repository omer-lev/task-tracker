'use client';

import { getProjects } from '@/actions/project.actions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ProjectCard from './project-card';

type Props = {}

const Projects = (props: Props) => {
  const { data, isLoading } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

  return (
    <div className='flex gap-5 flex-wrap'>
      {isLoading && <p>Loading...</p>}
      {data?.data?.map((project, idx) => (
          <ProjectCard key={idx} title={project.title} icon={project.icon} />
      ))}
    </div>
  )
}

export default Projects;