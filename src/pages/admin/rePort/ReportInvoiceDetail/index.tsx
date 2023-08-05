import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table, TableProps, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getListReportCustomerRent, getListReportInvoiceDetail } from 'src/api/report';
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
type TSearchFormValues = {
  houseId: string;
  roomId: string;
};

const ReportInvoiceDetail = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataHouse, setDataHouse] = useState([]);
  const [form] = Form.useForm<TSearchFormValues>();
  const [roomid, setRoomid] = useState('');
  const [houseid, setHouseid] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await getListReportInvoiceDetail();
      setDataSource(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getList = async () => {
      const { data } = await getListReportCustomerRent();
      setDataHouse(data.responses);
    };
    getList();
  }, []);
  const handleSubmitSearch = async (values: TSearchFormValues) => {
    console.log(values);

    if (values) {
      const { data } = await getListReportInvoiceDetail(values);
      setDataSource(data);
    }
  };
  return (
    <div className='es-container'>
      <div className='title_page'>
        <h1>Chi tiết hóa đơn theo tháng</h1>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <Form form={form} onFinish={handleSubmitSearch}>
          <div className='flex w-full mt-5 items-center'>
            <div className='mr-2'>
              <Form.Item name='roomId' label='Phòng'>
                <Input />
              </Form.Item>
            </div>
            <div className='mr-2'>
              <Form.Item name='houseId' label='Nhà'>
                <Select
                  style={{ width: 200 }}
                  allowClear
                  options={dataHouse.map((item: any) => ({
                    label: item.namehouse,
                    value: item.houseid,
                  }))}
                />
              </Form.Item>
            </div>

            <Button color='primary' htmlType='submit'>
              Tìm
            </Button>
          </div>
        </Form>
      </div>
      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />;
      </div>
    </div>
  );
};

export default ReportInvoiceDetail;
