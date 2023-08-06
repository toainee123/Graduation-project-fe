import React, { useEffect, useState } from 'react'
import "./listMember.scss"

import { Select, Space, Table, Tag } from 'antd';
import * as XLSX from 'xlsx-js-style';
import { CloseCircleFilled, EditFilled, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { apiGetHostMember } from 'src/api/room';
import { urlRouter } from 'src/utils/constants';

const ListMember = () => {
    const [list, setList] = useState<any>([])

    useEffect(() => {
        const getHostMember = async () => {
            const { data } = await apiGetHostMember()
            setList(data)
        }
        getHostMember()
    }, [])
    console.log(list);

    const dataSource = list.map((item: any, i: number) => {
        return {
            key: i,
            roomNumber: item.nameroom,
            Area: item.namehouse,
            Name: item.name,
            phoneNumber: item.phone,
            dayStart: moment(item.date).format('DD/MM/YYYY'),
            roomFee: Number(item.price).toLocaleString('VND'),
            deposits: Number(item.deposit).toLocaleString('VND'),
            role: <Tag color="green">Host</Tag>,
            action: <Link to={`/admin/${urlRouter.ROOM}/${urlRouter.VIEW_MEMBER_IN_ROOM}/${item.roomid}?key=view`} target='_blank'>
                <EyeOutlined className="color-green action-table" />
            </Link>
        }
    })
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
            title: <div>Vai trò</div>,
            dataIndex: 'role',
            key: 'role',
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
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
    return (
        <div>
            <div>
                <div className="title_page">
                    <h1>Khách Thuê</h1>
                </div>
                <div className='float-right mb-3'>
                    <span className='font-bold'>Khu vực: </span>
                    <Select
                        style={{ width: 120 }}
                        defaultValue="tất cả"
                        onChange={handleChange}
                        options={list?.map((item: any, i: number) => ({
                            key: i,
                            value: item.houseid,
                            label: item.namehouse
                        }))}
                    />
                    <button onClick={() => handleExportToExcel()} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm px-3 py-1.5 ml-2 "><i className="fa-sharp fa-solid fa-file-excel"></i> Xuất file excel</button>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default ListMember