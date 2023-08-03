import Assets from 'src/pages/admin/Assets/Assest';
import ListArise from 'src/pages/admin/arise/ListArise';
import UpdateArise from 'src/pages/admin/arise/UpdateArise';
import Charge from 'src/pages/admin/charge/Charge';
import DataPower from 'src/pages/admin/dataPower/dataPower';
import DataWater from 'src/pages/admin/dataWater/dataWater';
import Establish from 'src/pages/admin/establish/establish';
import Payment from 'src/pages/admin/payMent/payMent';
import Report from 'src/pages/admin/rePort/report';
import CreateMember from 'src/pages/admin/room/createMember/createMember';
import CreateRoom from 'src/pages/admin/room/createRoom/createRoom';
import ListMember from 'src/pages/admin/room/listMember/listMember';
import ListRooms from 'src/pages/admin/room/listRoom/listRoom';
import Room from 'src/pages/admin/room/room/room';
import Service from 'src/pages/admin/service/ListService';
import AuthLayout from '../layout/authLayout/AuthLayout';
// import Dashboard from '../pages/admin/dashboard/Dashboard';

import ReportCustomerContractExpired from 'src/pages/admin/rePort/ReportCustomerContractExpired';
import ReportCustomerRent from 'src/pages/admin/rePort/ReportCustomerRent';
import ReportInvoiceDetail from 'src/pages/admin/rePort/ReportInvoiceDetail';
import CreateSevice from 'src/pages/admin/service/CreateService';
import HomePage from '../pages/admin/homePage/index';
import Pg from '../pages/admin/pg/Pg';
import ListPg from '../pages/admin/pg/listPg/ListPg';
import { urlRouter } from '../utils/constants';
import KeepRoom from 'src/pages/admin/keep-room/keepRoom';
import CreateKeepRoom from 'src/pages/admin/keep-room/create-keep-room';
import Forgotpassword from 'src/pages/auth/forgot-password/Forgotpassword';
import Createpassword from 'src/pages/auth/forgot-password/Createpassword';
import UpdateDeposit from 'src/pages/admin/keep-room/updateDeposit';
import TemplateEmail from 'src/pages/admin/sendEmail';
import CreateTemplateEmail from 'src/pages/admin/sendEmail/create-email';
import CreateAssets from 'src/pages/admin/Assets/createAssets/CreateAssets';
import UpdateAssets from 'src/pages/admin/Assets/UpdateAssets/updateAssets';
import UpdateService from 'src/pages/admin/service/UpdateService/updateService';
import Notificatiton from 'src/pages/admin/notification/notificatiton';

export const adminRoutes = [
  {
    index: true,
    path: urlRouter.HOMEPAGE,
    component: HomePage,
  },
  {
    path: urlRouter.ROOM,
    component: Room,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.LIST_MEMBER}`,
    component: ListMember,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.LIST_ROOM}`,
    component: ListRooms,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.CREATE_ROOM}`,
    component: CreateRoom,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.EDIT_ROOM}/:roomId`,
    component: CreateRoom,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.CREATE_MEMBER}/:roomId`,
    component: CreateMember,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.VIEW_MEMBER_IN_ROOM}/:roomId`,
    component: CreateMember,
  },
  {
    path: `${urlRouter.ROOM}/${urlRouter.UPDATE_MEMBER_IN_ROOM}/:roomId`,
    component: CreateMember,
  },
  {
    path: urlRouter.SERVICE,
    component: Service,
    children: [{ path: urlRouter.SERVICE, component: Service, index: true }],
  },
  {
    path: `${urlRouter.SERVICE}/${urlRouter.ADD_SERVICE}`,
    component: CreateSevice,
  },
  {
    path: `${urlRouter.SERVICE}/:id`,
    component: UpdateService,
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
    path: urlRouter.ARISE,
    component: ListArise,
  },
  {
    path: `${urlRouter.ARISE}/${urlRouter.ADD_ARISE}`,
    component: UpdateArise,
  },
  {
    path: `${urlRouter.ARISE}/${urlRouter.UPDATE_ARISE}`,
    component: UpdateArise,
  },
  {
    path: urlRouter.PAYMENT,
    component: Payment,
  },
  {
    path: urlRouter.NOTIFICATION,
    component: Notificatiton,
  },
  {
    path: urlRouter.REPORT,
    component: Report,
    children: [
      {
        path: urlRouter.ReportCustomerRent,
        component: ReportCustomerRent,
        index: true
      },
      {
        path: urlRouter.ReportCustomerContractExpired,
        component: ReportCustomerContractExpired,
        index: true
      },
      {
        path: urlRouter.ReportInvoiceDetail,
        component: ReportInvoiceDetail,
        index: true
      }

    ]
  },
  {
    path: urlRouter.ASSETS,
    component: Assets,
  },
  {
    path: urlRouter.CHARGE,
    component: Charge,
  },
  {
    path: urlRouter.KEEP_ROOM,
    component: KeepRoom,
  },
  {
    path: urlRouter.CREATE_KEEP_ROOM,
    component: CreateKeepRoom,
  },

  {
    path: 'pg',
    component: Pg,
    children: [
      { path: urlRouter.LIST_PG, component: ListPg, index: true },

    ],
  },

  {
    path: urlRouter.ESTABLISH,
    component: Establish,
  },

  {
    path: urlRouter.FORGOT_PASSWORD,
    component: Forgotpassword,
  },

  {
    path: urlRouter.CREATE_NEW_PASSWORD,
    component: Createpassword,
  },

  {
    path: urlRouter.LIST_EMAIL,
    component: TemplateEmail,
  },
  {
    path: urlRouter.CREATE_EMAIL,
    component: CreateTemplateEmail,
  },
  {
    path: urlRouter.CREATE_ASSETS,
    component: CreateAssets,
  },
  {
    path: `${urlRouter.ASSETS}/:id`,
    component: UpdateAssets,
  },
];

export const authRoute = [
  {
    path: urlRouter.AUTH,
    component: AuthLayout
  },

];
