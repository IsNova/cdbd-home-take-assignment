'use client';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { headers } from '@/configs/navigation';
import { cn } from '@/lib/utils';
import { BellIcon, MenuIcon } from '@heroicons/react/outline';

import { buttonVariants } from '../ui/button';
import ProfileMenu from './profile-menu';
import Search from './search';

type HeaderProps = {
  title: string;
  href?: string;
};

export function FormHeader({ title, href = '' }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Link href={href} className="-m-2.5 p-2.5 text-gray-700">
        <span className="sr-only">Open sidebar</span>
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </Link>
      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 -mx-2" aria-hidden="true" />
      <div className="flex flex-1 gap-x-4 items-center lg:gap-x-6 self-stretch justify-between">
        <h2 className="text-xl font-medium tracking-tight max-w-fit">
          {title}
        </h2>
        <div className="flex flex-1 items-center gap-x-4 lg:gap-x-6 justify-end">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            Cancel
          </button>{' '}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
