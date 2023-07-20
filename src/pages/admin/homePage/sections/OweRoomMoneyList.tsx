import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getDashboard } from 'src/api/dashboard';

type dataList = {
  key: string;
  home: string;
  room: number;
  customer: string;
  month: number;
  money: number;
};

const columns: ColumnsType<dataList> = [
  {
    title: 'Nhà',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Phòng',
    dataIndex: 'namehouse',
    key: 'namehouse',
  },
  {
    title: 'Khách',
    dataIndex: 'namecustomer',
    key: 'namecustomer',
  },
  {
    title: 'Tháng',
    dataIndex: 'date',
    key: 'date',
    render: (value: string) => moment(value).format('MM/YYYY'),
  },
  {
    title: 'Số tiền (VNĐ)',
    dataIndex: 'owed',
    key: 'owed',
    render: (value: number) => value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
  },
];

const OweRoomMoneyList = () => {
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      setDataSource(data.customerOwed);
    };

    getList();
  }, []);
  return (
    <div className=' '>
      <h1>Danh sách Khách nợ tiền phòng</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />
      </div>
    </div>
  );
};

export default OweRoomMoneyList;
