import type { MenuProps } from 'antd';
import { Badge, Dropdown, Layout, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './header.scss';

import { AuthSliceAction } from 'src/features/auth/authSlice';
import { useAppDispatch } from 'src/store/hooks';
import { getNotification } from 'src/api/dashboard';
import moment from 'moment';

type Props = {};

const { Header } = Layout;

const HeaderComponent = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    dispatch(AuthSliceAction.logout());
    navigate(`/lading-page`);
  };
  const items: MenuProps['items'] = [
    // {
    //   key: '1',
    //   label: (
    //     <a target='_blank' href='/information'>
    //       Thông tin tài khoản
    //     </a>
    //   ),
    // },
    {
      key: '3',
      label: <a onClick={logout}>Đăng xuất</a>,
    },
  ];
  return (
    <Header>
      <Space>
        <Dropdown menu={{ items }} placement='bottomLeft'>
          <button>
            <i className='fa-solid fa-user fa-xl mx-6'></i>
          </button>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent;
