import { Column, ColumnConfig } from '@ant-design/plots';

type Props = {
  data: Array<object>;
  xField: string;
  yField: string;
};

const ColumnChart = ({ data, xField, yField }: Props) => {
  const config: ColumnConfig = {
    data,
    xField,
    yField,
    label: {
      position: 'middle', // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <Column {...config} />;
};

export default ColumnChart;
