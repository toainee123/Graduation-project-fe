import React, { useEffect, useState, useRef } from 'react';
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
import { Button, DatePicker, Modal, Select, Table, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { get } from 'http';
import parse from 'html-react-parser';
import { getCharge } from 'src/features/charge/chargeSlice';
import { getAstablishContract } from 'src/features/establish/establishSlice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx-js-style';
type Props = {};

const Charge = (props: Props) => {
  const { Text } = Typography;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCharge());
    dispatch(getAstablishContract());
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

  // modal
  const [show, setShow] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dt = useAppSelector((state) => state.establish.value);
  const printForm = dt.sample_bill_80mm;
  const [username, setUsernam] = useState('');
  const [printData, setPrintData] = useState('');
  const handleClickView = (record: any) => {
    const data: any = {
      '@AreaName': record.house,
      '@Address': 'Tân Chánh Hiệp - Q12 - TPHCM',
      '@InvoiceNo': '0009',
      '@InvoiceDate': '22/05/2023',
      '@MonthYear': `${record.month}/${record.year}`,
      '@PayType': record.ky,
      '@FromDate': '18/4/2023',
      '@ToDate': '18/5/2023',
      '@CustomerName': record.user,
      '@RoomName': record.room,
      '@BeginRent': '18/4/2023',
      '@ContentHtmlInvoiceService':
        '<tbody><tr><td style="width:2%">1)</td><td style="width:70%">Tiền nhà</td><td style="width:25%;text-align:right">2,500,000</td></tr><tr><td style="width:2%">2)</td><td style="width:70%">Tiền nước</td><td style="width:25%;text-align:right">50,000</td></tr><tr><td style="width:2%">3)</td><td style="width:70%">Gửi xe</td><td style="width:25%;text-align:right">100,000</td></tr></tbody>',
      '@SumAmount': record.tien,
    };
    const exampleData80mm = printForm?.replaceAll(
      /@AreaName|@Address|@InvoiceNo|@InvoiceDate|@MonthYear|@PayType|@FromDate|@ToDate|@CustomerName|@RoomName|@BeginRent|@ContentHtmlInvoiceService|@SumAmount/gi,
      (matched: any) => {
        return data[matched];
      }
    );

    setPrintData(exampleData80mm);
    setUsernam(record.user);
  };

  const handleExportPDF = () => {
    const htmlInput: any = document.querySelector('#pdf');
    html2canvas(htmlInput).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const componentWidth = pdf.internal.pageSize.getWidth();
      const componentHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      pdf.save('download.pdf');
    });
  };

  const handleExportImage = async (imageFileName: any) => {
    const htmlInput: any = document.querySelector('#pdf');
    const canvas = await html2canvas(htmlInput);
    const image = canvas.toDataURL('image/png', 1.0);
    downloadImage(image, imageFileName);
  };

  const downloadImage = (blob: any, fileName: any) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.style.display = 'none';
    fakeLink.href = blob;
    fakeLink.download = fileName;
    window.document.body.appendChild(fakeLink);
    fakeLink.click();
    window.document.body.removeChild(fakeLink);
  };

  const columns: ColumnsType<any> = [
    {
      title: '',
      key: 'Action',
      render: (record) => {
        return (
          <div className='flex flex justify-center items-center'>
            <button
              className=' flex justify-center items-center bg-blue-500 text-white p-1 rounded mx-1'
              onClick={() => {
                handleClickView(record);
                setIsModalOpen(true);
              }}
            >
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
  // print
  const componentPrintRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
  });
  const printCharge = () => {
    handlePrint();
  };

  // export excel
  const exportExcel = () => {
    let tienl = 0;
    let tiendattral = 0;
    let tienconlail = 0;
    let length = 0;
    const dataExport = chargeData.map((item: any) => {
      length++;
      tienl += +item.tien;
      tiendattral += +item.tiendatra;
      return {
        house: item.house,
        room: item.room,
        user: item.user,
        tien: +item.tien,
        tiendatra: +item.tiendatra,
        tienconlai: item.tien - item.tiendatra,
      };
    });
    dataExport.push({
      house: `Tổng`,
      room: ' ',
      user: ' ',
      tien: tienl,
      tiendatra: tiendattral,
      tienconlai: tienl - tiendattral,
    }); //fake rows

    let Heading = [['Nhà', 'Phòng', 'Chủ phòng', 'Tiền thu(VND)', 'Tiền đã thu(VND)', 'Tiền còn lại(VND)']];

    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    // title1
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } },
      { s: { r: 4 + length, c: 0 }, e: { r: 4 + length, c: 2 } },
    ];
    ws['A1'] = { t: 's', v: 'Danh sách tiền phòng ' };
    ws['A1'].s = {
      font: { sz: 18, bold: true },
      alignment: { horizontal: 'center' },
    };

    ws['A2'] = { t: 's', v: 'Tháng 5/2023 ' };
    ws['A2'].s = {
      font: { sz: 14, bold: true },
      alignment: { horizontal: 'center' },
    };
    ws['A3'] = { t: 's', v: 'Nhà: Tất cả, Kỳ: Tất cả ' };
    ws['A3'].s = {
      font: { sz: 14, bold: true },
      alignment: { horizontal: 'center' },
    };

    ws[`A${4 + length + 1}`] = { t: 's', v: ' ' };
    ws[`A${4 + length + 1}`].s = {
      font: { sz: 12, bold: true },
      alignment: { horizontal: 'center' },
    };

    XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A4' });
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

    XLSX.utils.sheet_add_json(ws, dataExport, { origin: 'A5', skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'thu-tien-5/2023.xlsx');
  };
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

          <button
            className='btn-x bg-blue-600 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded'
            onClick={() => {
              exportExcel();
            }}
          >
            <FileExcelOutlined className='icon-btn' /> Xuất file excel
          </button>

          <button
            className='btn-x bg-orange-400 hover:bg-orange-400 text-white font-bold py-2  px-4 rounded'
            onClick={() => {
              printCharge();
            }}
          >
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
      <div ref={componentPrintRef} className='hide table-export'>
        <div className='header-print'>
          <h1 className='uppercase text-center text-bold '>Danh sách tiền phòngs</h1>
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
          pagination={false}
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
                <Table.Summary.Cell index={0} colSpan={3} className='text-right'>
                  Total
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} colSpan={2}></Table.Summary.Cell>
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
              <Table.Summary.Cell index={0} colSpan={3}>
                Total
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} colSpan={2}></Table.Summary.Cell>
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

      <Modal
        title='Hoá đơn'
        open={isModalOpen}
        onCancel={handleCancel}
        className='id_bill'
        mask={false}
        footer={[
          <Button
            key='1'
            type='primary'
            className='btn-scc'
            onClick={() => {
              handleExportImage(username);
            }}
          >
            Tải file ảnh
          </Button>,
          <Button
            key='2'
            type='primary'
            onClick={() => {
              handleExportPDF();
            }}
          >
            Tải file PDF
          </Button>,
          <Button key='3' type='primary' danger onClick={handleCancel}>
            Đóng
          </Button>,
        ]}
      >
        <div id='pdf' className='p-3'>
          {parse(printData ? printData : '')}
        </div>
      </Modal>
    </div>
  );
};

export default Charge;
