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
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table, Tooltip, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { get } from 'http';
import parse from 'html-react-parser';
import { addCharge, getCharge, getChargeFilter, removeCharge, updatePaidBill } from 'src/features/charge/chargeSlice';
import { getAstablishContract } from 'src/features/establish/establishSlice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx-js-style';
import moment from 'moment';
import axios from 'axios';
import Templatesms from '../establish/Templatesms';
import { addBill, getBillID, getHouses, getRoom } from 'src/api/charge';
import { getHouseId } from 'src/api/house';
import dayjs from 'dayjs';
import { format } from 'path';
import { ToastContainer, toast } from 'react-toastify';
import { sendEmail } from 'src/api/dashboard';

type Props = {};

const Charge = () => {
  const { Text } = Typography;
  const [houses, setHouses] = useState([]);
  const [valueFilter, setValueFilter] = useState<any>();
  const [billEmail, setBillEmail] = useState<any>();
  const [status, setStatus] = useState<any>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCharge());
    dispatch(getAstablishContract());
    const getHouse = async () => {
      const { data } = await getHouses();
      setHouses(data.result);
    };
    getHouse();
  }, []);
  const [selectedRow, setSelectedRow] = useState<any[]>([]);

  const chargeData = useAppSelector((state: any) => state.charge.value);

  const dataSource = chargeData?.map((item: any, index: number) => {
    return {
      id: item.id,
      key: item.id,
      house: item.namehouse,
      houseid: item.houseid,
      roomid: item.roomid,
      date: item.date,
      room: item.nameroom,
      user: item.namecustomer,
      tien: item.totalbill,
      tiendatra: item.paid,
      tienconlai: item.totalbill - item.paid,
    };
  });

  // modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const dt = useAppSelector((state: any) => state.establish.value);
  // console.log(dt);

  const printForm = dt?.result?.samplebill;

  const [username, setUsernam] = useState('');
  const [printData, setPrintData] = useState('');
  const [idUpdatePaid, setIdUpdatePaid] = useState('');
  const [printListBillData, setPrintListBillData] = useState('');

  const handleListData = async () => {
    let stringList = '';
    let arrData: any;
    if (selectedRow.length !== 0) {
      arrData = selectedRow;
    } else {
      arrData = dataSource;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    arrData.map(async (item: any) => {
      console.log(item);

      const resHouse = await getHouseId(item.houseid);
      const resRoom = await getRoom(item.houseid);
      const arrRoomHouse = await resRoom?.data?.result?.responses;
      const room = await arrRoomHouse.find((itemroom: any) => itemroom.id === item.roomid);
      console.log(item.roomid);
      const resBill = await getBillID(item.id);
      console.log(resBill.data?.bill?.pricewater);

      const listSvBill = resBill?.data?.service.map((item: any) => {
        return `  <tr>
       <td style='width:70%'>${item.nameservice}</td>
       <td style='width:30%;text-align:right'>${Number(item.priceservice).toLocaleString('VND')}</td>
     </tr>`;
      });

      const data: any = {
        '@AreaName': item.house,
        '@Address': resHouse?.data?.result?.address,
        '@InvoiceNo': '0009',
        '@InvoiceDate': '22/05/2023',
        '@MonthYear': `${valueFilter ? valueFilter.month : month}/${valueFilter ? valueFilter.year : year}`,
        '@PayType': item.ky,
        '@FromDate': '18/4/2023',
        '@ToDate': '18/5/2023',
        '@CustomerName': item.user,
        '@RoomName': item.room,
        '@BeginRent': '18/4/2023',

        '@ContentHtmlInvoiceService': `<tbody><tr><td style="width:70%">Tiền nhà</td><td style="width:30%;text-align:right">${Number(
          room?.price
        ).toLocaleString('VND')}</td></tr>
      <tr><td style="width:70%">Tiền nước</td><td style="width:30%;text-align:right">${Number(
        resBill.data?.bill?.pricewater
      ).toLocaleString('VND')}</td></tr>
      <tr><td style="width:70%">Tiền điện</td><td style="width:30%;text-align:right">${Number(
        resBill.data?.bill?.priceelectricity
      ).toLocaleString('VND')}</td></tr>
      ${listSvBill}</tbody>`,
        '@SumAmount': item.tien,
      };

      const dataaddDom = printForm?.replaceAll(
        /@AreaName|@Address|@InvoiceNo|@InvoiceDate|@MonthYear|@PayType|@FromDate|@ToDate|@CustomerName|@RoomName|@BeginRent|@ContentHtmlInvoiceService|@SumAmount/gi,
        (matched: any) => {
          return data[matched];
        }
      );

      const mg = `<div className='mbprint'>${dataaddDom}</div>`;
      stringList += mg;
      console.log(stringList);
      setPrintListBillData(stringList);
    });
  };
  const handleClickView = async (record: any) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const resHouse = await getHouseId(record.houseid);
    const resRoom = await getRoom(record.houseid);
    const arrRoomHouse = await resRoom?.data?.result?.responses;
    const room = await arrRoomHouse.find((item: any) => item.id === record.roomid);

    const resBill = await getBillID(record.id);
    console.log(resBill.data?.bill?.pricewater);

    const listSvBill = resBill?.data?.service.map((item: any) => {
      return `  <tr>

     <td style='width:70%'>${item.nameservice}</td>
     <td style='width:30%;text-align:right'>${Number(item.priceservice).toLocaleString('VND')}</td>
   </tr>`;
    });
    console.log(record);

    const data: any = {
      '@AreaName': record.house,
      '@Address': resHouse?.data?.result?.address,
      '@InvoiceNo': '0009',
      '@InvoiceDate': '22/05/2023',
      '@MonthYear': `${valueFilter ? valueFilter.month : month}/${valueFilter ? valueFilter.year : year}`,
      '@CustomerName': record.user,
      '@RoomName': record.room,
      '@ContentHtmlInvoiceService': `<tbody><tr><td style="width:70%">Tiền nhà</td><td style="width:30%;text-align:right">${Number(
        room?.price
      ).toLocaleString('VND')}</td></tr>
        <tr><td style="width:70%">Tiền nước</td><td style="width:30%;text-align:right">${Number(
          resBill.data?.bill?.pricewater
        ).toLocaleString('VND')}</td></tr>
        <tr><td style="width:70%">Tiền điện</td><td style="width:30%;text-align:right">${Number(
          resBill.data?.bill?.priceelectricity
        ).toLocaleString('VND')}</td></tr>
        ${listSvBill}</tbody>`,
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
    html2canvas(htmlInput, { width: 800, height: 800 }).then((canvas) => {
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
    const canvas = await html2canvas(htmlInput, { width: 800, height: 800 });
    const image = canvas.toDataURL('image/png', 1.0);
    console.log(image);
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

  const cpPrintBillRef = useRef<any>();
  const handlePrintBill = useReactToPrint({
    content: () => cpPrintBillRef.current,
  });

  const cpPrintListBillRef = useRef<any>();
  const handlePrintListBill = useReactToPrint({
    content: () => cpPrintListBillRef.current,
  });

  const handleDelete = (id: any) => {
    const confirm = window.confirm('Bạn chắc chắn muốn xoá?');
    if (confirm) {
      dispatch(removeCharge(id));
    }
  };

  const selectRowDelete = () => {
    const confirm = window.confirm('Bạn chắc chắn muốn xoá?');
    if (confirm) {
      for (let i = 0; i < selectedRow.length; i++) {
        dispatch(removeCharge(selectedRow[i].id));
      }
    }
  };

  const handleRenderData = (record: any) => {
    setIdUpdatePaid(record.id);
  };

  const houseDataFilter = houses?.map((item: any, index: number) => {
    return { value: item.id, label: item.name, key: item.id };
  });
  const optionFilterHouse = [...houseDataFilter, { value: 'Tất cả', label: 'Tất cả' }];

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

            <button
              className=' flex justify-center items-center bg-emerald-500 text-white p-1 rounded mx-1'
              onClick={() => {
                handleRenderData(record);
                setOldPaid(+record.tiendatra as any);
                setIsModalOpen1(true);
              }}
            >
              <DollarOutlined />
            </button>

            {/* <button
              className=' flex justify-center items-center bg-red-500 text-white p-1 rounded mx-1'
              onClick={() => {
                handleDelete(record.id);
              }}
            >
              <DeleteOutlined />
            </button> */}

            <button
              className=' flex justify-center items-center bg-cyan-500 text-white p-1 rounded mx-1'
              onClick={async () => {
                await handleClickView(record);
                await handlePrintBill();
              }}
            >
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

  // export image and send mail
  const renderBillSendEmail = async () => {
    let stringList = '';
    let arrData: any;
    arrData = selectedRow;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    arrData.map(async (item: any) => {
      const resHouse = await getHouseId(item.houseid);
      const resRoom = await getRoom(item.houseid);
      const arrRoomHouse = await resRoom?.data?.result?.responses;
      const room = await arrRoomHouse.find((itemroom: any) => itemroom.id === item.roomid);
      const resBill = await getBillID(item.id);

      const listSvBill = resBill?.data?.service?.map((item: any) => {
        return `<tr>
       <td style='width:70%'>${item.nameservice}</td>
       <td style='width:30%;text-align:right'>${Number(item.priceservice).toLocaleString('VND')}</td>
       </tr>`;
      });

      const data: any = {
        '@AreaName': item.house,
        '@Address': resHouse?.data?.result?.address,
        '@InvoiceNo': '0009',
        '@InvoiceDate': '22/05/2023',
        '@MonthYear': `${valueFilter ? valueFilter.month : month}/${valueFilter ? valueFilter.year : year}`,
        '@PayType': item.ky,
        '@FromDate': '18/4/2023',
        '@ToDate': '18/5/2023',
        '@CustomerName': item.user,
        '@RoomName': item.room,
        '@BeginRent': '18/4/2023',
        '@ContentHtmlInvoiceService': `<tbody><tr><td style="width:70%">Tiền nhà</td><td style="width:30%;text-align:right">${Number(
          room?.price
        ).toLocaleString('VND')}</td></tr>
      <tr><td style="width:70%">Tiền nước</td><td style="width:30%;text-align:right">${Number(
        resBill.data?.bill?.pricewater
      ).toLocaleString('VND')}</td></tr>
      <tr><td style="width:70%">Tiền điện</td><td style="width:30%;text-align:right">${Number(
        resBill.data?.bill?.priceelectricity
      ).toLocaleString('VND')}</td></tr>
      ${listSvBill}</tbody>`,
        '@SumAmount': item.tien,
      };

      const dataaddDom = printForm?.replaceAll(
        /@AreaName|@Address|@InvoiceNo|@InvoiceDate|@MonthYear|@PayType|@FromDate|@ToDate|@CustomerName|@RoomName|@BeginRent|@ContentHtmlInvoiceService|@SumAmount/gi,
        (matched: any) => {
          return data[matched];
        }
      );

      const mg = `<div className='mbprint bill-${item.id}'>${dataaddDom}</div>`;
      stringList += mg;
      setBillEmail(stringList);
    });

    handleSendEmail();
  };

  const handleSendEmail: any = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const CLOUDINARY_PRESET = 'gtn4lbpo';
    const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/cokukongu/image/upload';
    console.log(selectedRow);

    for (let i = 0; i < selectedRow.length; i++) {
      const resBill = await getBillID(selectedRow[i].id);
      const htmlItem: any = document.querySelector(`.bill-${selectedRow[i].id}`);
      const canvas = await html2canvas(htmlItem, { height: 1000 });
      const image = canvas.toDataURL('image/png', 1.0);
      const file = new File([image], 'image_thai.png', { type: 'image/png' });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_PRESET);
      const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          'Content-Type': 'application/form-data',
        },
      });
      const imgLink = data.url;

      const response: any = await sendEmail({
        to: [`${resBill?.data?.bill?.email}`],
        title: `Thông báo về hóa đơn tháng ${valueFilter ? valueFilter.month : month}`,
        content: `Đây là bill thu tháng 7 của bạn(Ấn vào link để xem ảnh) ${i}: ${imgLink}`,
      });
      if (response?.status === 'success') {
        htmlItem.setAttribute('class', 'hide');
        toast.success('Gửi email thành công');
      } else {
        toast.success('Gửi email không thành công');
      }
    }
    setBillEmail('');
  };

  // export excel
  const exportExcel = () => {
    let tienl = 0;
    let tiendattral = 0;
    let tienconlail = 0;
    let length = 0;
    const dataExport = chargeData.map((item: any) => {
      length++;
      tienl += +item.totalbill;
      tiendattral += +item.paid;
      return {
        house: item.namehouse,
        room: item.nameroom,
        user: item.namecustomer,
        tien: +item.totalbill,
        tiendatra: +item.paid,
        tienconlai: +item.totalbill - +item.paid,
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
    ws['A3'] = { t: 's', v: 'Nhà: Tất cả, Kỳ: Tất cả ' }; // note need fix ondata
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

  const initValueFormFilter = {
    dateTime: moment(),
    ky: 'Tất cả',
    house: 'Tất cả',
  };

  const initValueCacula = {
    date: moment(),
  };

  const onFinishFter = async (values: any) => {
    const year = moment(values.dateTime).year();
    const month = moment(values.dateTime).month() + 1;
    const house = values.house;
    const day = moment(values.dateTime).date();
    const filter = { month: month, house: house, year: year, day: day };
    setValueFilter({
      month: month,
      year: year,
      house: house,
      day: day,
    });
    dispatch(getChargeFilter(filter));
  };

  const [isModalOpenCalculator, setIsModalOpenCalculator] = useState(false);
  const showModal = () => {
    setIsModalOpenCalculator(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpenCalculator(false);
  };

  const handleExit = () => {
    setIsModalOpenCalculator(false);
  };

  const [form] = Form.useForm();

  const [oldPaid, setOldPaid] = useState<number>(0);
  const selectRowThutien = () => {
    for (let i = 0; i < selectedRow.length; i++) {
      // console.log(+selectedRow[i].tienconlai + +selectedRow[i].tiendatra);
      if (+selectedRow[i].tiendatra > 0) {
        const sum = +selectedRow[i].tienconlai + +selectedRow[i].tiendatra;
        dispatch(
          updatePaidBill({
            id: selectedRow[i].id,
            paid: sum,
          })
        );
      } else if (selectedRow[i].tienconlai !== 0) {
        console.log('ahihiiahsd');
        dispatch(
          updatePaidBill({
            id: selectedRow[i].id,
            paid: selectedRow[i].tienconlai,
          })
        );
      }
    }
  };

  // tinh tien
  const [room, setRoom] = useState([]);
  const handleSelectHouse = async (value: any) => {
    const { data } = await getRoom(value);
    console.log(data);
    setRoom(data.result?.responses);
  };
  const handleSubmituserform = async (values: any) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const strDay = day < 10 ? '0' + day : day;
    const strMonth = month < 10 ? '0' + month : month;
    const stringDate = year + '-' + strMonth + '-' + strDay;
    try {
      const dataInput = {
        houseId: values.house,
        roomId: values.room,
        date: moment(values.date).format('YYYY-MM-DD'),
        indexElectricity: values.elec,
        indexWater: values.water,
      };

      // const data = await addBill(dataInput);
      dispatch(addCharge({ input: dataInput, filter: valueFilter }));
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf('month');
  };
  return (
    <Form.Provider>
      <div className='es-container'>
        <div className='title'>
          <div className='title--name'>
            <h2>
              <strong>Tính tiền</strong>
            </h2>
          </div>

          <div className='title--button flex items-center'>
            <button
              className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded '
              onClick={showModal}
            >
              <CalculatorOutlined className='icon-btn' /> Tính
            </button>
            <Modal title='Basic Modal' open={isModalOpenCalculator} onOk={handleOk} onCancel={handleExit}>
              <Form
                form={form}
                layout='vertical'
                name='calculaForm'
                onFinish={handleSubmituserform}
                initialValues={initValueCacula}
              >
                <Form.Item name='date' label='Ngày tháng'>
                  <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item name='house' label='Nhà'>
                  <Select
                    style={{ width: '100%' }}
                    options={houses?.map((item: any, index: number) => {
                      return { value: item.id, label: item.name, key: index };
                    })}
                    defaultValue={{ value: 0, label: 'Chọn nhà' }}
                    onChange={handleSelectHouse}
                  />
                </Form.Item>
                <Form.Item name='room' label='Phòng'>
                  <Select
                    style={{ width: '100%' }}
                    options={room?.map((item: any, index: number) => {
                      return { value: item.id, label: item.name, key: index };
                    })}
                    defaultValue={{ value: 0, label: 'Chọn phòng' }}
                  />
                </Form.Item>

                <Form.Item name='elec' label='Tiền điện'>
                  <Input />
                </Form.Item>

                <Form.Item name='water' label='Tiền nước'>
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
            <Tooltip title='Ấn 2 lần nút để in '>
              <button
                className='btn-x bg-cyan-500 hover:bg-cyan-500 text-white font-bold py-2  px-4 rounded'
                onClick={async () => {
                  await handleListData();
                  await handlePrintListBill();
                }}
              >
                <PrinterOutlined className='icon-btn' /> In
              </button>
            </Tooltip>

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

            <button
              className='btn-x  bg-teal-500 hover:bg-teal-500 text-white font-bold py-2  px-4 rounded'
              onClick={() => {
                selectRowThutien();
              }}
            >
              <MoneyCollectOutlined className='icon-btn' /> Thu tiền
            </button>
            <Tooltip title='Ấn 2 lần nút để gửi email'>
              <button
                className='btn-x bg-teal-500 hover:bg-teal-500  text-white font-bold py-2  px-4 rounded'
                onClick={async () => {
                  await renderBillSendEmail();
                  await handleSendEmail();
                }}
              >
                <MailOutlined className='icon-btn' /> Email
              </button>
            </Tooltip>

            {/* <button
              className='btn-x bg-red-800 hover:bg-red-800 text-white font-bold py-2  px-4 rounded'
              onClick={() => {
                selectRowDelete();
              }}
            >
              <DeleteOutlined className='icon-btn' /> Xoá
            </button> */}
          </div>
        </div>

        {/* filter */}
        <div className='filter'>
          <Form layout='horizontal' initialValues={initValueFormFilter} onFinish={onFinishFter} name='formFilter'>
            <div className='flex  w-9/12 mt-5 items-center'>
              <div className='flex-item'>
                <Form.Item label='Tháng/năm' name='dateTime'>
                  <DatePicker />
                </Form.Item>
              </div>

              <div className='flex-item'>
                <Form.Item label='Nhà' name='house'>
                  <Select style={{ width: 200 }} options={optionFilterHouse} />
                </Form.Item>
              </div>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Filter
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div className='note mt-5'>
            <p>
              <strong>Lưu ý:</strong>
              <br />
              - Bạn phải thực hiện việc "Thêm khách" ở chức năng "Phòng" và gán các dịch vụ cho khách thuê trước khi
              tính tiền.
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
              ttienconlai += +item.tienconlai;
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
          <div id='pdf' className='p-3' ref={cpPrintBillRef}>
            {parse(printData ? printData : '')}
          </div>
        </Modal>

        <Modal
          title='Basic Modal'
          open={isModalOpen1}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                const valuesNumber = +values.paid + oldPaid;

                form.resetFields();
                dispatch(updatePaidBill({ id: idUpdatePaid, paid: valuesNumber }));
                setIsModalOpen1(false);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
          onCancel={handleCancel1}
        >
          <Form form={form}>
            <Form.Item
              name='paid'
              label='Tiền đã thu'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tiền đã thu',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <div className='p-3 hide' ref={cpPrintBillRef}>
          {parse(printData ? printData : '')}
        </div>

        <div className='p-3 hide' ref={cpPrintListBillRef}>
          {parse(printListBillData ? printListBillData : '')}
        </div>

        <div className='p-3 '>{parse(billEmail ? billEmail : '')}</div>
      </div>
      <ToastContainer />
    </Form.Provider>
  );
};

export default Charge;
