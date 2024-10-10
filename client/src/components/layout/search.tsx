import React from 'react';

import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
