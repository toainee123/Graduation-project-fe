import { Line } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

interface Props {
  data: Array<object>;
  xField: string;
  yField: string;
  seriesField: string;
}

const Chart = ({ data, xField, yField, seriesField }: Props) => {
  const COLOR_PLATE_10 = [
    '#5B8FF9',
    '#5AD8A6',
    '#5D7092',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
  ];

  const config = {
    data,
    xField,
    yField,
    seriesField,
    yAxis: {
      label: {
        formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: COLOR_PLATE_10,
    point: {
      shape: ({ category }: any) => {
        return category === 'Gas flarinls' ? 'square' : 'circle';
      },
      style: ({ year }: any) => {
        return {
          r: Number(year) % 4 ? 0 : 3,
        };
      },
    },
  };

  return <Line {...config} />;
};

export default Chart;
