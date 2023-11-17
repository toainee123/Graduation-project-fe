import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table, TableProps, Form, Input, DatePickerProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getListReportCustomerRent, getListReportInvoiceDetail } from 'src/api/report';
import { REPORT_TYPE } from 'src/types/report';
import { convertDateFilter } from 'src/utils/helps';
import moment from 'moment';

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
    key: 'priceroom',
    render(_, record, _index) {
      return Number(record.priceroom).toLocaleString('VND');
    },
  },
  {
    title: 'Tiền điện',
    key: 'priceelectricity',
    render(_, record, _index) {
      return Number(record.priceelectricity).toLocaleString('VND');
    },
  },
  {
    title: 'Tiền nước',
    key: 'pricewater',
    render(_, record, _index) {
      return Number(record.pricewater).toLocaleString('VND');
    },
  },
  {
    title: 'Dịch vụ khác',
    key: 'priceservice',
    render(_, record, _index) {
      return Number(record.priceservice).toLocaleString('VND');
    },
  },
  {
    title: 'Nợ tháng trước',
    key: 'owedold',
    render(_, record, _index) {
      return Number(record.owedold).toLocaleString('VND');
    },
  },
  {
    title: 'Tổng tiền(VNĐ)',
    key: 'totalbill',
    // dataIndex: 'totalbill',

    render(_, record, _index) {
      return Number(record.totalbill).toLocaleString('VND');
    },
  },
];
type TSearchFormValues = {
  houseId: string;
  roomId: string;
  date: string;
};

const ReportInvoiceDetail = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataHouse, setDataHouse] = useState([]);
  const [form] = Form.useForm<TSearchFormValues>();
  const [roomid, setRoomid] = useState('');
  const [houseid, setHouseid] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const getData = async () => {
      const timeNow = moment().format('YYYY-MM');
      const { data } = await getListReportInvoiceDetail({ date: timeNow });
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
  console.log('data', dataHouse);

  const DateToOnChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateTo(dateString);
  };

  const handleSubmitSearch = async (values: TSearchFormValues) => {
    console.log(values);
    const value = {
      date: dateTo && convertDateFilter(dateTo),
      houseId: values.houseId,
    };
    if (value) {
      const { data } = await getListReportInvoiceDetail(value);
      setDataSource(data);
    } else {
      const { data } = await getListReportInvoiceDetail({});
      setDataSource(data);
    }
  };

  const initValueFormFilter = {
    date: moment(),
  };
  return (
    <div className='es-container'>
      <div className='title_page'>
        <h1>Chi tiết hóa đơn theo tháng</h1>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <Form form={form} initialValues={initValueFormFilter} onFinish={handleSubmitSearch}>
          <div className='flex w-full mt-5 items-center'>
            <div className='mr-2'>
              <Form.Item name='date' label='Chọn ngày tháng'>
                <DatePicker
                  picker='month'
                  onChange={DateToOnChange}
                  // format='YYYY-MM-DD'
                  placeholder='Chọn ngày từ...'
                />
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
