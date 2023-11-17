import React, { useEffect } from 'react';
import './electricity.scss';
import { Button, DatePicker, Form, Input, Popconfirm, Space, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';
import { format } from 'path';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getListIndexElec, getListIndexElecUser } from 'src/features/electricity/electricitySlice';
type Props = {};

const Electricity = (props: Props) => {
  const [form] = Form.useForm();
  const date = new Date();
  const dateJ = dayjs(date).format(' YYYY-MM');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListIndexElecUser(dateJ));
  }, []);

  const dt = useAppSelector((state) => state.electricity.value);
  console.log(dt);

  const dataSource: any = dt.map((item: any) => {
    return {
      key: item.id,
      id: item.id,
      room: item.nameroom,
      indexOld: item.indexOld,
      indexNew: item.index,
      used: item.index - item.indexOld,
    };
  });
  const columns: any = [
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
      align: 'center',
    },
    {
      title: 'Chỉ số cũ',
      dataIndex: 'indexOld',
      align: 'center',
      key: 'indexOld',
    },
    {
      title: 'Chỉ số mới',
      dataIndex: 'indexNew',
      align: 'center',
      key: 'indexNew',
    },
    {
      title: 'Chỉ số điện sử dụng',
      align: 'center',
      dataIndex: 'used',
      key: 'used',
    },
  ];
  const onFinish = (value: any) => {
    const dateFilter = moment(value.dateFilter).format(' YYYY-MM');
    console.log(dateFilter);

    dispatch(getListIndexElecUser(dateFilter));
  };

  const initValueCacula = {
    dateFilter: moment(),
  };
  return (
    <div>
      <div className='title_page'>
        <h1>chỉ số điện </h1>
      </div>
      <Space className='fillter mb-4'>
        <Form className='form-search' form={form} onFinish={onFinish} initialValues={initValueCacula}>
          <Form.Item name='dateFilter' rules={[{ required: true }]}>
            <DatePicker picker='month' />
          </Form.Item>
          <Button htmlType='submit' type='primary'>
            Tìm kiếm
          </Button>
        </Form>
      </Space>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Electricity;
