import React from 'react';
import { DatePicker, DatePickerProps, Select, Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import { getListDeposit } from 'src/api/deposit';
import { getListHouse } from 'src/api/house';
import { getRoom } from 'src/api/charge';
import { getAsset, updateAsset } from 'src/api/assets';
import moment from 'moment';
const UpdateAssets = () => {
  const { handleSubmit, register, reset, setValue, getValues } = useForm();
  const [house, setHouse] = useState([]);
  const [homeId, setHomeId] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [dataUse, setDateUse] = useState('');
  const [dateLiquidation, setDateLiquidation] = useState('');
  const [isLiquidation, setIsLiquidation] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getAssetByID = async () => {
      const { data } = await getAsset(id);
      reset(data);
      setIsLiquidation(data.isliquidation);
    };
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
    getAssetByID();
  }, [id]);
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
  const handleChangeRoomId = (value: any) => {
    setRoomId(value);
  };
  const handleRadioChange = (e: any) => {
    console.log('value', e.target.value);
    setValue('isLiquidation', e.target.value);
    setIsLiquidation(e.target.value);
  };
  const dateUseAsset: DatePickerProps['onChange'] = (date, dateString) => {
    setDateUse(dateString);
    setValue('dateuse', moment(dateString, 'YYYY-MM-DD'));
  };
  const DateLiquidation: DatePickerProps['onChange'] = (date, dateString) => {
    setDateLiquidation(dateString);
    setValue('dateLiquidation', moment(dateString, 'YYYY-MM-DD'));
    console.log('dateString', dateString);
  };

  const Onsubmit = async (data: any) => {
    const result = {
      houseId: data.houseId,
      roomId: data.roomId,
      name: data.name,
      amount: data.amount,
      price: data.price,
      isLiquidation: isLiquidation,
      dateUse: data.dateuse,
      dateLiquidation: null && dateLiquidation,
    };
    await updateAsset(id, isLiquidation === true ? { ...result, dateLiquidation: dateLiquidation } : result)
      .then((res) => {
        console.log('successfull');
        console.log('res', res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div>
        <h1 className='text-lg font-medium mt-3'>Thêm mới tài sản</h1>
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
                  value={getValues('houseId')}
                  {...register('houseId')}
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
                <Select
                  defaultValue='Danh sách phòng'
                  size='large'
                  value={getValues('roomId')}
                  {...register('nameRoom')}
                  className='w-full'
                  onChange={handleChangeRoomId}
                >
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
                Tên tài sản <b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px'>
                <input
                  className='border-2 p-4 outline-0 w-full h-58px'
                  type='text'
                  placeholder='Tên tài sản'
                  {...register('name')}
                />
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Giá tài sản<b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px'>
                <input
                  type='number'
                  className='border-2 p-4 outline-0 w-full h-58px'
                  placeholder='Giá tài sản'
                  {...register('price')}
                  width={500}
                  height={50}
                />
              </div>
            </div>
            <div className='flex justify-between items-center gap-12 py-3'>
              <label htmlFor='' className='w-64 text-base font-semibold flex items-center'>
                Số lượng<b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px'>
                <input
                  className='border-2 p-4 outline-0 w-full h-58px'
                  type='number'
                  placeholder='Số lượng'
                  {...register('amount')}
                />
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Tình trạng <b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px flex items-center'>
                <Radio.Group onChange={handleRadioChange} value={isLiquidation}>
                  <Radio value={true}>Đã thanh lý</Radio>
                  <Radio value={false}>Chưa thanh lý</Radio>
                </Radio.Group>
              </div>
            </div>
            <div className='flex justify-between items-center gap-12 py-3'>
              <label htmlFor='' className='w-64 text-base font-semibold flex items-center'>
                Ngày sử dụng<b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px '>
                <DatePicker
                  className='w-full h-58px'
                  value={moment(getValues('dateuse'), 'YYYY-MM-DD')}
                  onChange={dateUseAsset}
                  name='estimateTimeOrder'
                />
              </div>
            </div>
            {isLiquidation === true ? (
              <div className=''>
                <label htmlFor='' className='text-base font-semibold flex items-center'>
                  Ngày thanh lý
                </label>
                <div className='w-full h-58px'>
                  <DatePicker
                    className='w-full h-58px'
                    value={moment(getValues('dateliquidation'), 'YYYY-MM-DD')}
                    {...register('dateliquidation')}
                    onChange={DateLiquidation}
                    name='dateLiquidation'
                  />
                </div>
              </div>
            ) : (
              ''
            )}
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
    </div>
  );
};

export default UpdateAssets;
