import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

type dataList = {
  key: string;
  home: string;
  room: number;
  content: string;
  date: string;
};

const columns: ColumnsType<dataList> = [
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
  },
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
    title: 'Nội dung',
    dataIndex: 'content',
    key: 'content',
  },
];

export const UnfinishedWorkTable = () => {
  const [dataSource, setDataSource] = useState<dataList[]>([
    {
      key: '1',
      date: '30-04-2023',
      home: 'Phòng 1',
      room: 32,
      content: 'Mike',
    },
    {
      key: '2',
      date: '30-04-2023',
      home: 'Phòng 1',
      room: 32,
      content: 'Mike',
    },
    {
      key: '3',
      date: '30-04-2023',
      home: 'Phòng 1',
      room: 32,
      content: 'Mike',
    },
    {
      key: '4',
      date: '30-04-2023',
      home: 'Phòng 1',
      room: 32,
      content: 'Mike',
    },
  ]);
  return (
    <div className=' '>
      <h1>Công việc chưa hoàn thành</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />
      </div>
    </div>
  );
};
