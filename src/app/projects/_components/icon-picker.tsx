'use client';

import IconContainer from '@/components/global/icon-container';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { icons } from '@/constants/icons';
import React, { useState } from 'react'


const IconPicker = ({ onChange }: { onChange?: (selectedIcon: string) => void}) => {
  const [selectedIcon, setSelectedIcon] = useState<string>('home');

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IconContainer icon={icons[selectedIcon]} className='w-9 h-9 cursor-pointer hover:opacity-85' />
      </DrawerTrigger>
      <DrawerContent className='pb-8'>
        <div className='w-full max-w-2xl mx-auto'>
          <DrawerHeader>
            <DrawerTitle>All Icons</DrawerTitle>
            <DrawerDescription>Click on any icon to select it</DrawerDescription>
          </DrawerHeader>

          <div className='flex flex-wrap gap-2'>
            {Object.entries(icons).map(([label, icon], idx) => (
              <DrawerClose key={idx} asChild>
                <IconContainer
                  icon={icon}
                  className={`w-10 h-10 cursor-pointer hover:opacity-85 ${label === selectedIcon && 'bg-primary text-white'}`}
                  onClick={() => {
                    setSelectedIcon(label)
                    onChange && onChange(label)
                  }}
                />
              </DrawerClose>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default IconPicker;