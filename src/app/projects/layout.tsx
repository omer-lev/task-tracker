import React from 'react'
import Sidebar from './_components/sidebar';

const ProjectsLayout = ({ children }: { children: React.ReactNode }) => {
  // prefetch query here
  return (
    <main className='h-full w-[calc(100%-100px)] fixed left-[100px]'>
      <Sidebar />

      {children}
    </main>
  )
}

export default ProjectsLayout