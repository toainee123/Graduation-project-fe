import React, { useEffect, useState } from 'react';
import Loading from '../../../components/common/loading/Loading';
import Chart from '../../../components/specific/chart/Chart';
import { fetchDataChart, selectDashboardLoading } from '../../../features/dashboard/DashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import './dashboard.scss';

interface Props {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch()
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
      <h2>Dashboard</h2>
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
