'use server';

import Logo from '@/components/global/logo';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Landing = async () => {
  const { userId } = await auth();

  if (userId) return redirect('/projects');

  return (
    <main className='h-full landing-background-gradient px-8 flex flex-col justify-between'>
      <nav className='h-[10%] flex justify-between items-center'>
        <Logo className='text-2xl' />

        <div className='space-x-3'>
          <SignedOut>
            <Button size='lg' className='bg-primary-foreground text-primary hover:bg-primary hover:text-white' asChild>
              <Link href='/sign-in'>Login</Link>
            </Button>
            <Button size='lg' variant='outline' className='bg-muted border hover:bg-primary hover:text-white' asChild>
              <Link href='/sign-up'>Signup</Link>
            </Button>
          </SignedOut>
          <SignedIn>            
            <SignOutButton>
              <Button variant='outline' className='bg-muted border-2'>
                <LogOut />
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </nav>

      <section className='h-[85%] text-center flex flex-col justify-evenly'>
        <div className='space-y-6'>
          <h1 className='text-[40px] font-semibold'>Manage Your Projects and Tasks <span className='text-primary'>Effortlessly!</span></h1>
          <p className='text-muted-foreground text-sm'>
            Take full control of your projects today - start adding tasks, sorting <br />
            your priorities, and tracking progress with ease. Stay organized and <br />
            boost your productivity effortlessly!
          </p>
          <Button asChild size='lg' className='text-white w-fit mx-auto hover:border border-primary hover:text-primary hover:bg-transparent'>
            <Link href='/projects'>Let's Get Started!</Link>
          </Button>
        </div>

        <Image
          width={580}
          height={413}
          alt='Tracker.'
          src='/landing-preview.png'
          className=' rounded-lg shadow-2xl mx-auto'
        />
      </section>
    </main>
  )
}

export default Landing;