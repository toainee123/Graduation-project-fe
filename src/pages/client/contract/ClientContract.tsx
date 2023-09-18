import { Button, Result } from 'antd';
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
  console.log('lnik', getImg?.link);

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
        <Link className='text-blue-500 font-base' target='_blank' to={getImg?.link}>
          Xem chi tiết hợp đồng
        </Link>
      </div>
      {getImg?.link ? (
        <img src={getImg?.link} width='100%' height='700' />
      ) : (
        <Result
          title='Chưa có hợp đồng nào được tạo ra'
          extra={
            <Button type='primary' key='console'>
              <Link to={'/'}>Quay về</Link>
            </Button>
          }
        />
      )}
      {/* <iframe
        src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${getImg?.link}#toolbar=0&scrollbar=0`}
        height='700'
        width='100%'
      /> */}
    </div>
  );
};

export default ClientContract;
