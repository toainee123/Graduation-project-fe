import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getBillUser } from 'src/api/charge';
import { getInfoRoomUser } from 'src/api/dashboard';
import { paymentReturn } from 'src/api/payment';

type Props = {};

const Paymentreturn = (props: Props) => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const [dataReturn, setDataReturn]: any = useState();

  useEffect(() => {
    const check = async () => {
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
      console.log(response);
    };
    check();
  }, [searchParams]);
  return (
    <div>
      <strong>{dataReturn?.message}</strong>
    </div>
  );
};

export default Paymentreturn;
