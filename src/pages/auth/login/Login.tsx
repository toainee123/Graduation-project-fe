import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { fetchLogin, selectFetchUserLoading, selectUserRole } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { urlRouter } from '../../../utils/constants';
import { dialogActions } from '../../../features/dialog/dialogSlice';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

type Props = {};

const Login = (props: Props) => {
  // const role = useAppSelector(selectUserRole)
  const role = useAppSelector(selectUserRole);
  const loading = useAppSelector(selectFetchUserLoading);
  const [messageFail, setMessageFail] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(fetchLogin(values))
      .unwrap()
      .then((resp) => { })
      .catch((error) => {
        console.log(error);
        setMessageFail(true);
      });
  };

  return (
    <div>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div className='flex flex-col gap-4 mb-4'>

          <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
            <Input size='large' prefix={<MailOutlined />} placeholder='Email' className='inputAuth' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password
              size='large'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Mật khẩu'
              className='inputAuth'
            />
          </Form.Item>

          {messageFail && <span className='text-red-500'>Thông tin đăng nhập không chính xác!</span>}
        </div>
        <div className="my-2">
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Nhớ mật khẩu</Checkbox>
            </Form.Item>

            <Link to='/auth/forgot-password' className='float-right'>
              Quên mật khẩu
            </Link>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type='primary' size='large' shape='round' htmlType='submit' className='w-full'>
            ĐĂNG NHẬP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
