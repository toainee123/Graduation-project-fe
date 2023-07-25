import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getListReportInvoiceDetail } from 'src/api/report';
import { log } from 'console';
import { REPORT_TYPE } from 'src/types/report';

const { RangePicker } = DatePicker;

const dataSource = [] as any;

const columns: TableProps<REPORT_TYPE>['columns'] = [
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
    title: 'Tên khách',
    dataIndex: 'namecustomer',
    key: 'namecustomer',
  },
  {
    title: 'Tiền phòng',
    dataIndex: 'priceroom',
    key: 'priceroom',
  },
  {
    title: 'Tiền điện',
    dataIndex: 'priceelectricity',
    key: 'priceelectricity',
  },
  {
    title: 'Tiền nước',
    dataIndex: 'pricewater',
    key: 'pricewater',
  },
  {
    title: 'Dịch vụ khác',
    dataIndex: 'priceservice',
    key: 'priceservice',
  },
  {
    title: 'Nợ tháng trước',
    dataIndex: 'owedold',
    key: 'owedold',
  },
  {
    title: 'Tổng tiền(VNĐ)',
    key: 'total',
    render(_, record, _index) {
      return (
        Number(record.priceroom) +
        Number(record.priceelectricity) +
        Number(record.priceservice) +
        Number(record.pricewater) +
        Number(record.owedold)
      );
    },
  },
];

const ReportInvoiceDetail = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getListReportInvoiceDetail();
      setDataSource(data);
    };
    getData();
  }, []);
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

export default ReportInvoiceDetail;
