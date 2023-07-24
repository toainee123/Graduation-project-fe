import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getDashboard } from 'src/api/dashboard';

type dataList = {
  key: string;
  home: string;
  room: number;
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
];

export const RoomAvailability = () => {
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      setDataSource(data.listRoomAvailable);
    };

    getList();
  }, []);
  return (
    <div className=' '>
      <h1>Danh sách phòng trống</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />
      </div>
    </div>
  );
};
