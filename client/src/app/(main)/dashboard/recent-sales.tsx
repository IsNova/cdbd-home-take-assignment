import React from 'react';

import { LineChart } from '@/components/charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RecentSales() {
  return (
    <Card className="col-span-8">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">
        <LineChart data={data} />
      </CardContent>
    </Card>
  );
}

const data = [
  {
    id: 'japan',
    color: 'hsl(276, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 268,
      },
      {
        x: 'helicopter',
        y: 32,
      },
      {
        x: 'boat',
        y: 27,
      },
      {
        x: 'train',
        y: 141,
      },
      {
        x: 'subway',
        y: 238,
      },
      {
        x: 'bus',
        y: 44,
      },
      {
        x: 'car',
        y: 74,
      },
      {
        x: 'moto',
        y: 229,
      },
      {
        x: 'bicycle',
        y: 256,
      },
      {
        x: 'horse',
        y: 169,
      },
      {
        x: 'skateboard',
        y: 138,
      },
      {
        x: 'others',
        y: 254,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(47, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 144,
      },
      {
        x: 'helicopter',
        y: 290,
      },
      {
        x: 'boat',
        y: 33,
      },
      {
        x: 'train',
        y: 20,
      },
      {
        x: 'subway',
        y: 86,
      },
      {
        x: 'bus',
        y: 298,
      },
      {
        x: 'car',
        y: 120,
      },
      {
        x: 'moto',
        y: 60,
      },
      {
        x: 'bicycle',
        y: 279,
      },
      {
        x: 'horse',
        y: 257,
      },
      {
        x: 'skateboard',
        y: 216,
      },
      {
        x: 'others',
        y: 290,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(18, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 133,
      },
      {
        x: 'helicopter',
        y: 43,
      },
      {
        x: 'boat',
        y: 290,
      },
      {
        x: 'train',
        y: 300,
      },
      {
        x: 'subway',
        y: 250,
      },
      {
        x: 'bus',
        y: 121,
      },
      {
        x: 'car',
        y: 272,
      },
      {
        x: 'moto',
        y: 182,
      },
      {
        x: 'bicycle',
        y: 254,
      },
      {
        x: 'horse',
        y: 261,
      },
      {
        x: 'skateboard',
        y: 291,
      },
      {
        x: 'others',
        y: 263,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(139, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 176,
      },
      {
        x: 'helicopter',
        y: 199,
      },
      {
        x: 'boat',
        y: 75,
      },
      {
        x: 'train',
        y: 156,
      },
      {
        x: 'subway',
        y: 108,
      },
      {
        x: 'bus',
        y: 152,
      },
      {
        x: 'car',
        y: 81,
      },
      {
        x: 'moto',
        y: 193,
      },
      {
        x: 'bicycle',
        y: 67,
      },
      {
        x: 'horse',
        y: 189,
      },
      {
        x: 'skateboard',
        y: 145,
      },
      {
        x: 'others',
        y: 59,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(347, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 19,
      },
      {
        x: 'helicopter',
        y: 166,
      },
      {
        x: 'boat',
        y: 29,
      },
      {
        x: 'train',
        y: 172,
      },
      {
        x: 'subway',
        y: 254,
      },
      {
        x: 'bus',
        y: 107,
      },
      {
        x: 'car',
        y: 45,
      },
      {
        x: 'moto',
        y: 249,
      },
      {
        x: 'bicycle',
        y: 260,
      },
      {
        x: 'horse',
        y: 127,
      },
      {
        x: 'skateboard',
        y: 66,
      },
      {
        x: 'others',
        y: 194,
      },
    ],
  },
];
