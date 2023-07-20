import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getListReportCustomerRent } from 'src/api/report';
import moment from 'moment';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Họ tên khách',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Nhà',
    dataIndex: 'namehouse',
    key: 'namehouse',
  },
  {
    title: 'Thuê phòng',
    dataIndex: 'nameroom',
    key: 'namehouse',
  },
  {
    title: 'Thuê ngày',
    dataIndex: 'date',
    key: 'date',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },
  {
    title: 'Tiền Nhà(VNĐ)',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Dịch Vụ(VNĐ)',
    dataIndex: 'priceservice',
    key: 'priceservice',
  },
  {
    title: 'Tổng tiền(VNĐ)',
    dataIndex: 'price',
    key: 'price',
  },
];

const ReportCustomerRent = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const { data } = await getListReportCustomerRent();
      setDataSource(data.responses);
    };
    getList();
  }, []);
  return (
    <div className='es-container'>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Danh sách khách Đang thuê phòng</strong>
          </h2>
        </div>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <div className='flex w-full mt-5 items-center'>
          <div className='mr-2'>
            <label className='text-base font-semibold mr-4 '>Nhà</label>
            <Select
              defaultValue='Tất cả'
              style={{ width: 200 }}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'Tất cả', label: 'Tất cả' },
                { value: 'Yiminghe', label: 'yiminghe' },
              ]}
            />
          </div>
          <div className='mr-2'>
            <label className='text-base font-semibold mr-4 '>Phòng</label>
            <Select
              defaultValue='phòng'
              style={{ width: 200 }}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'Tất cả', label: 'Tất cả' },
                { value: 'Yiminghe', label: 'yiminghe' },
              ]}
            />
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />;
      </div>
    </div>
  );
};

export default ReportCustomerRent;
