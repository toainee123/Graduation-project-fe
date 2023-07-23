import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getListReportCustomerContractExpired } from 'src/api/report';
import moment from 'moment';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Họ tên khách',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
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
    key: 'nameroom',
  },
  {
    title: 'Số HĐ',
    dataIndex: 'expirationdate',
    key: 'expirationdate',
  },
  {
    title: 'Ngày kí',
    dataIndex: 'contractdate',
    key: 'contractdate',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },
  {
    title: 'Ngày hết hạn HĐ',
    dataIndex: 'contractexpir',
    key: 'contractexpir',
    render: (value: string) => moment(value).format('DD/MM/YYYY'),
  },
  {
    title: 'Số ngày còn lại',
    dataIndex: 'expiry',
    key: 'expiry',
  },
];

const ReportCustomerContractExpired = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getListReportCustomerContractExpired();
      setDataSource(data.responses);
    };
    getData();
  }, []);
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
              <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5  px-4  rounded flex items-center justify-between'>
                <SearchOutlined className='icon-btn' /> Xem
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />
      </div>
    </div>
  );
};

export default ReportCustomerContractExpired;
