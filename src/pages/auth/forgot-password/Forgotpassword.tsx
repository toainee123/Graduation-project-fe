import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../../layout/authLayout/authLayout.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import authApi from 'src/api/auth';

type Props = {};

const Forgotpassword = (props: Props) => {
  const [form] = Form.useForm();
  const onFinish = async (value: any) => {
    try {
      const res: any = await authApi.forgetpassw(value);
      if (res.status === 'success') {
        toast.success('Có 1 email chứa link khôi phục password của bạn, vui lòng kiểm tra');
      }
    } catch (error: any) {
      console.log(error.message);
      toast.success('Không thành công!!');
    }
  };
  return (
    <section className='bg-white-50 dark:bg-white-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl '>
              Vui lòng điền email của bạn vào
            </h1>
            <Form className='space-y-4 md:space-y-6' action='#' layout='vertical' form={form} onFinish={onFinish}>
              <div>
                <Form.Item name='email' label='Email' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </div>
              <Button block type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Forgotpassword;
