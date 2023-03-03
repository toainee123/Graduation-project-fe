import { Spin } from 'antd';
import React from 'react';
import { selectFetchUserLoading } from '../../../features/auth/authSlice';
import { selectDashboardLoading } from '../../../features/dashboard/DashboardSlice';
import { useAppSelector } from '../../../store/hooks';

import './loading.scss';

interface ILoadingProps {

};

const Loading = (props: ILoadingProps) => {
  const loadingDashboard = useAppSelector(selectDashboardLoading);
  const loadingAuth = useAppSelector(selectFetchUserLoading);

  return loadingDashboard || loadingAuth ? (
    <div id='loading'>{<Spin tip='loading...' className='loader' />}</div>
  ) : null;
};

export default Loading;
