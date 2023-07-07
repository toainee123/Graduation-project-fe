import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

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
    dataIndex: 'home',
    key: 'home',
  },
  {
    title: 'Phòng',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Khách',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Tháng',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'Số tiền (VNĐ)',
    dataIndex: 'money',
    key: 'money',
    render: (value: number) => value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }),
  },
];

const OweRoomMoneyList = () => {
  const [dataSource, setDataSource] = useState<dataList[]>([
    {
      key: '1',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      month: 2,
      money: 1000000,
    },
    {
      key: '2',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      month: 2,
      money: 1000000,
    },
    {
      key: '3',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      month: 2,
      money: 1000000,
    },
    {
      key: '4',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      month: 2,
      money: 1000000,
    },
  ]);
  return (
    <div className=' '>
      <h1>Danh sách Khách nợ tiền phòng</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />;
      </div>
    </div>
  );
};

export default OweRoomMoneyList;
