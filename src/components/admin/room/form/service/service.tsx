import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Table, } from 'antd';
import React, { useEffect, useState } from 'react'
import { getListService } from 'src/api/service';

const Service = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const ListService = async () => {
            const { data } = await getListService();
            setList(data.responses);
        };
        ListService();
    }, []);
    const dataSource = list.map((item: any, i: number) => {
        return {
            key: i,
            name: item.name,
            price: new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(+item?.price)
        }
    })

    const columns = [
        {
            title: 'Chọn',
            dataIndex: 'actions',
            render: (_: any, record: any) => (
                <Checkbox />
            ),
            width: 10,
        },
        {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            width: 550
        },
    ];

    return (
        <>
            <div className='description'>
                <strong>Lưu ý:</strong>
                <p>
                    Vui lòng chọn dịch vụ cho khách thuê. Nếu khách có chọn dịch vụ thì khi tính tiền phòng phần mềm sẽ tự tính các khoản phí vào hóa đơn; ngược lại nếu không chọn phần mềm sẽ bỏ qua.<br />

                </p>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </>
    );
};

export default Service