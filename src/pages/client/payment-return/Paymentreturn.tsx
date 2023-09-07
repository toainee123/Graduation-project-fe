import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBillUser } from 'src/api/charge';
import { getInfoRoomUser } from 'src/api/dashboard';
import { paymentReturn } from 'src/api/payment';
import './payment.scss';
import { Button, Result } from 'antd';
type Props = {};

const Paymentreturn = (props: Props) => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const [dataReturn, setDataReturn]: any = useState();

  useEffect(() => {
    if (searchParams.size > 0) {
      const check = async () => {
        console.log(searchParams.size);

        const dataParams = Object.fromEntries([...searchParams]);
        const res = await getInfoRoomUser();
        const idroom = res?.data?.infoRoom?.id;

        const dateBill = dataParams.vnp_OrderInfo;
        const year = dateBill.slice(-4);
        const month = dateBill.slice(-7, -5);

        const dateSlice = year + '-' + month;

        const { data } = await getBillUser(dateSlice);
        const idB = data.bill.id;

        const response = await paymentReturn(idroom, idB, dataParams);
        setDataReturn(response);
      };
      check();
    }
  }, [searchParams]);
  return (
    <div>
      {dataReturn?.message === 'Thanh toán thành công!' ? (
        <Result
          status='success'
          title='Chúc mừng bạn đã thanh toán thành công!'
          subTitle='Cảm ơn đã sử dụng chức năng thanh toán của chúng tôi !'
          extra={[]}
        />
      ) : (
        <Result
          status='error'
          title='Thanh toán không thành công'
          subTitle='Cảm ơn đã sử dụng chức năng thanh toán của chúng tôi !'
          extra={[]}
        />
      )}
    </div>
  );
};

export default Paymentreturn;
