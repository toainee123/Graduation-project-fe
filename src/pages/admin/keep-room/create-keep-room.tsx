import { DatePicker, DatePickerProps, Select } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { createDeposit } from 'src/api/keep-room';
import { urlRouter } from 'src/utils/constants';

const CreateKeepRoom = () => {
  const { register, handleSubmit } = useForm();
  const [estimateTimeOrderFrom, setEstimateTimeOrderFrom] = useState('');
  const [estimateTimeRoomTo, setEstimateTimeRoomTo] = useState('');
  const [homeId, setHomeId] = useState([]);

  const estimateTimeOrder: DatePickerProps['onChange'] = (date, dateString) => {
    setEstimateTimeOrderFrom(dateString);
    console.log(dateString, 'dateString');
  };
  const estimateTimeRoom: DatePickerProps['onChange'] = (data, dateString) => {
    setEstimateTimeRoomTo(dateString);
  };
  const handleChangeHomeId = (value: any) => {
    setHomeId(value);
  };
  console.log('estimateTimeOrderFrom', estimateTimeOrderFrom);
  const Onsubmit = (data: any) => {
    const result = {
      name: data.name,
      roomId: 1,
      houseId: homeId,
      bookingDate: estimateTimeOrderFrom,
      checkInDate: estimateTimeRoomTo,
      phone: data.phoneNumber,
      note: data.note,
      money: data.moneyOrder,
    };
    createDeposit(result);
  };

  return (
    <div>
      <div className='text-lg text-center font-medium mt-3'>Thêm mới cọc phòng</div>

      <div className='mt-8'>
        <form onSubmit={handleSubmit(Onsubmit)}>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Nhà <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <Select
                defaultValue='Danh sách nhà'
                size='large'
                className='w-full'
                onChange={handleChangeHomeId}
                options={[
                  {
                    options: [
                      { label: 'Nhà 502', value: 1 },
                      { label: 'Nhà 503', value: 2 },
                    ],
                  },
                ]}
              />
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Họ và tên người cọc <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <input
                className='border-2 p-4 outline-0 w-full h-58px'
                placeholder='Họ và tên người cọc'
                {...register('name')}
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Số điện thoại <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <input
                className='border-2 p-4 outline-0 w-full h-58px'
                type='number'
                placeholder='Số điện thoại người cọc'
                {...register('phoneNumber')}
              />
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Thời gian dự kiến nhận phòng <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <DatePicker className='w-full h-58px' onChange={estimateTimeRoom} name='estimateTimeRoom' />
            </div>
          </div>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Ghi chú<b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <input
                className='border-2 p-4 outline-0 w-full h-58px'
                placeholder='Ghi chú thêm'
                {...register('note')}
                width={500}
                height={50}
                name='note'
              />
            </div>

            <label htmlFor='' className='w-64 text-base font-semibold'>
              Thời gian đặt cọc <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <DatePicker className='w-full h-58px' onChange={estimateTimeOrder} name='estimateTimeOrder' />
            </div>
          </div>
          <div className='flex justify-between items-center gap-12 py-3'>
            <div className='flex'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Tiền cọc <b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px mr-20'>
                <input
                  className='border-2 p-4 outline-0 w-full h-58px'
                  type='number'
                  placeholder='Số tiền đặt cọc'
                  {...register('moneyOrder')}
                />
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 py-3 mt-8 bg-gray-100 border rounded flex justify-end'>
            <div>
              <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2'>
                <i className='fa-solid fa-check'></i> Gửi
              </button>
              <Link to={`/admin/${urlRouter.CREATE_KEEP_ROOM}`}>
                <button className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 '>
                  Hủy
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateKeepRoom;
