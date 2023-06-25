import { useEffect, useState } from 'react';
import Chart from '../../../components/specific/chart/Chart';
import { fetchDataChart } from '../../../features/dashboard/DashboardSlice';
import { useAppDispatch } from '../../../store/hooks';

import './dashboard.scss';

interface Props { };

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);

  useEffect(() => {
    dispatch(fetchDataChart())
      .unwrap()
      .then((resp) => {
        setData(resp)
      })
      .catch()
  }, []);

  return (
    <div>
      <div className='title_page'>
        <h1>Dashboard</h1>
      </div>
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
