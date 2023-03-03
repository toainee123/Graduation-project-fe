import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { fetchLogin, selectFetchUserLoading, selectUserRole } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { urlRouter } from '../../utils/constants';
import { dialogActions } from '../../features/dialog/dialogSlice';

type Props = {};

const Login = (props: Props) => {
  // const role = useAppSelector(selectUserRole)
  const role = useAppSelector(selectUserRole);
  const loading = useAppSelector(selectFetchUserLoading)
  const [messageFail, setMessageFail] = useState(false)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(fetchLogin(values))
      .unwrap()
      .then((resp) => {

        if (resp?.user?.role && resp?.user?.role === 'ADMIN') {
          navigate(urlRouter.DASHBOARD);
        }

        if (resp?.user?.role && resp?.user?.role === 'STUDENT') {
          navigate(urlRouter.FORGOT_PASSWORD);
        }
      })
      .catch((error) => {
        console.log(error);
        setMessageFail(true)
      });

  };

  return (
    <div>
      <Form
        name='basic'
        style={{ maxWidth: 500, textAlign: 'center' }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {
          messageFail && (
            <span>Thông tin đăng nhập không chính xác!</span>
          )
        }

        <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
