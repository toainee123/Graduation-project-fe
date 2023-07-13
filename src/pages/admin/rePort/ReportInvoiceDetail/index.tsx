import React from 'react';
import { DatePicker, Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const dataSource = [] as any;

const columns = [
  {
    title: 'Nhà',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Phòng',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Tên khách',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tiền phòng',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tiền điện',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tiền nước',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Dịch vụ khác',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Thu khác',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Nợ tháng trước',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tổng tiền(VNĐ)',
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
            <strong>Chi tiết hóa đơn theo tháng</strong>
          </h2>
        </div>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <div className='filter'>
          {' '}
          <div className='flex  w-9/12 mt-5 items-center'>
            <div className='flex-item'>
              <label className='text-base font-semibold mr-2 '>Tháng/năm</label>
              <DatePicker />
            </div>
            <div className='flex-item'>
              <label className='text-base font-semibold mr-2 '>Kỳ</label>
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
              <label className='text-base font-semibold mr-2 '>Nhà</label>
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
            <div className='btn-view pt-6'>
              <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4  rounded flex items-center justify-between'>
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
