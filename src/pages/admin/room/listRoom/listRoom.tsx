import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd';
import * as XLSX from 'xlsx-js-style';
import { CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getAllRoom } from 'src/api/room';

const ListMember = () => {
    const [listRoom, setListRoom] = useState<any>([]);
    const [analyticRoom, setAnalyticRoom] = useState<any>();

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getAllRoom();
            setListRoom(data);
            setAnalyticRoom(data.room);
        };
        fetchRoom();
    }, []);

    const dataSource = listRoom?.map((item: any, i: any) => {
        return {
            key: i,
            roomNumber: item.nameroom,
            Area: item.namehouse,
            price: new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(item?.price),
        }
    });

    const uniqueDataSource = dataSource.filter(
        (item: any, index: any, self: any) =>
            index === self.findIndex((i: any) => i.Area === item.Area)
    );

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
            filters: uniqueDataSource?.map((item: any, i: any) => {
                return {
                    key: i,
                    text: item.Area,
                    value: item.Area,
                }
            }),
            onFilter: (value: any, record: any) => record.Area.startsWith(value),
            filterSearch: true,
        },
        {
            title: <div>Đơn giả</div>,
            dataIndex: 'price',
            key: 'price',
            sorter: (a: any, b: any) => {
                const priceA = parseInt(a.price.replace(/\D/g, ''), 10);
                const priceB = parseInt(b.price.replace(/\D/g, ''), 10);
                return priceA - priceB;
            },
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
    const handleExportToExcel = () => {
        const columnsWithoutKey = columns.filter((column) => column.dataIndex !== 'key');
        const worksheet = XLSX.utils.json_to_sheet(dataSource);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        XLSX.writeFile(workbook, 'data-house.xlsx');
        console.log("click");
    };
    return (
        <div>
            <div>
                <div className="title_page">
                    <h1>danh sách phòng </h1>
                </div>
                <div className='float-right'>

                    <button onClick={() => handleExportToExcel()} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm px-3 py-1.5 ml-2 "><i className="fa-sharp fa-solid fa-file-excel"></i> Xuất file excel</button>
                </div>
            </div>
            <Table dataSource={dataSource}
                columns={columns}
            />
        </div>
    )
}

export default ListMember