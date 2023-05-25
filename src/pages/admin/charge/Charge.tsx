import React, { useEffect, useState } from 'react';
import './charge.scss';
import type { ColumnsType } from 'antd/es/table';
import {
  CalculatorOutlined,
  DeleteOutlined,
  DollarOutlined,
  EyeOutlined,
  FileExcelOutlined,
  MailOutlined,
  MoneyCollectOutlined,
  PrinterOutlined,
  RedoOutlined,
  SaveOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { DatePicker, Select, Table, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { get } from 'http';
import { getCharge } from 'src/features/charge/chargeSlice';
type Props = {};

const Charge = (props: Props) => {
  const { Text } = Typography;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCharge());
  }, []);
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  console.log(selectedRow);

  const chargeData = useAppSelector((state) => state.charge.value);

  const dataSource = chargeData.map((item: any, index: number) => {
    return {
      key: index,
      month: item.month,
      year: item.year,
      ky: item.ky,
      house: item.house,
      room: item.room,
      user: item.user,
      tien: item.tien,
      tiendatra: item.tiendatra,
      tienconlai: item.tien - item.tiendatra,
    };
  });

  const columns: ColumnsType<any> = [
    {
      title: '',
      key: 'Action',
      render: () => {
        return (
          <div className='flex flex justify-center items-center'>
            <button className=' flex justify-center items-center bg-blue-500 text-white p-1 rounded mx-1'>
              <EyeOutlined />
            </button>
            <button className=' flex justify-center items-center bg-emerald-500 text-white p-1 rounded mx-1'>
              <DollarOutlined />
            </button>

            <button className=' flex justify-center items-center bg-red-500 text-white p-1 rounded mx-1'>
              <DeleteOutlined />
            </button>

            <button className=' flex justify-center items-center bg-cyan-500 text-white p-1 rounded mx-1'>
              <PrinterOutlined />
            </button>
          </div>
        );
      },
    },
    {
      title: 'House',
      key: 'House',
      dataIndex: 'house',
    },
    {
      key: 'House',
      title: 'Room',
      dataIndex: 'room',
    },
    {
      title: 'User',
      key: 'User',
      dataIndex: 'user',
    },

    {
      title: 'Số tiền (VNĐ)',
      key: 'Tien',
      dataIndex: 'tien',
      render: (record) => {
        return <Text>{Number(record).toLocaleString('VND')}</Text>;
      },
    },

    {
      title: 'Đã trả (VNĐ)',
      key: 'tiendatra',
      dataIndex: 'tiendatra',
      render: (record) => {
        return <Text>{Number(record).toLocaleString('VND')}</Text>;
      },
    },

    {
      title: 'Còn lại (VNĐ)',
      key: 'tienconlai',
      dataIndex: 'tienconlai',
      render: (record) => {
        return <Text>{Number(record).toLocaleString('VND')}</Text>;
      },
    },
  ];

  return (
    <div className='es-container'>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Tính tiền</strong>
          </h2>
        </div>

        <div className='title--button flex items-center'>
          <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded '>
            <CalculatorOutlined className='icon-btn' /> Tính
          </button>
          <button className='btn-x bg-cyan-500 hover:bg-cyan-500 text-white font-bold py-2  px-4 rounded'>
            <PrinterOutlined className='icon-btn' /> In
          </button>

          <button className='btn-x bg-blue-600 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded'>
            <FileExcelOutlined className='icon-btn' /> Xuất file excel
          </button>

          <button className='btn-x bg-orange-400 hover:bg-orange-400 text-white font-bold py-2  px-4 rounded'>
            <PrinterOutlined className='icon-btn' /> In danh sách
          </button>

          <button className='btn-x  bg-teal-500 hover:bg-teal-500 text-white font-bold py-2  px-4 rounded'>
            <MoneyCollectOutlined className='icon-btn' /> Thu tiền
          </button>

          <button className='btn-x bg-teal-500 hover:bg-teal-500  text-white font-bold py-2  px-4 rounded'>
            <MailOutlined className='icon-btn' /> Email
          </button>

          <button className='btn-x bg-red-800 hover:bg-red-800 text-white font-bold py-2  px-4 rounded'>
            <DeleteOutlined className='icon-btn' /> Xoá
          </button>
        </div>
      </div>

      {/* filter */}
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
          <div className='btn-view'>
            <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5  px-4 rounded flex items-center justify-between'>
              <SearchOutlined className='icon-btn' /> Xem
            </button>
          </div>
        </div>
        <div className='note mt-5'>
          <p>
            <strong>Lưu ý:</strong>
            <br />
            - Bạn phải thực hiện việc "Thêm khách" ở chức năng "Phòng" và gán các dịch vụ cho khách thuê trước khi tính
            tiền.
            <br />- Nếu có bất kỳ thay đổi liên quan đến tiền nhà tháng đang tính (ví dụ: thay đổi cs điện, nước, đơn
            giá phòng, ngày vào, giá dịch vụ, ...) thì bạn phải tính tiền lại cho tháng đó.
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          onChange(selectedRowKeys, selectedRows, info) {
            setSelectedRow(selectedRows);
          },
        }}
        dataSource={dataSource}
        className='table-data mt-4'
        summary={(pageData) => {
          let tongtien = 0;
          let ttiendatra = 0;
          let ttienconlai = 0;
          pageData.forEach((item) => {
            tongtien += +item.tien;
            ttiendatra += +item.tiendatra;
            ttienconlai += item.tienconlai;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={5}>
                Total
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text type='danger'>{tongtien.toLocaleString('VND')}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text>{ttiendatra.toLocaleString('VND')}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text>{ttienconlai.toLocaleString('VND')}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
};

export default Charge;
