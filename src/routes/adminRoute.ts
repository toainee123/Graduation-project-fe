import DataPower from 'src/pages/admin/dataPower/dataPower';
import DataWater from 'src/pages/admin/dataWater/dataWater';
import OtherFree from 'src/pages/admin/otherFree/otherFree';
import Payment from 'src/pages/admin/payMent/payMent';
import Report from 'src/pages/admin/rePort/report';
import Room from 'src/pages/admin/room/room/room';
import Service from 'src/pages/admin/service/ListService';
import AuthLayout from '../layout/authLayout/AuthLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import ListPg from '../pages/admin/pg/listPg/ListPg';
import Pg from '../pages/admin/pg/Pg';
import Login from '../pages/login/Login';
import { urlRouter } from '../utils/constants';
import CreateRoom from 'src/pages/admin/room/createRoom/createRoom';
import Establish from 'src/pages/admin/establish/establish';
import Charge from 'src/pages/admin/charge/Charge';

export const adminRoutes = [
  {
    index: true,
    path: urlRouter.DASHBOARD,
    component: Dashboard,
  },
  {
    path: urlRouter.ROOM,
    component: Room,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.CREATE_ROOM}`,
    component: CreateRoom,
  },
  {
    // path: urlRouter.SERVICE,
    component: Service,
    children: [{ path: urlRouter.SERVICE, component: Service, index: true }],
  },
  {
    path: urlRouter.DATA_POWER,
    component: DataPower,
  },
  {
    path: urlRouter.DATA_WATER,
    component: DataWater,
  },

  {
    path: urlRouter.OTHER_FREE,
    component: OtherFree,
  },
  {
    path: urlRouter.PAYMENT,
    component: Payment,
  },
  {
    path: urlRouter.REPORT,
    component: Report,
  },

  {
    path: urlRouter.CHARGE,
    component: Charge,
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

  {
    path: urlRouter.ESTABLISH,
    component: Establish,
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
