import { Image, Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { selectUserToken } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hooks';
import 'react-toastify/dist/ReactToastify.css';

import './authLayout.scss';
import Login from 'src/pages/auth/login/Login';
import Register from 'src/pages/auth/register/register';
import { ToastContainer } from 'react-toastify';

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
      <div className='float-right'>
        <button
          onClick={() => navigate(-1)}
          className='mt-2 mr-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
        >
          <i className='fa-solid fa-angles-left'></i> Quay về
        </button>
      </div>
      <div className='loginWrap'>
        <Tabs defaultActiveKey='1' items={items} centered={true} size='large' className='tabs' />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
