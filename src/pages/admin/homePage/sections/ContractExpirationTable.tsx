import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getDashboard } from 'src/api/dashboard';

type dataList = {
  address: string;
  contractexpir: string;
  expirationdate: string;
  id: number;
  name: string;
  namehouse: string;
  nameroom: string;
  phone: string;
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
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'contractexpir',
    key: 'contractexpir',
  },
];

const ContractExpiration = () => {
  const [dataSource, setDataSource] = useState();
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      setDataSource(data.contractExpire);
    };

    getList();
  }, []);
  // console.log(dataSource);
  return (
    <div className=' '>
      <h1>Khách sắp hết hạn hợp đồng</h1>
      <div className='bg-gray-100'>
        <Table dataSource={dataSource} columns={columns} scroll={{ y: '300px' }} />
      </div>
    </div>
  );
};

export default ContractExpiration;
