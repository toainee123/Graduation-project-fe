import { DatePicker, DatePickerProps, Select } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateKeepRoom = () => {
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const [estimateTimeOrderFrom, setEstimateTimeOrderFrom] = useState('');
  const [estimateTimeRoomTo, setEstimateTimeRoomTo] = useState('');
  const [homeId, setHomeId] = useState([]);

  const estimateTimeOrder: DatePickerProps['onChange'] = (date, dateString) => {
    setEstimateTimeOrderFrom(dateString);
  };
  const estimateTimeRoom: DatePickerProps['onChange'] = (data, dateString) => {
    setEstimateTimeRoomTo(dateString);
  };
  const handleChangeHomeId = (value: any) => {
    setHomeId(value);
  };
  const Onsubmit = (data: any) => {
    const result = {
      name: data.name,
      homeId: homeId,
      bookingDate: estimateTimeOrderFrom,
      checkInDate: estimateTimeRoomTo,
      phone: data.phoneNumber,
      note: data.note,
      moneyOrder: data.moneyOrder,
    };
    console.log('result', result);
  };
  return (
    <div>
      <div className='border-solid border-2 border-grey-300 shadow-lg shadow-grey-300/50 mt-4'>
        <div className='text-lg text-center font-medium mt-3'>Thêm mới cọc phòng</div>
        <form onSubmit={handleSubmit(Onsubmit)}>
          <div className='mt-20 mb-3 '>
            <div className='flex justify-center'>
              <div className=''>
                <div>
                  <label htmlFor='' className='text-md mr-2'>
                    Số nhà
                  </label>
                  <Select
                    defaultValue='Danh sách nhà'
                    style={{ width: '200', marginRight: '10px' }}
                    onChange={handleChangeHomeId}
                    options={[
                      {
                        options: [
                          { label: 'Nhà 502', value: 'jack' },
                          { label: 'Nhà 503', value: 'lucy' },
                        ],
                      },
                    ]}
                  />
                </div>
                <div className='mt-2'>
                  <label htmlFor=''>Họ và tên người cọc</label>
                  <input placeholder='Họ và tên người cọc' {...register('name')} />
                </div>
                <div className='mt-2'>
                  <label htmlFor=''>Số điện thoại</label>
                  <input placeholder='Số điện thoại người cọc' {...register('phoneNumber')} />
                </div>
                <div className='mt-2'>
                  <label htmlFor=''>Thời gian dự kiến nhận phòng</label>
                  <br />
                  <DatePicker onChange={estimateTimeRoom} name='estimateTimeRoom' />
                </div>
                <div className='mt-2'>
                  <label htmlFor=''>Ghi chú</label>
                  <input placeholder='Ghi chú thêm' {...register('note')} width={500} height={50} name='note' />
                </div>
              </div>
              <div className='ml-3'>
                <div>
                  <label htmlFor='' className='text-md mr-2'>
                    Số phòng
                  </label>
                  <br />
                  <Select
                    defaultValue='Danh sách nhà'
                    style={{ width: '200', marginRight: '10px' }}
                    options={[
                      {
                        options: [
                          { label: 'Nhà 502', value: 'jack' },
                          { label: 'Nhà 503', value: 'lucy' },
                        ],
                      },
                    ]}
                  />
                </div>
                <div className='mt-2'>
                  <label htmlFor=''>Thời gian đặt cọc</label>
                  <br />
                  <DatePicker onChange={estimateTimeOrder} name='estimateTimeOrder' />
                </div>
                <div className='mt-2'>
                  <label htmlFor=''>Số tiền đặt cọc</label>
                  <input placeholder='Số tiền đặt cọc' {...register('moneyOrder')} />
                </div>
              </div>
            </div>
          </div>
          <button className='text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateKeepRoom;
