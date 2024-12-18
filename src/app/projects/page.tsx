'use server';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import React from 'react'
import ProjectDialog from './_components/project-dialog';
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar';
import Projects from './_components/projects';
import StatsBar from './_components/stats-bar';

type Props = {}

const ProjectsPage = async (props: Props) => {
  return (
    <div className='flex h-full'>
      <section className='grow space-y-10 px-14 flex flex-col'>
        <div className='flex justify-between py-6'>
          <div className='flex items-center gap-3'>
            <Search className='text-muted-foreground cursor-pointer' size={22} />
            <input type="text" placeholder='Search a project...' className='bg-transparent border-b-2 font-light focus:outline-none' />
          </div>

          <ProjectDialog />
        </div>

        <div className='grow pl-5 flex justify-between max-h-fit'>
          <h2 className='text-2xl font-semibold'>My Projects</h2>
          <div className='flex items-center'>
            <span className='min-w-fit text-sm text-muted-foreground'>Sort by</span>
            <Select defaultValue='az' >
              <SelectTrigger className='border-none shadow-none font-medium focus:ring-0'>
                <SelectValue className='' />
              </SelectTrigger>
              <SelectContent className='bg-muted shadow-none border-none'>
                <SelectItem value='az'>Order A-Z</SelectItem>
                <SelectItem value='newest'>Newest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* display data from query */}
        <Projects />
      </section>

      <StatsBar />
    </div>
  )
}

export default ProjectsPage;