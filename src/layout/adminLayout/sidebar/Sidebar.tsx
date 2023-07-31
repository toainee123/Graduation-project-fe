import {
  CalculatorOutlined,
  FileOutlined,
  FileTextOutlined,
  FormOutlined,
  HomeOutlined,
  LineChartOutlined,
  // DashboardOutlined,
  MailOutlined,
  ReconciliationOutlined,
  SketchOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu, MenuProps, MenuTheme } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthSliceAction } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../store/hooks';
import { urlRouter } from '../../../utils/constants';

import './sidebar.scss';
type Props = {};

const { Sider } = Layout;

const Sidebar = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<MenuTheme>('light');

  type MenuItem = Required<MenuProps>['items'][number];

  const menuListItem: MenuItem[] = [
    {
      label: (
        <Link className='label-router' to={urlRouter.HOMEPAGE}>
          HomePage
        </Link>
      ),
      key: '1',
      icon: <LineChartOutlined />,
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.ROOM}>
          Phòng
        </Link>
      ),
      key: '2',
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.SERVICE}>
          Dịch vụ
        </Link>
      ),
      key: '3',
      icon: <ReconciliationOutlined />,
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.DATA_POWER}>
          Tiền điện
        </Link>
      ),
      key: '4',
      icon: <ThunderboltOutlined />,
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.DATA_WATER}>
          Tiền nước
        </Link>
      ),
      key: '5',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={urlRouter.USER}>User</Link>,
      key: '6',
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to={`${urlRouter.USER}`}>Thông tin cá nhân</Link>,
          key: '6.1',

          icon: <UserOutlined />,
        },
        {
          label: <Link to={`${urlRouter.USER}/${urlRouter.USERREPORTDETAIL}`}>Hóa đơn</Link>,
          key: '6.2',
          icon: <FileTextOutlined />,
        },
      ],
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.ARISE}>
          Phát sinh
        </Link>
      ),
      key: '7',
      icon: <FormOutlined />,
    },
    {
      label: <Link to={urlRouter.PAYMENT}>Phiếu chi</Link>,
      key: '8',
      icon: <FileTextOutlined />,
    },
    {
      label: <Link to={urlRouter.REPORT}>Báo cáo</Link>,
      key: '9',
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link to={`${urlRouter.REPORT}/${urlRouter.ReportCustomerRent}`}>Đang thuê phòng</Link>,
          key: '9.1',

          icon: <FileTextOutlined />,
        },
        {
          label: (
            <Link to={`${urlRouter.REPORT}/${urlRouter.ReportCustomerContractExpired}`}>Sắp hết hạn hợp đồng</Link>
          ),
          key: '9.2',
          icon: <FileTextOutlined />,
        },
        {
          label: <Link to={`${urlRouter.REPORT}/${urlRouter.ReportInvoiceDetail}`}>Chi tiết hóa đơn</Link>,
          key: '9.3',
          icon: <FileTextOutlined />,
        },
      ],
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.ASSETS}>
          Tài sản
        </Link>
      ),
      key: '10',
      icon: <FileTextOutlined />,
    },

    {
      label: (
        <Link className='label-router' to={urlRouter.CHARGE}>
          Tính tiền
        </Link>
      ),
      key: '11',
      icon: <CalculatorOutlined />,
    },
    {
      label: (
        <Link className='label-router' to={urlRouter.ESTABLISH}>
          Thiết lập
        </Link>
      ),
      key: '12',

      icon: <FileOutlined />,
    },
    {
      label: <Link to={urlRouter.KEEP_ROOM}>Cọc phòng</Link>,
      key: '13',
      icon: <FileOutlined />,
    },
    {
      label: <Link to={urlRouter.LIST_EMAIL}>Gửi email/ Lịch sử gửi mail</Link>,
      key: '14',
      icon: <MailOutlined />,
    },
  ];

  const logout = () => {
    dispatch(AuthSliceAction.logout());
    navigate(`/${urlRouter.AUTH}`);
  };

  return (
    <div id='sidebar'>
      <Sider theme={theme} width={220}>
        <div className='sidebarLogo'>
          <SketchOutlined />
        </div>
        <Menu
          // style={{ width: 70 }}
          // style={{ minHeight: '100vh' }}
          // onClick={handleOpenMenu}
          defaultSelectedKeys={['1']}
          // defaultOpenKeys={['2']}
          mode={mode}
          theme={theme}
          items={menuListItem}
          // selectedKeys={[current]}
        />

        <div className='userLogin'>
          <Avatar size={32} style={{ margin: 'auto' }} icon={<UserOutlined />} />
          <span className='userTitle' style={{ cursor: 'pointer' }} onClick={logout}>
            Đăng xuất
          </span>
        </div>
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
