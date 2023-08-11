import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table, Form, Input, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getListReportCustomerRent, searchReportCustomer } from 'src/api/report';
import moment from 'moment';
import { transFormData, transFormDataReportCustomRent } from './hooks/transform';

const { RangePicker } = DatePicker;

const columns: TableProps<any>['columns'] = [
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
    title: 'Tiền Nhà',
    key: 'price',
    render(_, record, _index) {
      return (
        Number(record.price).toLocaleString('VND')
      );
    },
  },
  {
    title: 'Dịch Vụ',
    key: 'totalService',
    render(_, record, _index) {
      return (
        Number(record.totalService).toLocaleString('VND')
      );
    },
  },
  {
    title: 'Tổng tiền',
    key: 'total',
    render(_, record, _index) {
      return (
        Number(record.total).toLocaleString('VND')
      );
    },
  },
];

type TSearchFormValues = {
  houseid: string;
  roomid: string;
};

const ReportCustomerRent = () => {
  const [dataSource, setDataSource] = useState<transFormData[]>([]);
  const [form] = Form.useForm<TSearchFormValues>();
  const [roomid, setRoomid] = useState('');
  const [houseid, setHouseid] = useState('');

  useEffect(() => {
    const getList = async () => {
      const { data } = await getListReportCustomerRent({ houseId: houseid, roomId: roomid });
      setDataSource(transFormDataReportCustomRent(data.responses));
    };
    getList();
  }, [houseid, roomid]);

  const handleSubmitSearch = (values: any) => {
    setHouseid(values.houseid);
    setRoomid(values.roomid);

    const result = {
      search: values.search
    }
    if (result) {
      const getList = async () => {
        const { data } = await searchReportCustomer(result);
        setDataSource(transFormDataReportCustomRent(data.responses));
      };
      getList();
    } else {
      const getList = async () => {
        const { data } = await searchReportCustomer({});
        setDataSource(transFormDataReportCustomRent(data.responses));
      };
      getList();
    }
  };
  return (
    <div >
      <div className='title_page'>
        <h1>Danh sách khách Đang thuê phòng </h1>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <Form form={form} onFinish={handleSubmitSearch}>
          <div className='flex w-full mt-5 items-center'>
            <div className='mr-2'>
              <Form.Item name='houseid' label='Nhà'>
                <Select
                  style={{ width: 200 }}
                  allowClear
                  options={dataSource.map((item) => ({
                    label: item.namehouse,
                    value: item.houseid,
                  }))}
                />
              </Form.Item>
            </div>
            <div className='mr-2'>
              <Form.Item name='search' label='Tìm kiếm'>
                <Input placeholder='Tìm phòng...' />
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

export default ReportCustomerRent;
