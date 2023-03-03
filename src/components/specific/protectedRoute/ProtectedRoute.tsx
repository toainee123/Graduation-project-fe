import React from 'react'
import { Navigate } from 'react-router-dom';
import { selectUserRole, selectUserToken } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';
import { localStorageConstants } from '../../../utils/constants';

type Props = {
  Component: any
  roles: any
  to: string
}

const ProtectedRoute = (props: Partial<Props>) => {
  
  const roleStore = useAppSelector(selectUserRole);
  // const localParse : any = localStorage.getItem(localStorageConstants.USER)
  // const roleStore = JSON.parse(localParse);
  
  const { Component } = props
  const {roles} = props

  return roleStore === roles ? <Component /> : <Navigate to={'/auth'} />
}

export default ProtectedRoute