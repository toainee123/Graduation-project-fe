import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Button, Table, Form, Input } from 'antd';
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

type TSearchFormValues = {
  houseid: string;
  roomid: string;
};

const ReportCustomerContractExpired = () => {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm<TSearchFormValues>();
  const [roomid, setRoomid] = useState('');
  const [houseid, setHouseid] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data } = await getListReportCustomerContractExpired({ roomId: roomid, houseId: houseid });
      setDataSource(data.responses);
    };
    getData();
  }, [roomid, houseid]);

  const handleSubmitSearch = (values: TSearchFormValues) => {
    setHouseid(values.houseid);
    setRoomid(values.roomid);
  };
  return (
    <div>
      <div className='title_page'>
        <h1>Danh sách khách sắp hết hợp đồng (trong vòng 30 ngày) </h1>
      </div>

      {/* filter */}
      <div className='filter'>
        {' '}
        <Form form={form} onFinish={handleSubmitSearch}>
          <div className='flex w-full mt-5 items-center'>
            <div className='flex-item'>
              <Form.Item name='houseid' label='Nhà'>
                <Select
                  style={{ width: 200 }}
                  allowClear
                  options={dataSource.map((item: any) => ({
                    label: item.namehouse,
                    value: item.houseid,
                  }))}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name='roomid' label='Phòng'>
                <Input />
              </Form.Item>
            </div>
            <div className='ms-6'>
              <div className='flex  w-full  items-center '>
                <Button
                  className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5  px-4  rounded flex items-center justify-between'
                  htmlType='submit'
                >
                  <SearchOutlined className='icon-btn' /> Xem
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className='mt-5'>
        <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />
      </div>
    </div>
  );
};

export default ReportCustomerContractExpired;
