import { useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useChangePasswordUser } from './useChangePasswordUser';

type UserChangepasswordreq = {
  passwordOld: string;
  password: string;
  password_confirmation: string;
};

export const Clientchangepassword = () => {
  const [form] = Form.useForm<UserChangepasswordreq>();
  const { isLoading, changePassWord } = useChangePasswordUser();

  const handleChangePassword = (values: UserChangepasswordreq) => {
    changePassWord(values);
  };

  return (
    <>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Đổi mật khẩu</strong>
          </h2>
        </div>
        <Row>
          <Col span={8}>
            <Button type='primary' htmlType='submit' className='bg-primary'>
              Lưu
            </Button>
          </Col>
        </Row>
      </div>
      <Form form={form} layout='vertical' onFinish={handleChangePassword}>
        <Row className='mb-3'>
          <Col span={24}>
            <Form.Item label='Mật khẩu cũ' name='passwordOld' className='mt-4'>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col span={24}>
            <Form.Item label='Mật khẩu mới' name='password' className='mt-4 '>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col span={24}>
            <Form.Item
              label='Nhập lại mật khẩu mới'
              name='password_confirmation'
              className='mt-4 '
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
