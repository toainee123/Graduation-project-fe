import { useEffect, useState } from 'react';
import Chart from '../../../components/specific/chart/Chart';
import { fetchDataChart } from '../../../features/dashboard/DashboardSlice';
import { useAppDispatch } from '../../../store/hooks';

import './dashboard.scss';

interface Props {}

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);

  useEffect(() => {
    dispatch(fetchDataChart())
      .unwrap()
      .then((resp) => {
        setData(resp);
      })
      .catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {' '}
      x<h2>Dashboard</h2>
      <div className='chartWrap'>
        <div className='chartDashboard'>
          <Chart data={data} xField={'year'} yField={'value'} seriesField={'category'} />
        </div>
        <div className='chartDashboard'>
          <Chart data={data} xField={'year'} yField={'value'} seriesField={'category'} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
