import AuthLayout from '../layout/authLayout/AuthLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import ListPg from '../pages/admin/pg/listPg/ListPg';
import Pg from '../pages/admin/pg/Pg';
import Login from '../pages/login/Login';
import { urlRouter } from '../utils/constants';

export const adminRoutes = [
  {
    index: true,
    path: urlRouter.DASHBOARD,
    component: Dashboard,
  },
  {
    path: 'pg',
    component: Pg,
    children: [
      { path: urlRouter.LIST_PG, component: ListPg, index: true },
      // { path: 'create', component: Login },
      // { path: 'update', component: Login },
    ],
  },
];

export const authRoute = [
  {
    index: true,
    path: 'login',
    component: Login,
  },
  {
    path: 'forgot-password',
    component: AuthLayout,
  },
];
