import { Image, Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { selectUserToken } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hooks';
import 'react-toastify/dist/ReactToastify.css';
import imageAuth from './content-auth.png'
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
      <div className='flex justify-end'>
        <button
          onClick={() => navigate(-1)}
          className='mt-2 mr-3 focus:outline-none text-white font-medium rounded-lg text-lg px-5 py-2.5 '
        >
          <i className='fa-solid fa-angles-left'></i> Quay về
        </button>
      </div>
      <div className='loginWrap w-full '>
        <div className='content grid lg:grid-cols-[1fr_1fr] md:grid-cols-[1fr]'>
          <div className='w-full p-5 content-left '>
            <h3 className='font-semibold text-[29px] pb-8 md:pb-5 sm:pb-2 text-white'>Quản lý phòng trọ BeeHome</h3>
            <img src={imageAuth} alt="" className='lg:block md:hidden sm:hidden' />
          </div>
          <div>
            <Tabs defaultActiveKey='1' items={items} centered={true} size='large' className='tabs' />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
