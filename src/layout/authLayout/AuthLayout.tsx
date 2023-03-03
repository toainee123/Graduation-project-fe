import { Image } from 'antd';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectUserToken } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hooks';

import './authLayout.scss';

type Props = {};

const AuthLayout = (props: Props) => {
  const token = useAppSelector(selectUserToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <div id='loginContainer'>
      <div>
        <label htmlFor='login' style={{ fontSize: '20px', color: 'red' }}>
          Login
        </label>
      </div>
      <div className='loginWrap'>
        <div className='loginFormLeft'>
          <Outlet />
        </div>
        <div className='loginImageRight'>
          <Image
            width={'100%'}
            src='https://kenh14cdn.com/203336854389633024/2022/6/29/photo-1-16565014000971960422922.jpg'
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
