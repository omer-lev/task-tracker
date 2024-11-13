import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Sidebar from './_components/sidebar';
import { getProjects } from '@/actions/project.actions';
import { getAllTasks } from '@/actions/task.actions';

const ProjectsLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='h-full w-[calc(100%-100px)] fixed left-[100px]'>
        <Sidebar />

        {children}
      </main>
    </HydrationBoundary>
  )
}

export default ProjectsLayout;