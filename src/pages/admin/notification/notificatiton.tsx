import React, { useEffect, useState } from 'react'
import { Select, Switch, Table, Tag } from 'antd';
import { getNotification } from 'src/api/dashboard';
import moment from 'moment';
const Notificatiton = () => {
    const [notification, setNotification] = useState([])
    useEffect(() => {
        const getAllNotifi = async () => {
            const { data } = await getNotification()
            setNotification(data)
        }
        getAllNotifi()
    }, [])

    const dataSource = notification.map((item: any, index: number) => {
        return {
            key: index,
            nameroom: item?.nameroom,
            status: item?.status ? (<Tag style={{ width: '100%', textAlign: 'center' }} color="#87d068">Đã được xử lý</Tag>) : (
                <Select
                    defaultValue="Chưa được xử lý"
                    style={{ width: '100%' }}
                    options={[
                        { value: 'true', label: 'Đã được xử lý' },
                        { value: 'false', label: 'Chưa được xử lý' },
                    ]}
                />
            ),
            datenotification: moment(item?.datenotification).format("HH:MM | DD-MM-YYYY"),
            content: item?.content
        }
    })
    const columns = [
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
            sorter: (a: any, b: any) => {
                return a.status === b.status ? 0 : a.status ? 1 : -1;
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'datenotification',
            key: 'datenotification',
            width: 300

        },
    ];

    return (
        <div>
            <div className='title_page'>
                <h1>thông báo</h1>
            </div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}

export default Notificatiton