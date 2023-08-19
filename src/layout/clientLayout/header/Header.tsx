import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Form, Input, Layout, Modal, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthSliceAction } from 'src/features/auth/authSlice';
import { useAppDispatch } from 'src/store/hooks';
import { urlRouter } from 'src/utils/constants';

type Props = {};

const { Header } = Layout;

const HeaderComponent = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    dispatch(AuthSliceAction.logout());
    navigate('/lading-page');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
      key: '2',
      label: (
        <a target='_blank' onClick={showModal}>
          Đổi mật khẩu
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target='_blank' onClick={logout}>
          Đăng xuất
        </a>
      ),
    },
  ];

  return (
    <Header>
      <Space wrap style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Dropdown menu={{ items }} placement='bottomLeft'>
          <Button icon={<UserOutlined />}></Button>
        </Dropdown>
      </Space>
      <Modal title='Đổi mật khẩu' open={isModalOpen} onOk={onFinish} onCancel={handleCancel}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Mật khẩu cũ'
            name='username'
            rules={[{ required: true, message: 'Điền mật khẩu cũ của bạn!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Mật khẩu mới'
            name='password'
            rules={[{ required: true, message: 'Điền mặt khẩu mới của bạn!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
