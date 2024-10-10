import React from 'react';

import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';

import DashboardCards from './dashboard-cards';
import Overview from './overview';
import RecentSales from './recent-sales';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <DashboardCards />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Recent</h2>
        <div className="grid gap-4 grid-cols-12">
          <RecentSales />
          <Overview />
        </div>
      </div>
    </div>
  );
}
