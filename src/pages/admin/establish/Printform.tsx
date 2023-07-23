import { CaretUpOutlined, CloseOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Modal, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  changeContentPrintForm80mm,
  changeContentPrintFormA5,
  getAstablishContract,
} from 'src/features/establish/establishSlice';
type Props = {
  getSelectOption: (a: any) => void;
};

const Printform = (props: Props) => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAstablishContract());
  }, []);

  const data = useAppSelector((state: any) => state.establish.value);

  const sample80mm: any = data.sample_bill_80mm;
  console.log(sample80mm);
  const sampleA5: any = data.sample_bill_A5;

  const [value, setValue] = useState(1);

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const exampleInfo: any = {
    '@AreaName': 'Nhà Quang Trung - Q.12',
    '@Address': 'Tân Chánh Hiệp - Q12 - TPHCM',
    '@InvoiceNo': '0009',
    '@InvoiceDate': '18/05/2023',
    '@MonthYear': '5/2023',
    '@PayType': '30',
    '@FromDate': '18/4/2023',
    '@ToDate': '18/5/2023',
    '@CustomerName': 'Trần Thị Lan',
    '@RoomName': '1.01',
    '@BeginRent': '18/4/2023',
    '@ContentHtmlInvoiceService':
      '<tbody><tr><td style="width:2%">1)</td><td style="width:70%">Tiền nhà</td><td style="width:25%;text-align:right">2,500,000</td></tr><tr><td style="width:2%">2)</td><td style="width:70%">Tiền nước</td><td style="width:25%;text-align:right">50,000</td></tr><tr><td style="width:2%">3)</td><td style="width:70%">Gửi xe</td><td style="width:25%;text-align:right">100,000</td></tr></tbody>',
    '@SumAmount': '2,650,000',
  };

  const exampleData80mm = sample80mm?.replaceAll(
    /@AreaName|@Address|@InvoiceNo|@InvoiceDate|@MonthYear|@PayType|@FromDate|@ToDate|@CustomerName|@RoomName|@BeginRent|@ContentHtmlInvoiceService|@SumAmount/gi,
    (matched: any) => {
      return exampleInfo[matched];
    }
  );

  const exampleDataA5 = sampleA5?.replaceAll(
    /@AreaName|@Address|@InvoiceNo|@InvoiceDate|@MonthYear|@PayType|@FromDate|@ToDate|@CustomerName|@RoomName|@BeginRent|@ContentHtmlInvoiceService|@SumAmount/gi,
    (matched: any) => {
      return exampleInfo[matched];
    }
  );

  return (
    <div>
      <div className='print_bill_80'>
        <div className='title'>
          <h3 className='name'>In Bill (Khổ 80mm)</h3>
          <div className='function'>
            <button
              className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-preview'
              onClick={showModal1}
            >
              Xem trước
            </button>
            <button
              className='hide_content'
              onClick={() => {
                setShow1(!show1);
              }}
            >
              <UpOutlined />
            </button>
            <button
              className='close'
              onClick={() => {
                dispatch(changeContentPrintForm80mm(''));
              }}
            >
              <CloseOutlined />
            </button>
          </div>
        </div>

        <div className='content'>
          <div className='x_ct'>Nội dung</div>
          <textarea
            name=''
            id=''
            rows={10}
            className='text_content'
            value={sample80mm}
            onChange={(e: any) => {
              console.log(e);
              dispatch(changeContentPrintForm80mm(e.target.value));
            }}
            style={{ display: show1 ? 'block' : 'none' }}
          ></textarea>

          <Modal title='Bill (Khổ 80mm)' open={isModalOpen1} onCancel={handleCancel1} footer={null}>
            {parse(exampleData80mm ? exampleData80mm : '')}
          </Modal>
        </div>
      </div>

      <div className='print_bill_80 print_bill_A5'>
        <div className='title'>
          <h3 className='name'>In Bill khổ A5</h3>
          <div className='function'>
            <button
              className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-preview'
              onClick={showModal2}
            >
              Xem trước
            </button>
            <button
              className='hide_content'
              onClick={() => {
                setShow2(!show2);
              }}
            >
              <UpOutlined />
            </button>
            <button
              className='close'
              onClick={() => {
                changeContentPrintFormA5('');
              }}
            >
              <CloseOutlined />
            </button>
          </div>
        </div>

        <div className='content'>
          <div className='x_ct'>Nội dung</div>
          <textarea
            name=''
            id=''
            rows={10}
            className='text_content'
            defaultValue={sampleA5}
            onChange={(e: any) => {
              changeContentPrintFormA5(e.target.value);
            }}
            style={{ display: show2 ? 'block' : 'none' }}
          ></textarea>
          <Modal title='In khổ A5' open={isModalOpen2} onCancel={handleCancel2} footer={null}>
            {parse(exampleDataA5 ? exampleDataA5 : '')}
          </Modal>
        </div>
      </div>

      <div className='note_paramaters'>
        <span>Lưu ý: Các tham số không được thay đổi:</span>
        <span>@AreaName : Tên khu vực/ nhà</span>
        <span>@InvoiceNo: Số hóa đơn</span>
        <span>@Address: Địa chỉ nhà</span>
        <span>@InvoiceDate: Ngày hóa đơn</span>
        <span>@MonthYear: Tháng/ năm hóa đơn</span>
        <span>@PayType: Kỳ thanh toán</span>
        <span>@FromDate: Từ ngày</span>
        <span>@ToDate: Đến ngày</span>
        <span>@BeginRent: Ngày bắt đầu thuê</span>
        <span>@CustomerName: Tên khách thuê</span>
        <span>@RoomName: Tên phòng</span>
        <span>@ContentHtmlInvoiceService: Chi tiết dịch vụ</span>
        <span>@SumAmount: Tổng tiền</span>
      </div>
    </div>
  );
};

export default Printform;
