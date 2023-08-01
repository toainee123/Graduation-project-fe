import { DatePicker, DatePickerProps, Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createAsset } from 'src/api/assets';
import { getRoom } from 'src/api/charge';
import { getListDeposit } from 'src/api/deposit';
import { getListHouse } from 'src/api/house';
const CreateAssets = () => {
  const { register, handleSubmit } = useForm();
  const [homeId, setHomeId] = useState([]);
  const [data, setData] = useState([]);
  const [house, setHouse] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [room, setRoom] = useState([]);
  const [estimateTimeOrderFrom, setEstimateTimeOrderFrom] = useState('');
  const [dateLiquidation, setDateLiquidation] = useState('');
  const [status, setStatus] = useState(Boolean);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getDeposit = async () => {
      const { data } = await getListDeposit({});
      setData(data.responses);
    };
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
    getDeposit();
  }, []);
  const estimateTimeOrder: DatePickerProps['onChange'] = (date, dateString) => {
    setEstimateTimeOrderFrom(dateString);
  };

  const DateLiquidation: DatePickerProps['onChange'] = (date, dateString) => {
    setDateLiquidation(dateString);
  };
  const handleChangeHomeId = async (value: any) => {
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
    setStatus(e.target.value);
  };
  const Onsubmit = async (data: any) => {
    const result = {
      houseId: homeId,
      roomId: roomId,
      name: data.name,
      price: data.price,
      amount: Number(data.amount),
      dateUse: estimateTimeOrderFrom,
      isLiquidation: status,
      // dateLiquidation: dateLiquidation && dateLiquidation,
    };

    await createAsset(status === true ? { ...result, dateLiquidation: dateLiquidation } : result)
      .then((res) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const onFinish = (data: any) => {
    const result = {
      houseId: homeId,
      roomId: roomId,
      name: data.name,
      price: data.price,
      amount: Number(data.amount),
      dateUse: estimateTimeOrderFrom,
    };
    console.log('result', result);
  };
  return (
    <>
      <div>
        <div className='title_page'>
          <h1>Thêm tài sản</h1>
        </div>
        <div className='float-right'>
          <button
            onClick={() => navigate(-1)}
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
          >
            <i className='fa-solid fa-angles-left'></i> Quay về
          </button>
        </div>
        <br />
        <div className='mt-8'>
          {/* <form onSubmit={handleSubmit(Onsubmit)}>
            <div className='flex justify-between items-center gap-12 py-3'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Nhà <b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px'>
                <Select defaultValue='Danh sách nhà' size='large' className='w-full' onChange={handleChangeHomeId}>
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
                <Select defaultValue='Danh sách phòng' size='large' className='w-full' onChange={handleChangeRoomId}>
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
              <label htmlFor='' className='w-64 text-base font-semibold flex items-center'>
                Ngày sử dụng<b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px '>
                <DatePicker className='w-full h-58px' onChange={estimateTimeOrder} name='estimateTimeOrder' />
              </div>
            </div>
            <div className='flex justify-between items-center gap-12 py-3'>
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

              <label htmlFor='' className='w-64 text-base font-semibold'>
                Tình trạng <b className='color-red'>*</b>
              </label>
              <div className='w-full h-58px flex items-center'>
                <Radio.Group onChange={handleRadioChange}>
                  <Radio value={true}>Đã thanh lý</Radio>
                  <Radio value={false}>Chưa thanh lý</Radio>
                </Radio.Group>
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
            </div>
            {status === true ? (
              <div className='flex items-center gap-10 py-3'>
                <label htmlFor='' className='text-base font-semibold flex items-center'>
                  Ngày thanh lý<b className='color-red'>*</b>
                </label>
                <div className='h-58px mr-2'>
                  <DatePicker className='w-full h-58px' onChange={DateLiquidation} name='dateLiquidation' />
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
          </form> */}

          <Form size='large' onFinish={onFinish}>
            <div className='lg:flex justify-between py-2 items-center gap-8 md:justify-start gap-8'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Nhà
              </label>
              <div className='w-full'>
                <Form.Item name='houseId' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Select defaultValue='Danh sách nhà' size='large' className='w-full' onChange={handleChangeHomeId}>
                    {house.map((item: any, i: any) => (
                      <Select.Option key={i} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Phòng số
              </label>
              <div className='w-full items-center'>
                <Form.Item name='roomId' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Select defaultValue='Danh sách phòng' size='large' className='w-full' onChange={handleChangeRoomId}>
                    {room.map((item: any, i: any) => (
                      <Select.Option key={i} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Tên tài sản
              </label>
              <div className='w-full'>
                <Form.Item name='name' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input
                    type='text'
                    style={{ borderRadius: 6 }}
                    className='w-full outline-0 md: my-2'
                    placeholder='Tên sản sản'
                  />
                </Form.Item>
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Số lượng
              </label>
              <div className='w-full'>
                <Form.Item name='amount' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input
                    type='number'
                    style={{ borderRadius: 6, width: 100 }}
                    className='w-full outline-0 md: my-2'
                    placeholder='Số lượng'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Giá
              </label>
              <div className='w-full'>
                <Form.Item name='price' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input
                    className='w-full outline-0 items-center md: my-2'
                    type='number'
                    placeholder='Diện tích phòng (m2)'
                  />
                </Form.Item>
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Ngày sử dụng
              </label>
              <div className='w-full'>
                <Form.Item rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <DatePicker className='w-full' onChange={estimateTimeOrder} name='estimateTimeOrder' />
                </Form.Item>
              </div>
            </div>
            <Form.Item>
              <div className='sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end'>
                <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  '>
                  <i className='fa-solid fa-check'></i> Gửi
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateAssets;
