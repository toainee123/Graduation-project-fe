import React, { useEffect, useState } from 'react';
import './listMember.scss';

import { Select, Space, Table, Tag } from 'antd';
import * as XLSX from 'xlsx-js-style';
import { CloseCircleFilled, EditFilled, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { apiGetHostMember } from 'src/api/room';
import { urlRouter } from 'src/utils/constants';

const ListMember = () => {
  const [list, setList] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getHostMember = async () => {
      const { data } = await apiGetHostMember();
      setList(data);
    };
    getHostMember();
  }, []);
  console.log(list);

  const dataSource = list.map((item: any, i: number) => {
    return {
      key: i,
      roomNumber: item.nameroom,
      Area: item.namehouse,
      Name: item.name,
      phoneNumber: item.phone,
      dayStart: moment(item.date).format('DD/MM/YYYY'),
      roomFee: Number(item.price).toLocaleString('VND'),
      deposits: Number(item.deposit).toLocaleString('VND'),
      role: <Tag color='green'>Host</Tag>,
      action: (
        <Link to={`/admin/${urlRouter.ROOM}/${urlRouter.VIEW_MEMBER_IN_ROOM}/${item.roomid}?key=view`} target='_blank'>
          <EyeOutlined className='color-green action-table' />
        </Link>
      ),
    };
  });
  const columns = [
    {
      title: <div>Phòng số</div>,
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: <div>Khu vực</div>,
      dataIndex: 'Area',
      key: 'Area',
    },
    {
      title: <div>Họ tên</div>,
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: <div>Vai trò</div>,
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: <div>Số điện thoại</div>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: <div>Ngày bắt đầu</div>,
      dataIndex: 'dayStart',
      key: 'dayStart',
    },
    {
      title: <div>Tiền phòng</div>,
      dataIndex: 'roomFee',
      key: 'roomFee',
    },
    {
      title: <div>Đặt cọc</div>,
      dataIndex: 'deposits',
      key: 'deposits',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const dataExcel = list.map((item: any, index: number) => {
    return {
      key: index + 1,
      roomname: item.nameroom,
      housename: item.namehouse,
      name: item.name,
      phone: item.phone,
      date: moment(item.date).format('DD/MM/YYYY'),
      price: item.price,
      deposit: item.deposit,
    };
  });

  const handleExportToExcel = () => {
    let length = 0;

    let Heading = [['STT', 'Phòng', 'Khu vực', 'Họ tên', 'Số điện thoại', 'Ngày bắt đầu', 'Tiền phòng', 'Đặt cọc']];

    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    // title1
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
    ws['A1'] = { t: 's', v: 'Danh sách khách thuê ' };
    ws['A1'].s = {
      font: { sz: 18, bold: true },
      alignment: { horizontal: 'center' },
    };

    XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A2' });
    var wscols = [
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;

    ws['!rows'] = [{ hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }];

    XLSX.utils.sheet_add_json(ws, dataExcel, { origin: 'A3', skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'danh-sach-khach-thue.xlsx');
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <div>
        <div className='title_page'>
          <h1>Khách Thuê</h1>
        </div>
        <div className='float-right mb-3'>
          <span className='font-bold'>Khu vực: </span>
          <Select
            style={{ width: 120 }}
            defaultValue='tất cả'
            onChange={handleChange}
            options={list?.map((item: any, i: number) => ({
              key: i,
              value: item.houseid,
              label: item.namehouse,
            }))}
          />
          <button
            onClick={() => handleExportToExcel()}
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm px-3 py-1.5 ml-2 '
          >
            <i className='fa-sharp fa-solid fa-file-excel'></i> Xuất file excel
          </button>
          <button
            onClick={() => navigate(-1)}
            className='focus:outline-none  bg-gray-100 text-black hover:bg-gray-200 font-medium text-sm px-3 py-1.5 ml-2'
          >
            <i className='fa-solid fa-angles-left'></i> Quay về
          </button>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 1200 }} />
    </div>
  );
};

export default ListMember;
