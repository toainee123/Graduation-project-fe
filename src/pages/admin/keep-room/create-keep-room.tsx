import { DatePicker, DatePickerProps, Form, Input, InputNumber, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getListHouse } from 'src/api/house';
import { createDeposit } from 'src/api/keep-room';
import { getRoom } from 'src/api/room';

const CreateKeepRoom = () => {
  const navigate = useNavigate();
  const [estimateTimeOrderFrom, setEstimateTimeOrderFrom] = useState('');
  const [estimateTimeRoomTo, setEstimateTimeRoomTo] = useState('');
  const [homeId, setHomeId] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [room, setRoom] = useState([]);
  const [house, setHouse] = useState([]);
  const [limitprice, setLimitPrice] = useState(Number);

  useEffect(() => {
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
  }, []);

  const bookingDate: DatePickerProps['onChange'] = (date, dateString) => {
    setEstimateTimeOrderFrom(dateString);
  };
  const checkInDate: DatePickerProps['onChange'] = (data, dateString) => {
    setEstimateTimeRoomTo(dateString);
  };
  const handleChangeRoomId = (value: any) => {
    setRoomId(value);
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
  const onFinish = (data: any) => {
    const result = {
      name: data.name,
      roomId: roomId,
      houseId: homeId,
      bookingDate: estimateTimeOrderFrom,
      checkInDate: estimateTimeRoomTo,
      phone: data.phoneNumber,
      note: data.note,
      money: data.moneyOrder,
    };
    createDeposit(result)
      .then((res) => {
        message.success('Thêm mới thành công');
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const onChange = (value: any) => {
    setLimitPrice(value);
  };
  return (
    <div>
      <div className='title_page'>
        <h1>Thêm mới cọc phòng</h1>
      </div>
      <div className='float-right'>
        <button
          onClick={() => navigate(-1)}
          className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
        >
          <i className='fa-solid fa-angles-left'></i> Quay về
        </button>
      </div>
      <div className='mt-8' style={{ marginTop: 100 }}>
        <div className='mt-8'>
          <Form size='large' onFinish={onFinish}>
            <div className='grid lg:grid-cols-[100px_1fr_100px_1fr] lg:gap-8 md:grid-cols-1 mt-4'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Nhà <b className='color-red'>*</b>
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
                Phòng số <b className='color-red'>*</b>
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
            <div className='grid lg:grid-cols-[100px_1fr_100px_1fr] lg:gap-8 md:grid-cols-1 mt-4'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Tên người đặt cọc <b className='color-red'>*</b>
              </label>
              <div className='w-full'>
                <Form.Item name='name' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input
                    type='text'
                    style={{ borderRadius: 6 }}
                    className='w-full outline-0 md: my-2'
                    placeholder='Tên người đặt cọc'
                  />
                </Form.Item>
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Số điện thoại <b className='color-red'>*</b>
              </label>
              <div className='w-full'>
                <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input type='number' className='w-full outline-0 md: my-2' placeholder='Số điện thoại' />
                </Form.Item>
              </div>
            </div>
            <div className='grid lg:grid-cols-[100px_1fr_100px_1fr] lg:gap-8 md:grid-cols-1 mt-4'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Giá <b className='color-red'>*</b>
              </label>
              <div className='w-full'>
                <Form.Item name='moneyOrder' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <InputNumber
                    formatter={(value) =>
                      value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(?: \b|-)([1-9]{1, 2}[0]?|1000)\b/g)
                    }
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                    controls={false}
                    className='w-full outline-0'
                    placeholder='Giá cọc'
                    addonAfter='VNĐ'
                  />
                </Form.Item>
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Ngày đặt cọc <b className='color-red'>*</b>
              </label>
              <div className='w-full'>
                <Form.Item name='bookingDate' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <DatePicker className='w-full' onChange={bookingDate} name='bookingDate' />
                </Form.Item>
              </div>
            </div>
            <div className='grid lg:grid-cols-[100px_1fr_100px_1fr] lg:gap-8 md:grid-cols-1 mt-4'>
              <label htmlFor='' className=' text-base font-semibold'>
                Ngày dự kiến nhận phòng <b className='color-red'>*</b>
              </label>
              <div className='w-full'>
                <Form.Item name='checkInDate' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <DatePicker className='w-full' onChange={checkInDate} name='checkInDate' />
                </Form.Item>
              </div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Ghi chú <b className='color-red'>*</b>
              </label>
              <Form.Item
                name='note'
                rules={[{ required: true, message: 'Không được bỏ trống' }]}
                style={{ marginRight: 20 }}
              >
                <Input.TextArea
                  rows={10}
                  cols={201}
                  className='textArea'
                  maxLength={500}
                  showCount={true}
                  placeholder='Ghi chú'
                  style={{ width: 300, height: 100 }}
                />
              </Form.Item>
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
    </div>
  );
};

export default CreateKeepRoom;
