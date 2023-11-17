import { DatePicker, DatePickerProps, Form, Input, Select, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getAsset, updateAsset } from 'src/api/assets';
import { getRoom } from 'src/api/charge';
import { getListHouse } from 'src/api/house';
const UpdateAssets = () => {
  const { handleSubmit, register, reset, setValue } = useForm();
  const [form] = Form.useForm();
  const [house, setHouse] = useState([]);
  const [homeId, setHomeId] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [dataUse, setDateUse] = useState('');
  const [estimateTimeOrderFrom, setEstimateTimeOrderFrom] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAssetByID = async () => {
      const { data } = await getAsset(id);
      form.setFieldsValue({
        houseId: data.houseId,
        roomId: data.roomId,
        price: data.price,
        name: data.name,
        dateUse: moment(data.dateuse),
        amount: data.amount,
      });
    };
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
    getAssetByID();
  }, [id]);

  const estimateTimeOrder: DatePickerProps['onChange'] = (date, dateString) => {
    setEstimateTimeOrderFrom(dateString);
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
  const handleChangeRoomId = (value: any) => {
    setRoomId(value);
  };

  const Onsubmit = async (data: any) => {
    const result = {
      houseId: data.houseId,
      roomId: data.roomId,
      name: data.name,
      amount: data.amount,
      price: data.price,
      dateUse: estimateTimeOrderFrom,
    };
    await updateAsset(id, result)
      .then((res) => {
        message.success(`Cập nhật thành công`);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  return (
    <div>
      <div>
        <div className='title_page'>
          <h1>Cập nhật dịch vụ</h1>
        </div>
        <div className='float-right '>
          <button
            onClick={() => navigate(-1)}
            className='focus:outline-none text-black bg-gray-300  hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
          >
            <i className='fa-solid fa-angles-left'></i> Quay về
          </button>
        </div>
        <div className='mt-8' style={{ marginTop: 80 }}>
          <div className='mt-8'>
            <Form size='large' form={form} onFinish={Onsubmit}>
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
                    <Select
                      defaultValue='Danh sách phòng'
                      size='large'
                      className='w-full'
                      onChange={handleChangeRoomId}
                    >
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
                  <Form.Item name='dateUse' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
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
      </div>
    </div>
  );
};

export default UpdateAssets;
