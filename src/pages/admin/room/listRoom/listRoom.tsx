import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import * as XLSX from 'xlsx-js-style';
import { CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import { getAllRoom } from 'src/api/room';

const ListMember = () => {
  const [listRoom, setListRoom] = useState<any>([]);
  const [analyticRoom, setAnalyticRoom] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getAllRoom();
      setListRoom(data);
      setAnalyticRoom(data.room);
    };
    fetchRoom();
  }, []);

  const dataSource = listRoom?.map((item: any, i: any) => {
    return {
      key: i,
      roomNumber: item.nameroom,
      Area: item.namehouse,
      price: Number(item.price).toLocaleString('VND'),
    };
  });

  const uniqueDataSource = dataSource.filter(
    (item: any, index: any, self: any) => index === self.findIndex((i: any) => i.Area === item.Area)
  );

  const columns = [
    {
      title: <div>Tên phòng</div>,
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: <div>Khu vực</div>,
      dataIndex: 'Area',
      key: 'Area',
      filters: uniqueDataSource?.map((item: any, i: any) => {
        return {
          key: i,
          text: item.Area,
          value: item.Area,
        };
      }),
      onFilter: (value: any, record: any) => record.Area.startsWith(value),
      filterSearch: true,
    },
    {
      title: <div>Đơn giả</div>,
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => {
        const priceA = parseInt(a.price.replace(/\D/g, ''), 10);
        const priceB = parseInt(b.price.replace(/\D/g, ''), 10);
        return priceA - priceB;
      },
    },
    {
      title: <div>Ghi chú</div>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];
  const handleExportToExcel = () => {
    let length = 0;

    let Heading = [['STT', 'Nhà', 'Phòng', 'Tiền thuê phòng']];

    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    // title1
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
    ws['A1'] = { t: 's', v: 'Danh sách phòng ' };
    ws['A1'].s = {
      font: { sz: 18, bold: true },
      alignment: { horizontal: 'center' },
    };

    XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A2' });
    var wscols = [
      {
        wch: 15,
      },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    ws['!cols'] = wscols;

    ws['!rows'] = [{ hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }];

    XLSX.utils.sheet_add_json(ws, dataSource, { origin: 'A3', skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'danh-sach-phong/2023.xlsx');
  };
  return (
    <div>
      <div>
        <div className='title_page'>
          <h1>danh sách phòng </h1>
        </div>
        <div className='float-right'>
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
