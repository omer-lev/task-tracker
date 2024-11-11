import IconContainer from '@/components/global/icon-container'
import { Checkbox } from '@/components/ui/checkbox'
import { useOptimistic, useTasks } from '@/hooks/projects';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client'
import { ClipboardList, Pencil, RefreshCcw, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import TaskDialog from './task-dialog';

const TaskCard = ({ task, className }: { task: Task, className?: string }) => {
  const [editing, setEditing] = useState(false);

  const { deleteMutation, updateMutation } = useTasks(task.id);
  const variables: Task[] = useOptimistic(['update-task', task.id]);

  return (
    <>
      <div className={cn(`w-full h-[70px] flex items-center bg-white rounded-md px-5 py-3 shadow-md ${variables.length && 'opacity-50'}`, className)}>
        <div className='flex items-center gap-3 w-[60%]'>
          <Checkbox 
            className='w-6 h-6 border-2 hover:bg-primary-foreground' 
            checked={variables[0]?.completed || task.completed}
            onCheckedChange={(checked) => updateMutation({ ...task, completed: checked as boolean })}
          />
          <IconContainer icon={<ClipboardList />} />

          <div>
            <h3 className='font-medium'>{variables[0]?.title || task.title}</h3>
            {task.description && <p className='text-sm text-muted-foreground'>{variables[0]?.description || task.description}</p>}
          </div>
        </div>
        <div className='flex justify-between items-center grow text-sm text-muted-foreground font-medium'>
          <div className='flex items-center gap-10'>
            <p>
              <RefreshCcw size={20} className='inline-block mr-2' />
              In progress
            </p>
            <div>
              <div className={`inline-block rounded-full w-2.5 h-2.5 mr-2.5 
                bg-${variables.length ? (
                  variables[0]?.priority === 'LOW' || task.priority === 'LOW' ? 'green' : variables[0]?.priority === 'MEDIUM' || task.priority === 'MEDIUM' ? 'yellow' : 'red'
                ) : (
                  task.priority === 'LOW' ? 'green' : task.priority === 'MEDIUM' ? 'yellow' : 'red'
                )}-500`}
              />
                {variables[0]?.priority.toLowerCase() || task.priority.toLowerCase()}
            </div>
          </div>

          <div className='flex gap-3'>
            <IconContainer
              icon={<Pencil size={20} />}
              className='hover:opacity-85 cursor-pointer'
              onClick={() => setEditing(true)}
            />
            <IconContainer
              icon={<Trash2 size={20} />}
              className='bg-red-500 text-white hover:opacity-85 cursor-pointer'
              onClick={() => deleteMutation({ id: task.id, projectId: task.projectId })}
            />
          </div>
        </div>
      </div>

      {editing && (
        <TaskDialog
          isEdit
          taskData={task}
          onOpenChange={(open) => setEditing(open)}
        />
      )}
    </>
  )
}

export default TaskCard;