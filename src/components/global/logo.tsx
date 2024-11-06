import { cn } from '@/lib/utils';
import React from 'react'

const Logo = ({ className }: { className?: string }) => {
  return (
    <h1 className={cn('font-semibold', className)}>Tracker<span className='text-primary'>.</span></h1>
  )
}

export default Logo;