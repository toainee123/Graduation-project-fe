import {
  CalculatorOutlined,
  FileOutlined,
  FileTextOutlined,
  FormOutlined,
  HomeOutlined,
  LineChartOutlined,
  DashboardOutlined,
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
  const [theme, setTheme] = useState<MenuTheme>('dark');

  type MenuItem = Required<MenuProps>['items'][number];

  const menuListItem: MenuItem[] = [
    {
      label: <Link to={urlRouter.HOMEPAGE}>HomePage</Link>,
      key: '1',
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to={urlRouter.DASHBOARD}>Dashboard</Link>,
      key: '2',
      icon: <LineChartOutlined />,
    },
    {
      label: <Link to={urlRouter.ROOM}>Phòng</Link>,
      key: '3',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={urlRouter.SERVICE}>Dịch vụ</Link>,
      key: '4',
      icon: <ReconciliationOutlined />,
    },
    {
      label: <Link to={urlRouter.DATA_POWER}>Tiền điện</Link>,
      key: '5',
      icon: <ThunderboltOutlined />,
    },
    {
      label: <Link to={urlRouter.DATA_WATER}>Tiền nước</Link>,
      key: '6',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={urlRouter.ARISE}>Phát sinh</Link>,
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
          label: <Link to={`${urlRouter.REPORT}/${urlRouter.ReportCustomerRent}`}>Danh sách thuê phòng</Link>,
          key: '9.1',
          icon: <FileTextOutlined />,
        },
        {
          label: (
            <Link to={`${urlRouter.REPORT}/${urlRouter.ReportCustomerContractExpired}`}>
              Danh sách khách hàng sắp hết hạn hợp đồng
            </Link>
          ),
          key: '9.2',
          icon: <FileTextOutlined />,
        },
        {
          label: <Link to={`${urlRouter.REPORT}/${urlRouter.ReportInvoiceDetail}`}>Chi tiết hóa đơn</Link>,
          key: '9.2',
          icon: <FileTextOutlined />,
        },
      ],
    },
    {
      label: <Link to={urlRouter.CHARGE}>Tính tiền</Link>,
      key: '10',
      icon: <CalculatorOutlined />,
    },
    {
      label: <Link to={urlRouter.ESTABLISH}>Thiết lập</Link>,
      key: '11',
      icon: <FileOutlined />,
    },
  ];

  const logout = () => {
    dispatch(AuthSliceAction.logout());
    navigate(`/${urlRouter.AUTH}`);
  };

  return (
    <div id='sidebar'>
      <Sider theme={theme}>
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
            </div>

            <Menu mode={mode} items={menuListItem} />
        </Sider>} */}
    </div>
  );
};

export default Sidebar;
