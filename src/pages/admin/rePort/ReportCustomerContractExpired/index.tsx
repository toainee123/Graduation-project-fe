import React from 'react';
import { DatePicker, Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const dataSource = [] as any;

const columns = [
  {
    title: 'Họ tên khách',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Điện thoại',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Nhà',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Thuê phòng',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số HĐ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ngày kí',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ngày hết hạn HĐ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số ngày còn lại',
    dataIndex: 'address',
    key: 'address',
  },
];

const ReportCustomerRent = () => {
  return (
    <div className='es-container'>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Danh sách khách sắp hết hợp đồng (trong vòng 30 ngày)</strong>
          </h2>
        </div>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <div className='flex w-full mt-5 items-center'>
          <div className='flex-item'>
            <label className='text-base font-semibold mr-3 '>Nhà</label>
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
          <div>
            <label className='text-base font-semibold mr-3 '>Phòng</label>
            <Select
              defaultValue='Phòng'
              style={{ width: 200 }}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'Tất cả', label: 'Tất cả' },
                { value: 'Yiminghe', label: 'yiminghe' },
              ]}
            />
          </div>
          <div className='ms-6'>
            <div className='flex  w-full  items-center '>
              <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5  px-4 pt-4 rounded flex items-center justify-between'>
                <SearchOutlined className='icon-btn' /> Xem
              </button>
            </div>
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
