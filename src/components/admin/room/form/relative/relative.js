import React, { useState } from 'react';
import { Form, Button, Table, Input, DatePicker, Radio, Space, Popconfirm } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const Relative = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'name']} rules={[{ required: true, message: "Không bỏ trống " }]} >
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'birthday']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <DatePicker />
                </Form.Item>
            ),
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'gender']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <Radio.Group name="radiogroup" size='middle'>
                        <Space direction="horizontal">
                            <Radio value={1} >Nam</Radio>
                            <Radio value={2} >Nữ</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
            ),
        },
        {
            title: 'CCCD/CMTND',
            dataIndex: 'personalId ',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'personalId']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <Input type='number' />
                </Form.Item>
            ),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'address']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'phoneNumber']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <Input type="number" />
                </Form.Item>
            ),
        },
        {
            title: 'Số xe',
            dataIndex: 'vehicleNumber',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'vehicleNumber']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <Input />
                </Form.Item>
            ),
        },
        {
            title: 'Ngày ĐKTT',
            dataIndex: 'bookingDate',
            render: (_, record) => (
                <Form.Item name={['items', record.key, 'bookingDate']} rules={[{ required: true, message: "Không bỏ trống " }]}>
                    <DatePicker />
                </Form.Item>
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <MinusCircleOutlined style={{ color: '#ff0000' }} onClick={() => removeItem(record.key)} />
            ),
        },
    ];

    const addItem = () => {
        const newData = {
            key: data.length,
            name: '',
            birthday: '',
            gender: 0,
            personalId: 0,
            address: '',
            phoneNumber: 0,
            vehicleNumber: '',
            bookingDate: '',
        };
        setData([...data, newData]);
    };

    const removeItem = (key) => {
        const updatedData = data.filter((item) => item.key !== key);
        setData(updatedData);
    };

    const onFinish = (e) => {
        console.log(e);
    }
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                rowKey="key"
                footer={() => (
                    <Form.Item>
                        {data.length > 0 ? (
                            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2 mr-2">
                                <i className="fa-solid fa-check"></i> Lưu</button>
                        ) : (
                            null
                        )}
                        {data.length < 6 ? (
                            <Button type="dashed" onClick={addItem} icon={<PlusOutlined />}>
                            </Button>
                        ) : (
                            null
                        )}
                    </Form.Item>
                )
                }
            />
        </Form >
    );
};
export default Relative