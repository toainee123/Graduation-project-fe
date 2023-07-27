import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import authApi from 'src/api/auth';

const Register = () => {
  const validateMessages = {
    required: '${name} không được bỏ trống',
    types: {
      email: 'Email không đúng định dạng email',
      regexp: '${name} không đúng định dạng số điện thoại',
    },
  };

  const onFinish = async (values: any) => {
    const dataRegister = {
      name: values.name,
      email: values.email,
      role: 'ADMIN',
      password: values.password,
    };

    try {
      await authApi.register(dataRegister);
      toast.success('Đăng kí thành công');
    } catch (error: any) {
      console.log(error?.response?.data.message);
      if (error?.response?.data.message === 'Email đã tồn tại') {
        toast.error('Email đã tồn tại');
      } else {
        toast.error('Đăng kí không thành công');
      }
    }
  };
  return (
    <div>
      <Form name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
        <div className='flex flex-col gap-5 mb-8'>
          <Form.Item name='name' rules={[{ required: true, message: 'Tên người dùng không được bỏ trống' }]}>
            <Input size='large' prefix={<UserOutlined />} placeholder='Tên người dùng' />
          </Form.Item>
          <Form.Item name='email' rules={[{ required: true, message: 'Email không được bỏ trống' }, { type: 'email' }]}>
            <Input size='large' prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Mật khẩu không được bỏ trống' }]}>
            <Input.Password size='large' prefix={<LockOutlined />} placeholder='Mật khẩu' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' size='large' shape='round' htmlType='submit' className='w-full'>
              ĐĂNG KÝ
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Register;
