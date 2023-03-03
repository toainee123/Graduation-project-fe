import React from 'react'
import { Navigate } from 'react-router-dom';
import { selectUserRole } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';

type Props = {
    Component: any
}

const ProtectedAuth = (props: Props) => {

    const roleStore = useAppSelector(selectUserRole);
    const { Component } = props

  return roleStore === 'ADMIN' ? <Navigate to={'/admin'} /> : <Component />
}

export default ProtectedAuth