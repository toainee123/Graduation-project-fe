import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import authApi from 'src/api/auth';
type Props = {};

const Createpassword = (props: Props) => {
  const [form] = Form.useForm();
  const myParam = useLocation().search;
  const code = new URLSearchParams(myParam).get('code');
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const res: any = await authApi.creatpassword(code, values);
      if (res.status === 'success') {
        toast.success('Đã đổi mật khẩu, chuyển đến trang đăng nhập sau 2s');
        setTimeout(() => {
          {
            navigate('/auth');
          }
        }, 2000);
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
                <Form.Item name='password' label='Mật khẩu' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name='password_confirmation'
                  label='Nhập lại mật khẩu'
                  rules={[
                    { required: true },
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

export default Createpassword;
