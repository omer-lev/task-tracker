'use client';

import { getProjects } from '@/actions/project.actions'
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation';

type Props = {}

const TasksRedirectPage = (props: Props) => {
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
  
  if (data?.data?.length) {
    redirect(`/projects/${data.data[0]?.id}`);
  } else {
    redirect('/projects');
  }
}

export default TasksRedirectPage;