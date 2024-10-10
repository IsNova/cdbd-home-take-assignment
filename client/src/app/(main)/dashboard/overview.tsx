import React from 'react';

import { BarChart } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Overview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 h-[360px]">
        <BarChart />
      </CardContent>
    </Card>
  );
}

const data = [
  {
    country: 'AD',
    'hot dog': 62,
    'hot dogColor': 'hsl(272, 70%, 50%)',
    burger: 139,
    burgerColor: 'hsl(114, 70%, 50%)',
    sandwich: 27,
    sandwichColor: 'hsl(185, 70%, 50%)',
    kebab: 51,
    kebabColor: 'hsl(296, 70%, 50%)',
    fries: 88,
    friesColor: 'hsl(334, 70%, 50%)',
    donut: 127,
    donutColor: 'hsl(76, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 22,
    'hot dogColor': 'hsl(92, 70%, 50%)',
    burger: 26,
    burgerColor: 'hsl(242, 70%, 50%)',
    sandwich: 186,
    sandwichColor: 'hsl(195, 70%, 50%)',
    kebab: 34,
    kebabColor: 'hsl(318, 70%, 50%)',
    fries: 200,
    friesColor: 'hsl(215, 70%, 50%)',
    donut: 168,
    donutColor: 'hsl(102, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 151,
    'hot dogColor': 'hsl(156, 70%, 50%)',
    burger: 179,
    burgerColor: 'hsl(240, 70%, 50%)',
    sandwich: 179,
    sandwichColor: 'hsl(112, 70%, 50%)',
    kebab: 104,
    kebabColor: 'hsl(183, 70%, 50%)',
    fries: 67,
    friesColor: 'hsl(203, 70%, 50%)',
    donut: 19,
    donutColor: 'hsl(262, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 57,
    'hot dogColor': 'hsl(1, 70%, 50%)',
    burger: 161,
    burgerColor: 'hsl(188, 70%, 50%)',
    sandwich: 197,
    sandwichColor: 'hsl(196, 70%, 50%)',
    kebab: 64,
    kebabColor: 'hsl(277, 70%, 50%)',
    fries: 130,
    friesColor: 'hsl(8, 70%, 50%)',
    donut: 24,
    donutColor: 'hsl(151, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 36,
    'hot dogColor': 'hsl(291, 70%, 50%)',
    burger: 1,
    burgerColor: 'hsl(226, 70%, 50%)',
    sandwich: 123,
    sandwichColor: 'hsl(38, 70%, 50%)',
    kebab: 104,
    kebabColor: 'hsl(13, 70%, 50%)',
    fries: 170,
    friesColor: 'hsl(120, 70%, 50%)',
    donut: 150,
    donutColor: 'hsl(284, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 32,
    'hot dogColor': 'hsl(218, 70%, 50%)',
    burger: 92,
    burgerColor: 'hsl(107, 70%, 50%)',
    sandwich: 143,
    sandwichColor: 'hsl(89, 70%, 50%)',
    kebab: 12,
    kebabColor: 'hsl(292, 70%, 50%)',
    fries: 12,
    friesColor: 'hsl(353, 70%, 50%)',
    donut: 75,
    donutColor: 'hsl(13, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 109,
    'hot dogColor': 'hsl(352, 70%, 50%)',
    burger: 44,
    burgerColor: 'hsl(106, 70%, 50%)',
    sandwich: 49,
    sandwichColor: 'hsl(265, 70%, 50%)',
    kebab: 53,
    kebabColor: 'hsl(59, 70%, 50%)',
    fries: 54,
    friesColor: 'hsl(306, 70%, 50%)',
    donut: 62,
    donutColor: 'hsl(77, 70%, 50%)',
  },
];
