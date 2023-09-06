import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

type Props = {};

const Paymentreturn = (props: Props) => {
  const [searchParams, setSearchParams]: any = useSearchParams();
  const [dataReturn, setDataReturn]: any = useState();

  useEffect(() => {
    const check = async () => {
      const dataParams = Object.fromEntries([...searchParams]);
      const { data } = await axios.post('http://localhost:8000/api/payment-return', dataParams);
      setDataReturn(data);
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
