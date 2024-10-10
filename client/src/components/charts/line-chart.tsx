'use client';
import { ResponsiveLine } from '@nivo/line';

export function LineChart({ data }: any) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 0, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      curve="cardinal"
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: 5,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={3}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableGridX={false}
      enableArea={true}
      areaOpacity={0.05}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      theme={{
        axis: {
          ticks: {
            text: {
              fontFamily: '__Inter_20951f',
            },
          },
          legend: {
            text: {
              fontFamily: '__Inter_20951f',
            },
          },
        },
        legends: {
          text: {
            fontFamily: '__Inter_20951f',
          },
        },
        labels: {
          text: {
            fontFamily: '__Inter_20951f',
          },
        },
        grid: {
          line: {
            stroke: '#6B728F',
            strokeWidth: 0.75,
            strokeDasharray: '3 3',
          },
        },
      }}
    />
  );
}
