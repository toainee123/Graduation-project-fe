import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

type dataList = {
  key: string;
  home: string;
  room: number;
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
];

export const RoomAvailability = () => {
  const [dataSource, setDataSource] = useState<dataList[]>([
    {
      key: '1',
      home: 'Mike',
      room: 32,
    },
    {
      key: '2',
      home: 'John',
      room: 42,
    },
  ]);
  return (
    <div className=' '>
      <h1>Danh sách phòng trống</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />;
      </div>
    </div>
  );
};
