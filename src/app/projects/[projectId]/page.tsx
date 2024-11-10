import React from 'react';
import Header from '../_components/header';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import IconContainer from '@/components/global/icon-container';
import { StretchHorizontal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Tasks from './_components/tasks';

type Props = {}

const ProjectPage = (props: Props) => {
  return (
    <div className='px-14 space-y-10'>
      <Header page='tasks' />

      <div className='grow pl-5 flex justify-between max-h-fit'>
        <div className='flex gap-3 items-end'>
          <IconContainer icon={<StretchHorizontal />} className='h-9 w-9' />

          <div className='h-9 min-w-[180px] flex flex-col justify-between py-1'>
            <Select defaultValue='az'>
              <SelectTrigger className='border-none shadow-none font-semibold focus:ring-0 p-0 max-h-fit'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-muted shadow-none border-none'>
                <SelectItem value='az'>Project Title</SelectItem>
                <SelectItem value='newest'>Newest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
              </SelectContent>
            </Select>

            <div className='flex items-center gap-2'>
              <Progress value={0} className='bg-muted-foreground/20 h-[2px]' />
            </div>
          </div>
          <span className='text-xs text-muted-foreground -mb-1'>0%</span>
        </div>

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