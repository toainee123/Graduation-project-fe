import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getDashboard } from 'src/api/dashboard';
import './tablehomepage.scss';

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
    dataIndex: 'namehouse',
    key: 'namehouse',
  },
  {
    title: 'Phòng',
    dataIndex: 'nameroom',
    key: 'nameroom',
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
    <div className=' table_homepage'>
      <div className='bg-gray-100 mt-4'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: 300 }} pagination={{ pageSize: 50 }} bordered />
      </div>
    </div>
  );
};

export default OweRoomMoneyList;
