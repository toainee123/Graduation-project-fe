import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getImgContract } from 'src/api/contract';

type Props = {};

const ClientContract = () => {
  const [getImg, setImg] = useState<any>();
  useEffect(() => {
    const getImgCt = async () => {
      const { data } = await getImgContract();
      setImg(data);
    };
    getImgCt();
  }, []);
  return (
    <div>
      <div className='title_page'>
        <h1>hợp đồng</h1>
      </div>
      <div className=' ml-3 mt-9 mb-2'>
        <div className='text-base font-semibold text-slate-500'>Thời hạn hợp đồng: {getImg?.expiry} tháng</div>
        <div className='text-base font-semibold text-slate-500'>
          Ngày bắt đầu: {moment(getImg?.contractdate).format('DD/MM/YYYY')}
        </div>
        <div className='text-base font-semibold text-slate-500'>
          Ngày kết thúc hợp đồng: {moment(getImg?.contractexpir).format('DD/MM/YYYY')}
        </div>
      </div>
      <iframe
        src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${getImg?.link}#toolbar=0&scrollbar=0`}
        height='700'
        width='100%'
      />
    </div>
  );
};

export default ClientContract;
