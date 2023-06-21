import React from 'react'

import { Select, Space, Table } from 'antd';
import { CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment'

const dataSource = [
    {
        key: '1',
        roomNumber: '1',
        Area: 32,
        price: '2.000.000',
    },

];

const columns = [
    {
        title: <div>Tên phòng</div>,
        dataIndex: 'roomNumber',
        key: 'roomNumber',
    },
    {
        title: <div>Khu vực</div>,
        dataIndex: 'Area',
        key: 'Area',
    },
    {
        title: <div>Đơn giả</div>,
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: <div>Ghi chú</div>,
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },

    {
        title: 'Action',
        key: 'action',
        width: 100,
        render: () => (
            <Space size="middle">
                <button>
                    <EditFilled className="color-green action-table" />
                </button>
                <Link to={"#"}>
                    <CloseCircleFilled className="color-red action-table" />
                </Link>
            </Space>
        ),
    },
];

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const ListMember = () => {

    return (
        <div>
            <div>
                <div className="title_page">
                    <h1>danh sách phòng </h1>
                </div>
                <div className='float-right'>
                    <span className='font-bold'>Khu vực: </span> <Select
                        style={{ width: 120 }}
                        defaultValue="tất cả"
                        onChange={handleChange}
                        options={dataSource.map((item, i) => {
                            return {
                                key: i, value: `${item.roomNumber}`, label: `${item.roomNumber}`,
                            }
                        })}
                    />
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm px-3 py-1.5 ml-2 "><i className="fa-sharp fa-solid fa-file-excel"></i> Xuất file excel</button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ListMember