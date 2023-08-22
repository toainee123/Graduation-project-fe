import {
  BgColorsOutlined,
  BulbOutlined,
  CalculatorOutlined,
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
import HeaderComponent from '../header/Header';
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
        <Link to={urlRouter.HOMEPAGE}>
          Thống kê
        </Link>
      ),
      key: '1',
      icon: <LineChartOutlined />,
    },
    {
      label: (
        <Link to={urlRouter.ROOM}>
          Phòng
        </Link>
      ),
      key: '2',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={urlRouter.WATER}>Chỉ số nước</Link>,
      key: '16',
      icon: <BgColorsOutlined />,
    },

    {
      label: <Link to={urlRouter.ELECTRICITY}>Chỉ số điện</Link>,
      key: '17',
      icon: <BulbOutlined />,
    },
    {
      label: (
        <Link to={urlRouter.SERVICE}>
          Dịch vụ
        </Link>
      ),
      key: '3',
      icon: <ReconciliationOutlined />,
    },

    // {
    //   label: (
    //     <Link className='label-router' to={urlRouter.ARISE}>
    //       Phát sinh
    //     </Link>
    //   ),
    //   key: '7',
    //   icon: <FormOutlined />,
    // },
    // {
    //   label: <Link to={urlRouter.PAYMENT}>Phiếu chi</Link>,
    //   key: '8',
    //   icon: <FileTextOutlined />,
    // },
    {
      label: <div>Báo cáo</div>,
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
        <Link to={urlRouter.ASSETS}>
          Tài sản
        </Link>
      ),
      key: '10',
      icon: <FileTextOutlined />,
    },

    {
      label: (
        <Link to={urlRouter.CHARGE}>
          Tính tiền
        </Link>
      ),
      key: '11',
      icon: <CalculatorOutlined />,
    },
    {
      label: (
        <Link to={urlRouter.ESTABLISH}>
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
