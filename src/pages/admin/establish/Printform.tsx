import { CaretUpOutlined, CloseOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Modal, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import parse from 'html-react-parser';
type Props = {};

const Printform = (props: Props) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const hs = `<div style="height:27px" ><span name="textKyTen"><strong>Nhà @AreaName</strong></span><span style="float:right">@InvoiceNo</span></div>
  <div style="height:27px"><span name="textKyTen"><strong>Địa chỉ: @Address</strong></span><span style="float:right">@InvoiceDate</span></div>
  <div>
     <h3 style="text-align:center"><strong>HÓA ĐƠN TIỀN NHÀ</strong></h3>
  </div>
  <div>
     <p style="text-align:center"><strong>Tháng @MonthYear - Kỳ @PayType</strong></p>
  </div>
  <div>
     <p style="text-align:center">(Từ ngày @FromDate đến @ToDate)</p>
  </div>
  <div>
     <p>Họ tên: <strong>@CustomerName</strong></p>
  </div>
  <div>
     <p><strong>Phòng: @RoomName</strong></p>
     <p><strong>Ngày vào: @BeginRent</strong></p>
  </div>
  <div style="border-bottom: 2px solid black; border-top: 2px solid black">
     <table cellspacing="0" cellpadding="0" width="100%">@ContentHtmlInvoiceService</table>
  </div>
  <div style="border-bottom: 2px solid black">
     <h3><strong>TỔNG CỘNG</strong><strong style="float:right">@SumAmount</strong></h3>
  </div>
  <div>
      <span style="float:left" name="textKyTen">
          <strong>Người thanh toán</strong></span><span style="float:right" name="textKyTen"><strong>Người nhận TT</strong>
      </span>
  </div>
  <br>
  `;
  return (
    <div>
      <div className='select_option_print'>
        <span className='default_option'>Khổ in mặc định:</span>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>In Bill khổ 80mm</Radio>
          <Radio value={2}>In khổ A5</Radio>
        </Radio.Group>
      </div>

      <div className='print_bill_80'>
        <div className='title'>
          <h3 className='name'>In Bill (Khổ 80mm)</h3>
          <div className='function'>
            <button
              className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-preview'
              onClick={showModal}
            >
              Xem trước
            </button>
            <button className='hide_content'>
              <UpOutlined />
            </button>
            <button className='close'>
              <CloseOutlined />
            </button>
          </div>
        </div>

        <div className='content'>
          <div className='x_ct'>Nội dung</div>
          <textarea name='' id='' rows={10} className='text_content'>
            {hs}
          </textarea>
          <Modal title='Basic Modal' open={isModalOpen} onCancel={handleCancel} footer={null}>
            {parse(hs)}
          </Modal>
        </div>
      </div>

      <div className='print_bill_80 print_bill_A5'>
        <div className='title'>
          <h3 className='name'>In Bill (Khổ 80mm)</h3>
          <div className='function'>
            <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-preview'>
              Xem trước
            </button>
            <button className='hide_content'>
              <UpOutlined />
            </button>
            <button className='close'>
              <CloseOutlined />
            </button>
          </div>
        </div>

        <div className='content'>
          <div className='x_ct'>Nội dung</div>
          <textarea name='' id='' rows={10} className='text_content'>
            {hs}
          </textarea>
          <Modal title='Basic Modal' open={isModalOpen} onCancel={handleCancel} footer={null}>
            {parse(hs)}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Printform;
