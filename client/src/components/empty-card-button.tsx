'use client';

import { PlusIcon } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type EmptyCardProps = {
  onClick: () => void;
  title: string;
};

export function EmptyCard({ onClick, title }: EmptyCardProps) {
  return (
    <Card
      onClick={onClick}
      className="group hover:border-slate-400 cursor-pointer border-[1.5px] border-dashed border-slate-300 flex items-center justify-center bg-slate-50"
    >
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle>
          <PlusIcon className="h-8 w-8 text-gray-300 group-hover:text-gray-600 " />
        </CardTitle>
        <CardDescription className="group-hover:text-gray-700 text-gray-400 font-medium">
          {title}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
