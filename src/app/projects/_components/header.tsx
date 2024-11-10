import React from 'react'
import ProjectDialog from './project-dialog';
import { Search } from 'lucide-react';
import TaskDialog from '../[projectId]/_components/task-dialog';

type Props = {
  page: 'projects' | 'tasks';
}

const Header = ({ page }: Props) => {
  return (
    <div className='flex justify-between py-6'>
      <div className='flex items-center gap-3'>
        <Search className='text-muted-foreground cursor-pointer' size={22} />
        <input 
          type="text" 
          placeholder={`Search a ${page.slice(0, -1)}...`}
          className='bg-transparent border-b-2 font-light focus:outline-none' 
        />
      </div>

      {page === 'projects' ? <ProjectDialog /> : <TaskDialog />}
    </div>

  )
}

export default Header;