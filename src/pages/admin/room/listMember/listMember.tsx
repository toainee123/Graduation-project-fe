import React from 'react'
import "./listMember.scss"

import { Select, Space, Table } from 'antd';
import * as XLSX from 'xlsx-js-style';
import { CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'

const dataSource = [
    {
        key: '1',
        roomNumber: '1',
        Area: 32,
        Name: 'Nguyễn Văn A',
        phoneNumber: 463954263,
        dayStart: moment('2023-05-28T05:50:51.077Z').format('DD/MM/YYYY'),
        roomFee: '2.000.000',
        deposits: '0',
        paymentTerm: "3 tháng"
    },
    {
        key: '2',
        roomNumber: '2',
        Area: 2,
        Name: 'Nguyễn Văn B',
        phoneNumber: 405930323,
        dayStart: moment('2023-05-28T05:50:51.077Z').format('DD/MM/YYYY'),
        roomFee: '2.000.000',
        deposits: '0',
        paymentTerm: "3 tháng"
    },
];

const columns = [
    {
        title: <div>Phòng số</div>,
        dataIndex: 'roomNumber',
        key: 'roomNumber',
    },
    {
        title: <div>Khu vực</div>,
        dataIndex: 'Area',
        key: 'Area',
    },
    {
        title: <div>Họ tên</div>,
        dataIndex: 'Name',
        key: 'Name',
    },
    {
        title: <div>Số điện thoại</div>,
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: <div>Ngày bắt đầu</div>,
        dataIndex: 'dayStart',
        key: 'dayStart',
    },
    {
        title: <div>Tiền phòng</div>,
        dataIndex: 'roomFee',
        key: 'roomFee',
    },
    {
        title: <div>Đặt cọc</div>,
        dataIndex: 'deposits',
        key: 'deposits',
    },
    {
        title: <div>Kì thanh toán</div>,
        dataIndex: 'paymentTerm',
        key: 'paymentTerm',
    },
    {
        title: 'Action',
        key: 'action',
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

const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, 'data-member.xlsx');
    console.log("click");
};
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const ListMember = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div>
                <div className="title_page">
                    <h1>Khách Thuê</h1>
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
                    <button onClick={() => handleExportToExcel()} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm px-3 py-1.5 ml-2 "><i className="fa-sharp fa-solid fa-file-excel"></i> Xuất file excel</button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ListMember