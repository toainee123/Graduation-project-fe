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
    title: 'Từ ngày',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Đến ngày',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ngày hết hạn HĐ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Đơn giá(VNĐ)',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tiền cọc(VNĐ)',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tổng tiền phí(VNĐ)',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Đã trả(VNĐ)',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Còn lại(VNĐ)',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Người giới thiệu',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Ngày sinh',
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
            <strong>Danh sách khách thuê phòng</strong>
          </h2>
        </div>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <div className='flex  w-full mt-5 items-center'>
          <div className='flex-item'>
            <label className='text-base font-semibold mr-4  '>Ngày thuê</label>
            <RangePicker placeholder={['từ ngày', 'đến ngày']} />
          </div>
          <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5  px-4 pt-2 rounded flex items-center justify-between'>
            <SearchOutlined className='icon-btn' /> Xem
          </button>
        </div>
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
          <div>
            <label className='text-base font-semibold mr-2 '>Trạng thái</label>
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
        </div>
      </div>
      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />;
      </div>
    </div>
  );
};

export default ReportCustomerRent;
