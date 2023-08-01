import { DatePicker, DatePickerProps, Select, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getListHouse } from 'src/api/house';
import { getDeposit, updateDeposit } from 'src/api/deposit';
import { getRoom } from 'src/api/room';
import { urlRouter } from 'src/utils/constants';

const UpdateDeposit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [estimateTimeOrderFrom, setEstimateTimeOrderFrom] = useState('');
  const [estimateTimeRoomTo, setEstimateTimeRoomTo] = useState('');
  const [homeId, setHomeId] = useState([]);
  const [house, setHouse] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [nameHouse, setNameHouse] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const dateFormatList = ['DD/MM/YYYY'];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    const getOneDeposit = async (id: any) => {
      const { data } = await getDeposit(id);
      setNameHouse(data?.nameHouse);
      const payload = {
        ...data,
      };
      reset(payload);
      console.log(getValues());
    };
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
    getOneDeposit(id);
  }, [id]);

  const estimateTimeOrder: DatePickerProps['onChange'] = (date, dateString) => {
    setEstimateTimeOrderFrom(dateString);
    setValue('bookingdate', moment(dateString, 'YYYY-MM-DD'));
  };
  const estimateTimeRoom: DatePickerProps['onChange'] = (data, dateString) => {
    setEstimateTimeRoomTo(dateString);
    setValue('checkindate', moment(dateString, 'YYYY-MM-DD'));
  };
  const handleChangeRoomId = (value: any) => {
    setRoomId(value);
  };
  const handleChangeHomeId = async (value: any) => {
    setValue('houseId', value);
    setHomeId(value);
    const getRoomWithHomeId = await getRoom(value)
      .then((res) => {
        setRoom(res.data.result.responses);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const info = () => {
    messageApi.success('Đã thêm thành công');
  };
  const handleBack = () => {
    navigate(-1);
  };
  const Onsubmit = async (data: any) => {
    await updateDeposit(Number(id), {
      houseId: data.houseId,
      roomId: data.roomId,
      name: data.name,
      phone: data.phone,
      money: data.money,
      note: data.note,
      bookingDate: data.bookingdate,
      checkInDate: data.checkindate,
    }).then((res) => {
      // info();
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    });
  };
  return (
    <div>
      <div className='text-lg font-medium mt-3'>
        <h1>Thêm mới cọc phòng</h1>
      </div>
      <div className='mt-8'>
        <form onSubmit={handleSubmit(Onsubmit)}>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Nhà <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <Select
                // defaultValue={getValues('houseId')}
                size='large'
                value={getValues('houseId')}
                {...register('houseId')}
                className='w-full'
                onChange={handleChangeHomeId}
              >
                {house.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Phòng <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <Select defaultValue='Danh sách nhà' size='large' className='w-full' onChange={handleChangeRoomId}>
                {room.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
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
                {...register('phone')}
              />
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Thời gian dự kiến nhận phòng <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <DatePicker
                className='w-full h-58px'
                value={moment(getValues('bookingdate'), 'YYYY-MM-DD')}
                onChange={estimateTimeRoom}
                name='estimateTimeRoom'
                format={'YYYY-MM-DD'}
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Thời gian đặt cọc <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px'>
              <DatePicker
                className='w-full h-58px'
                value={moment(getValues('checkindate'), 'YYYY-MM-DD')}
                {...register('checkindate')}
                onChange={estimateTimeOrder}
                name='bookingdate'
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
              Tiền cọc <b className='color-red'>*</b>
            </label>
            <div className='w-full h-58px '>
              <input
                className='border-2 p-4 outline-0 w-full h-58px'
                type='number'
                placeholder='Số tiền đặt cọc'
                {...register('money')}
              />
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Ghi chú
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
          </div>
          <div className='sticky bottom-0 py-3 mt-8 bg-gray-100 border rounded flex justify-end'>
            <div>
              <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2'>
                <i className='fa-solid fa-check'></i> Gửi
              </button>
              <Link to={`/admin/${urlRouter.CREATE_KEEP_ROOM}`}>
                <button
                  className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2'
                  onClick={handleBack}
                >
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

export default UpdateDeposit;
