import React from 'react'
import { Button, Form, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';

const Register = () => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} không được bỏ trống',
        types: {
            email: '${label} không đúng định dạng email',
            regexp: '${label} không đúng định dạng số điện thoại',
        },
    };

    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <div>
            <div className='text-center'>
                <label htmlFor='login' style={{ fontSize: '20px', color: 'red' }} >
                    Register
                </label>
            </div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item name={['user', 'name']} label="Tên người dùng" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true }, { type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'phoneNumber']} label="Số điện thoại" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Link to={`/${urlRouter.AUTH}/${urlRouter.LOGIN}`} >bạn đã có tài khoản</Link ><br />
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register