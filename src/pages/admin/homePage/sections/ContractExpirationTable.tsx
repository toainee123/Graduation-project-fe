import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

type dataList = {
  key: string;
  home: string;
  room: number;
  customer: string;
  date: string;
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
    title: 'Ngày hết hạn',
    dataIndex: 'date',
    key: 'date',
  },
];

const ContractExpiration = () => {
  const [dataSource, setDataSource] = useState<dataList[]>([
    {
      key: '1',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      date: '30-04-2023',
    },
    {
      key: '2',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      date: '30-04-2023',
    },
    {
      key: '3',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      date: '30-04-2023',
    },
    {
      key: '4',
      home: 'Phòng 1',
      room: 32,
      customer: 'Mike',
      date: '30-04-2023',
    },
  ]);
  return (
    <div className=' '>
      <h1>Khách sắp hết hạn hợp đồng</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />;
      </div>
    </div>
  );
};

export default ContractExpiration;
