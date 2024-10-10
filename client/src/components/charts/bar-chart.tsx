'use client';
import { BarChart as TremorBarChart, Card, Subtitle, Title } from '@tremor/react';

const chartdata = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Mammals',
    'Number of threatened species': 743,
  },
  {
    name: 'Mammals',
    'Number of threatened species': 743,
  },
  {
    name: 'Mammals',
    'Number of threatened species': 743,
  },
];

const dataFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

export function BarChart() {
  return (
    <TremorBarChart
      className="mt-0 px-4"
      data={chartdata}
      index="name"
      categories={['Number of threatened species']}
      colors={['cyan', 'fuchsia']}
      valueFormatter={dataFormatter}
      yAxisWidth={64}
    />
  );
}
