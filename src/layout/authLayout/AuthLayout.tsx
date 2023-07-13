import { Image, Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectUserToken } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hooks';

import './authLayout.scss';
import Login from 'src/pages/auth/login/Login';
import Register from 'src/pages/auth/register/register';

type Props = {};

const AuthLayout = (props: Props) => {
  const token = useAppSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className='mx-12'>Đăng Nhập</span>,
      children: <Login />,
    },
    {
      key: '2',
      label: <span className='mx-12'>Đăng Ký</span>,
      children: <Register />,
    },
  ];

  return (
    <div id='loginContainer'>
      <div className='loginWrap'>
        <Tabs defaultActiveKey="1" items={items} centered={true} size='large' className='tabs' />
      </div>
    </div>
  );
};

export default AuthLayout;
