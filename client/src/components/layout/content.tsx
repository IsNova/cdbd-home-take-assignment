import React from 'react';

type ContentProps = {
  children: React.ReactNode;
};

export function Content({ children }: ContentProps) {
  return (
    <main className="py-6">
      <div className="px-4 sm:px-6 lg:px-6">{children}</div>
    </main>
  );
}
