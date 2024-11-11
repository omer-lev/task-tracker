import React from 'react';
import Header from '../_components/header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Tasks from './_components/tasks';
import ProjectDropdown from './_components/project-dropdown';

type Props = {}

const ProjectPage = (props: Props) => {
  return (
    <div className='px-14 space-y-10'>
      <Header page='tasks' />

      <div className='grow pl-5 flex justify-between max-h-fit'>
        <ProjectDropdown />

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

      <Tasks />
    </div>
  )
}

export default ProjectPage;