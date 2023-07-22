import { Column, Line, ColumnConfig, LineConfig } from '@ant-design/plots';

type Props = {
  data: Array<object>;
  xField: string;
  yField: string;
};

const LineChart = ({ data, xField, yField }: Props) => {
  const config: LineConfig = {
    data,
    xField,
    yField,
    legend: false,
    label: {
      position: 'middle', // 'top', 'bottom', 'middle',
      style: {
        fill: '#000',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      xField: {
        alias: 'Tháng',
      },
      yField: {
        alias: 'Doanh thu',
      },
    },
  };

  return <Line {...config} />;
};

export default LineChart;
