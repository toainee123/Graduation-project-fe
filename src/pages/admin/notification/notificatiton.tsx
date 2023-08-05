import React, { useEffect, useState } from 'react'
import { Collapse, Form, Modal, Select, Table, Tag } from 'antd';
import { getNotification, updateNotification } from 'src/api/dashboard';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

const Notificatiton = () => {
    const [notification, setNotification] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [getId, setGetId] = useState()
    const [form] = Form.useForm()

    const showModal = (id: any) => {
        setIsModalOpen(true);
        setGetId(id)
    };
    useEffect(() => {
        const getAllNotifi = async () => {
            const { data } = await getNotification({})
            setNotification(data)
        }
        getAllNotifi()
    }, [])
    const dataSource = notification.map((item: any, index: number) => {
        return {
            stt: index + 1,
            nameroom: item?.nameroom,
            status: item?.status ? (<Tag onClick={() => showModal(item?.id)} style={{ width: '100%', cursor: "pointer", textAlign: 'center' }} color="#87d068">Đã được xử lý</Tag>) : (
                <Tag onClick={() => showModal(item?.id)} style={{ width: '100%', cursor: "pointer", textAlign: 'center' }} color="#f50">Chưa được xử lý</Tag>
            ),
            datenotification: moment(item?.datenotification).format("HH:MM | DD-MM-YYYY"),
            content: item?.content,
        }
    })
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 50
        },
        {
            title: 'Tên phòng',
            dataIndex: 'nameroom',
            key: 'nameroom',
            width: 250
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 200,
        },
        {
            title: 'Thời gian',
            dataIndex: 'datenotification',
            key: 'datenotification',
            width: 300
        },
    ];

    const onFinish = async (value: any) => {
        const values = {
            value, id: getId
        }
        await updateNotification(values)
        const getAllNotifi = async () => {
            const { data } = await getNotification({})
            setNotification(data)
        }
        getAllNotifi()
    }
    const onFilter = (data: any) => {
        const result = {
            status: data.status
        }
        if (result) {
            const getAllNotifi = async () => {
                const { data } = await getNotification(result)
                setNotification(data)
            }
            getAllNotifi()
        } else {
            const getAllNotifi = async () => {
                const { data } = await getNotification({})
                setNotification(data)
            }
            getAllNotifi()
        }
        console.log("value select", result);
    }
    return (
        <div>
            <div className='title_page'>
                <h1>thông báo</h1>
            </div>
            <div className="my-2">
                <Form onFinish={onFilter}>
                    <div className='flex gap-2 justify-end'>
                        <div className='w-18'>
                            <Form.Item name='status'>
                                <Select
                                    placeholder="-Trạng thái thông báo -"
                                    options={[
                                        {
                                            label: '-Trạng thái-',
                                            options: [
                                                { label: 'Tất cả trạng thái', value: '' },
                                                { label: 'Chưa được xử lý', value: 'false' },
                                                { label: 'Đã được xử lý', value: 'true' },
                                            ],
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item>
                                <button className='btn_search'>
                                    <i className="fa-solid fa-magnifying-glass px-1"></i>
                                    Tìm kiếm
                                </button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            <Modal
                title="Cập nhật trạng thái"
                style={{ width: "100" }}
                open={isModalOpen}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            onFinish(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                    setIsModalOpen(false)
                }}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form
                    form={form}
                >
                    <Form.Item name="status">
                        <Select
                            style={{ width: "150" }}
                            defaultValue="Cập nhật trạng thái"
                        >
                            <Select.Option value="true">Đã xử lý</Select.Option>
                            <Select.Option value="false">Chưa xử lý</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} />
        </div >
    )
}

export default Notificatiton