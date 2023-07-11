import React from 'react'
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const Register = () => {
    const validateMessages = {
        required: '${name} không được bỏ trống',
        types: {
            email: 'Email không đúng định dạng email',
            regexp: '${name} không đúng định dạng số điện thoại',
        },
    };

    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <div>
            <Form
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item name='name' rules={[{ required: true, message: "Tên người dùng không được bỏ trống" }]}>
                    <Input size='large' prefix={<UserOutlined />} placeholder="Tên người dùng" />
                </Form.Item>
                <Form.Item name='email' rules={[{ required: true, message: "Email không được bỏ trống" }, { type: 'email' }]}>
                    <Input size='large' prefix={<MailOutlined />} placeholder='Email' />
                </Form.Item>
                <Form.Item name='phoneNumber' rules={[{ required: true, message: "Số điện thoại không được bỏ trống" }]}>
                    <Input size='large' prefix={<PhoneOutlined />} placeholder='Số điện thoại' />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[{ required: true, message: "Mật khẩu không được bỏ trống" }]}
                >
                    <Input.Password
                        size='large'
                        prefix={<LockOutlined />}
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" size='large' shape='round' htmlType="submit" className='w-full'>
                        ĐĂNG KÝ
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register