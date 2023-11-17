import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getDashboard } from 'src/api/dashboard';
import './tablehomepage.scss';

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
    align: 'center',
  },
  {
    title: 'Phòng',
    dataIndex: 'nameroom',
    key: 'nameroom',
    align: 'center',
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
    <div className='table_homepage'>
      <div className='bg-gray-100 mt-4'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: 300 }} bordered />
      </div>
    </div>
  );
};
