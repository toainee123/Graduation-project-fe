import {
  BgColorsOutlined,
  BulbOutlined,
  CalculatorOutlined,
  ExclamationCircleOutlined,
  FileOutlined,
  FileTextOutlined,
  FormOutlined,
  HomeOutlined,
  LineChartOutlined,
  // DashboardOutlined,
  MailOutlined,
  ReconciliationOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps, MenuTheme } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from './logo bee.png';

import { AuthSliceAction } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../store/hooks';
import { urlRouter } from '../../../utils/constants';

import './sidebar.scss';
type Props = {};

const { Sider } = Layout;

const Sidebar = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<MenuTheme>('light');

  type MenuItem = Required<MenuProps>['items'][number];
  const getEmailLocalStorage = localStorage.getItem('email');
  const resultEmail = getEmailLocalStorage?.substring(1, getEmailLocalStorage.length - 11);
  const menuListItem: MenuItem[] = [
    {
      label: (
        <Link className='label-router' to={urlRouter.CLIENT_DASHBOARD}>
          Thống kê
        </Link>
      ),
      key: '0',
      icon: <LineChartOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_ROOM}>Phòng</Link>,
      key: '2',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_ELECTRICITY}>Chỉ số điện</Link>,
      key: '10',
      icon: <BulbOutlined />,
    },

    {
      label: <Link to={urlRouter.CLIENT_WATER}>Chỉ số nước</Link>,
      key: '11',
      icon: <BgColorsOutlined />,
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.CLIENT_SERVICE}>
          Dịch vụ
        </Link>
      ),
      key: '1',
      icon: <LineChartOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_CONTRACT}>Hợp đồng</Link>,
      key: '3',
      icon: <ReconciliationOutlined />,
    },
    // {
    //   label: (
    //     <Link to={urlRouter.CLIENT_ARISE}>
    //       Phát sinh
    //     </Link>
    //   ),
    //   key: '4',
    //   icon: <ThunderboltOutlined />,
    // },
    {
      label: <Link to={urlRouter.CLIENT_ASSET}>Tài sản</Link>,
      key: '5',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_BILL}>Hóa đơn</Link>,
      key: '6',
      icon: <FormOutlined />,
    },

    {
      label: <Link to={urlRouter.CLIENT_RECEIPT}>Thanh toan Hóa đơn</Link>,
      key: '15',
      icon: <FormOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_SENDNOTIFICATION}>Báo cáo </Link>,
      key: '7',
      icon: <ExclamationCircleOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_INFAORMATION}>Thông tin cá nhân</Link>,
      key: '8',
      icon: <FileTextOutlined />,
    },
    {
      label: <Link to={urlRouter.CLIENT_CHANGEPASSWORD}>Đổi mật khẩu</Link>,
      key: '9',
      icon: <FileTextOutlined />,
    },
  ];

  const logout = () => {
    dispatch(AuthSliceAction.logout());
    navigate('/lading-page');
  };

  return (
    <div id='sidebar'>
      <Sider theme={theme} width={220}>
        <div className='py-3 text-center flex flex-col gap-1 border-b-2 rounded-lg bg-slate-200'>
          <Link to='/admin  ' className='title-dashboard'>
            <img src={logo} alt='' width={60} className=' mx-auto' />
            Quản Lý Nhà Trọ
          </Link>
          <span className=' text-base'>
            Xin Chào, <span className='uppercase'>{resultEmail}</span>
          </span>
        </div>
        <Menu
          // style={{ width: 70 }}
          // style={{ minHeight: '100vh' }}
          // onClick={handleOpenMenu}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['8']}
          mode={mode}
          theme={theme}
          items={menuListItem}
          // selectedKeys={[current]}
        />
      </Sider>

      {/* {showMenu && <Sider collapsed={collapsedSide} className='first-child-sider'>
            <div className={`${collapsedSide ? 'sidebar-top-collapse' : 'sidebar-top'}`}>
              <button onClick={() => setCollapsedSide(!collapsedSide)}>
                {!collapsedSide && <LeftCircleOutlined />}
                {collapsedSide && <RightCircleOutlined />}
              </button>
            </div
            <Menu mode={mode} items={menuListItem} />
        </Sider>} */}
    </div>
  );
};

export default Sidebar;
