import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import React from 'react'
import ProjectDialog from './_components/project-dialog';
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progress-bar';
import Projects from './_components/projects';
import { QueryClient } from '@tanstack/react-query';
import { getProjects } from '@/actions/project.actions';

type Props = {}

const ProjectsPage = async (props: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

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

        <div className='grow pl-10 flex justify-between max-h-fit'>
          <h2 className='text-2xl font-semibold'>My Projects</h2>
          <div className='flex items-center'>
            <span className='min-w-fit text-sm text-muted-foreground'>Sort by</span>
            <Select defaultValue='az' >
              <SelectTrigger className='border-none shadow-none font-medium focus:ring-0'>
                <SelectValue className='' />
              </SelectTrigger>
              <SelectContent className='bg-muted shadow-none border-none'>
                <SelectItem value='az' className='hover:bg-black'>Order A-Z</SelectItem>
                <SelectItem value='newest' className='hover:bg-black'>Newest</SelectItem>
                <SelectItem value='oldest' className='hover:bg-black'>Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* display data from query */}
        <Projects />
      </section>

      <div className='h-full w-[300px] bg-white flex flex-col items-center pt-14'>
        <h2 className='text-xl font-semibold text-center mb-10'>Projects Completed</h2>

        <AnimatedCircularProgressBar
          min={0}
          max={100}
          gaugePrimaryColor='#27C0B1'
          gaugeSecondaryColor='#e6f7f6'
          value={0}
        />
      </div>
    </div>
  )
}

export default ProjectsPage;