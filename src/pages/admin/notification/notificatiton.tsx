import React, { useEffect, useState } from 'react'
import { Form, Modal, Select, Switch, Table, Tag } from 'antd';
import { getNotification, updateNotification } from 'src/api/dashboard';
import moment from 'moment';
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
            const { data } = await getNotification()
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
            content: item?.content
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
            const { data } = await getNotification()
            setNotification(data)
        }
        getAllNotifi()

    }
    return (
        <div>
            <div className='title_page'>
                <h1>thông báo</h1>
            </div>
            <Modal
                centered
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
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default Notificatiton