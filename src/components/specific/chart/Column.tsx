import { Pie, PieConfig } from '@ant-design/charts';

import { Column, ColumnConfig } from '@ant-design/plots';
type Props = {
  data: Array<object>;
  angleField: string;
  colorField: string;
};
const ColumnChart = ({ data, xField, yField }: any) => {
  const config: ColumnConfig = {
    data,
    xField,
    yField,
    appendPadding: 20,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#000',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {},
    meta: {
      totalRevenue: {
        alias: 'Doanh thu tháng ',
        formatter(value, index) {
          const a = Number(value).toLocaleString('VND');
          return a;
        },
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...config} />;
};
export default ColumnChart;
