import type { MenuProps } from 'antd';
import { Avatar, Badge, Button, Drawer, Dropdown, Layout, List, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './header.scss';

import { AuthSliceAction } from 'src/features/auth/authSlice';
import { useAppDispatch } from 'src/store/hooks';
import { urlRouter } from 'src/utils/constants';
import { getNotification } from 'src/api/dashboard';
import moment from 'moment';

type Props = {};

const { Header } = Layout;

const HeaderComponent = (props: Props) => {
  const [notification, setNotification] = useState([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAllNotifi = async () => {
      const { data } = await getNotification({ status: false });
      setNotification(data);
    };
    getAllNotifi();
  }, [setNotification]);
  const showDrawer = () => {
    const getAllNotifi = async () => {
      const { data } = await getNotification({ status: false });
      setNotification(data);
    };
    getAllNotifi();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(AuthSliceAction.logout());
    navigate(`/lading-page`);
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' href=''>
          Thông tin tài khoản
        </a>
      ),
    },
    {
      key: '3',
      label: <a onClick={logout}>Đăng xuất</a>,
    },
  ];
  const data = notification.map((item: any, index: number) => {
    return {
      key: index,
      nameroom: item?.nameroom,
      status: item?.status,
      datenotification: moment(item?.datenotification).format('HH:MM - DD/MM'),
      content: item?.content,
    };
  });
  // const filteredDataSource = data.filter((item) => item.status === false);
  return (
    <Header>
      <Space>
        <button onClick={showDrawer}>
          <Badge count={data?.length}>
            <i className='fa-solid fa-bell fa-xl mx-1'></i>
          </Badge>
        </button>
        <Dropdown menu={{ items }} placement='bottomLeft'>
          <button>
            <i className='fa-solid fa-user fa-xl mx-6'></i>
          </button>
        </Dropdown>
      </Space>
      <Drawer
        size='default'
        title={
          <span>
            <i className='fa-solid fa-bell fa-md mx-2'></i>Thông báo
          </span>
        }
        placement='right'
        onClose={onClose}
        open={open}
      >
        {notification.length > 0 ? (
          <List
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  className='px-3 hover:bg-gray-100 mb-1'
                  title={
                    <Link
                      key={index}
                      className='border-b-4 link-title'
                      onClick={onClose}
                      to={`/${urlRouter.ADMIN}/${urlRouter.NOTIFICATION}`}
                    >
                      <div className='flex justify-between'>
                        <div>
                          <div className='text-base'>{item?.nameroom}</div>
                          <span className='text-xs text-gray-500'>{item?.datenotification}</span>
                        </div>
                        <span className='text-red-400'>Chưa xử lý</span>
                      </div>
                    </Link>
                  }
                  description={
                    <Link
                      key={index}
                      className='border-b-4 link-title'
                      onClick={onClose}
                      to={`/${urlRouter.ADMIN}/${urlRouter.NOTIFICATION}`}
                    >
                      <p>{item?.content}</p>
                    </Link>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div className='text-center'>
            <Link className='' onClick={onClose} to={`/${urlRouter.ADMIN}/${urlRouter.NOTIFICATION}`}>
              Danh sách thông báo
            </Link>
          </div>
        )}
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
