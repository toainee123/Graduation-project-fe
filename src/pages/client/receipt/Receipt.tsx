import { Alert, Button, DatePicker, Input } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './receipt.scss';
import parse from 'html-react-parser';
import axios from 'axios';
import { getBillUser } from 'src/api/charge';
import { createUrlPayment } from 'src/api/payment';
import { getInfoRoomUser } from 'src/api/dashboard';
type Props = {};

const Receipt = (props: Props) => {
  const date = new Date();
  const [dateFilter, setDateFilter] = useState(moment(date).format('YYYY-MM-DD'));
  const [dataBill, setDataBill] = useState<any>();
  useEffect(() => {
    const getBill = async () => {
      const { data } = await getBillUser(dateFilter);
      setDataBill(data);
    };
    getBill();
  }, [dateFilter]);
  const handleChangeFilter = (date: any) => {
    const formatDate = moment(date).format('YYYY-MM-DD');
    setDateFilter(formatDate);
  };

  // const dataBill?.bill: any = {
  //   id: 49,
  //   totalbill: '2180000',
  //   pricewater: '30000',
  //   priceelectricity: '50000',
  //   owedold: '1050000',
  //   date: '2023-08-18T17:00:00.000Z',
  //   namehouse: 'nha 3',
  //   roomid: 13,
  //   roomhouse: 'p1',
  //   priceroom: '1000000',
  //   namecustomer: 'Nguyen Van A',
  //   address: 'Hnoi',
  //   phone: '0399710843',
  //   email: 'thai.hoang13834@gmail.com',
  // };

  // const service = [
  //   {
  //     nameservice: 'Rác',
  //     priceservice: '50000',
  //   },

  //   {
  //     nameservice: 'Máy giặt',
  //     priceservice: '150000',
  //   },
  // ];

  let stringSv = '';
  const serviceString = dataBill?.service?.map((item: any) => {
    const itemSv = `<tr>
    <td>${item.nameservice}</td>
    <td>${Number(item.priceservice).toLocaleString('VND')}</td>
   </tr>`;
    stringSv += itemSv;
    return 0;
  });

  const datee: any = moment(dataBill?.bill.date).format('DD/MM/YYYY');
  const handleClick = async () => {
    const dataInput: any = {
      amount: dataBill?.bill.totalbill,
      orderDescription: `Thanh toán hóa đơn ${moment(dataBill?.bill.date).format('MM/YYYY')}`,
      orderType: 'other',
      language: 'vn',
    };

    const res = await getInfoRoomUser();
    const idroom = res?.data?.infoRoom?.id;
    const response: any = await createUrlPayment(idroom, dataInput);

    window.open(response?.redirect);
  };
  return (
    <>
      <div className='es-container'>
        <div className='title'>
          <div className='title--name'>
            <h2>
              <strong>Thanh toán hóa đơn</strong>
            </h2>
          </div>
        </div>

        <div className='filter mb-2'>
          <DatePicker
            picker='month'
            style={{ width: '30%' }}
            onChange={handleChangeFilter}
            defaultValue={moment(date, 'YYYY-MM-DD')}
          />
        </div>

        {dataBill ? (
          <div>
            <Alert
              className='note bordered '
              message='Vui lòng thanh toán trong vòng 7 ngày tính từ thời gian nhận được hóa đơn.
          Mọi thắc mắc xin gửi phản hồi về cho website để được xử lý.'
              type='info'
            />

            <div className='p-3 shadow-[0px_0px_3px_rgba(3,102,214,0.3)] mt-4'>
              <div className='header_bill flex justify-between '>
                <div>
                  <h2 className='text-xl'>
                    <h4>
                      Ngày tạo:<strong> {datee.toLocaleString()}</strong>
                    </h4>
                  </h2>
                </div>
                <div>
                  <h2 className='text-2xl '>
                    <strong>BeeHome.com</strong>
                  </h2>
                  <h4>Phần mềm quản lí phòng trọ</h4>
                </div>
              </div>
            </div>

            <div className='p-3 shadow-[0px_0px_3px_rgba(3,102,214,0.3)] mt-4'>
              <div className='infor text-lg flex justify-between align-center'>
                <ul className='list-none'>
                  <li>
                    <strong>Họ tên:</strong> {dataBill?.bill.namecustomer}
                  </li>

                  <li>
                    <strong>Email:</strong> {dataBill?.bill.email}
                  </li>

                  <li>
                    <strong>Địa chỉ:</strong> {dataBill?.bill.address}
                  </li>

                  <li>
                    <strong>Số điện thoại:</strong> {dataBill?.bill.phone}
                  </li>

                  <li>
                    <strong>Số phòng/số nhà:</strong> {dataBill?.bill.roomhouse + '/' + dataBill?.bill.namehouse}
                  </li>
                </ul>
                {+dataBill?.bill.totalbill === +dataBill?.bill.paid ? (
                  <button className='bg-green-500 px-2 py-1 text-white rounded-md ccao'>Đã thanh toán đầy đủ !!</button>
                ) : (
                  <button className='bg-blue-500 px-2 py-1 text-white rounded-md ccao' onClick={handleClick}>
                    Thanh toán ngay
                  </button>
                )}
              </div>
              <div className='body-bill mt-6'>
                <div className='flex justify-center text-2xl my-2 bg-slate-200 p-2 '>
                  <p className='text-black'>
                    <strong>Nội dung thanh toán</strong>
                  </p>
                </div>
                <div className=''>
                  <table className='table-fixed'>
                    <thead style={{ color: 'black !important' }}>
                      <tr>
                        <th>Tên</th>
                        <th>Thành tiền (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tiền nhà</td>
                        <td>{Number(dataBill?.bill.priceroom).toLocaleString('VND')}</td>
                      </tr>
                      <tr>
                        <td>Tiền nước</td>
                        <td>{Number(dataBill?.bill.pricewater).toLocaleString('VND')}</td>
                      </tr>
                      <tr>
                        <td>Tiền điện</td>
                        <td>{Number(dataBill?.bill.priceelectricity).toLocaleString('VND')}</td>
                      </tr>

                      <tr>
                        <td>Tiền nợ tháng trước</td>
                        <td>{Number(dataBill?.bill.owedold).toLocaleString('VND')}</td>
                      </tr>
                      {parse(stringSv)}

                      <tr>
                        <td>
                          <strong>Tổng tiền</strong>
                        </td>
                        <td>{Number(dataBill?.bill.totalbill).toLocaleString('VND')}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Đã trả</strong>
                        </td>
                        <td>{Number(dataBill?.bill.paid).toLocaleString('VND')}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Số tiền cần thanh toán</strong>
                        </td>
                        <td>{Number(+dataBill?.bill.totalbill - +dataBill?.bill.paid).toLocaleString('VND')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <section className='bg-white dark:bg-gray-900 '>
            <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
              <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
                <p className='p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='2'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                    />
                  </svg>
                </p>
                <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
                  Tháng {moment(dateFilter).format('MM')}, hiện tại chưa có hóa đơn!
                </h1>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Receipt;
