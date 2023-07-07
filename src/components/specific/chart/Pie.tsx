import { Pie, PieConfig } from '@ant-design/charts';

type Props = {
  data: Array<object>;
  angleField: string;
  colorField: string;
};
const PieChart = ({ data, angleField, colorField }: Props) => {
  const config: PieConfig = {
    data,
    angleField,
    colorField,
    appendPadding: 10,
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  return <Pie {...config} />;
};
export default PieChart;
