import { DatePicker, DatePickerProps, Form, Input, Select, message } from 'antd';
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
  const { getValues } = useForm();

  const [booking, setBooking] = useState('');
  const [checkin, setCheckin] = useState('');
  const [homeId, setHomeId] = useState([]);
  const [house, setHouse] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [nameHouse, setNameHouse] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    const getOneDeposit = async (id: any) => {
      const { data } = await getDeposit(id);
      form.setFieldsValue({
        houseId: data.houseId,
        roomId: data.roomId,
        name: data.name,
        phone: data.phone,
        money: data.money,
        note: data.note,
        bookingDate: moment(data.bookingDate),
        checkInDate: moment(data.checkindate),
      });
    };
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
    getOneDeposit(id);
  }, [id]);
  console.log('getValues', getValues('bookingdate'));

  const bookingDate: DatePickerProps['onChange'] = (date, dateString) => {
    setBooking(dateString);
  };
  const checkInDate: DatePickerProps['onChange'] = (data, dateString) => {
    setCheckin(dateString);
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

  const onFinish = async (data: any) => {
    await updateDeposit(Number(id), {
      houseId: data.houseId,
      roomId: data.roomId,
      name: data.name,
      phone: data.phone,
      money: data.money,
      note: data.note,
      bookingDate: booking,
      checkInDate: checkin,
    })
      .then((res) => {
        message.success('Đã cập nhật thành công');
        setTimeout(() => {
          navigate(-1);
        }, 3000);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  return (
    <div>
      <div className='title_page'>
        <h1>Cập nhật cọc phòng</h1>
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
          <Form size='large' form={form} onFinish={onFinish}>
            <div className='lg:flex justify-between py-2 items-center gap-8 md:justify-start gap-8'>
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
            <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
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
                <Form.Item name='phone' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input
                    type='number'
                    style={{ borderRadius: 6, width: 100 }}
                    className='w-full outline-0 md: my-2'
                    placeholder='Số điện thoại'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Giá <b className='color-red'>*</b>
              </label>
              <div className='w-full'>
                <Form.Item name='money' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                  <Input className='w-full outline-0 items-center md: my-2' type='number' placeholder='Giá' />
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
            <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
              <label htmlFor='' className='w-64 text-base font-semibold'>
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

export default UpdateDeposit;
