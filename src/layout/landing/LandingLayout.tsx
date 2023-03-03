import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { selectUserRole } from '../../features/auth/authSlice';
import { useAppSelector } from '../../store/hooks';

type Props = {};

const LandingLayout = (props: Props) => {

  return (
    <div>
      <h1>Langding Page</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
