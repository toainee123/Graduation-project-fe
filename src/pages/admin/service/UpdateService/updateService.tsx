import { Form, Input, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getService, updateService, updateServices } from 'src/api/service';

const UpdateService = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [changeCode, setChangeCode] = useState('');
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    const getOneService = async (id: any) => {
      const { data } = await getService(id);
      setService(data.result);
      form.setFieldsValue({
        name: data.result?.name,
        price: data.result?.price,
        code: data.result?.code,
      });
    };
    getOneService(id);
  }, [id]);

  const handleChange = (value: any) => {
    setChangeCode(value);
  };
  const Onsubmit = async (data: any) => {
    const result = {
      name: data.name,
      code: changeCode,
      price: data.price,
    };
    await updateServices(Number(id), result)
      .then((res) => {
        message.success(`Sửa dịch vụ ${result.name} thành công`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  return (
    <>
      <div className='title_page'>
        <h1>Sửa dịch vụ</h1>
      </div>
      <div className='float-right '>
        <button
          onClick={() => navigate(-1)}
          className='focus:outline-none text-black bg-gray-300  hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
        >
          <i className='fa-solid fa-angles-left'></i> Quay về
        </button>
      </div>
      <div className='' style={{ marginTop: 80 }}>
        <Form size='large' form={form} onFinish={Onsubmit}>
          <div className='lg:flex justify-between py-2 items-center gap-8 md:justify-start gap-8'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Tên dịch vụ <b style={{ color: 'red' }}>*</b>
            </label>
            <div className='w-full'>
              <Form.Item name='name' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                <Input type='text' placeholder='Tên dịch vụ' />
              </Form.Item>
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Loại <b style={{ color: 'red' }}>*</b>
            </label>
            <div className='w-full items-center'>
              <Form.Item name='code' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                <Select defaultValue='Dịch vụ' size='large' className='w-full' onChange={handleChange}>
                  <Option value='ELECTRIC'>Điện</Option>
                  <Option value='WATER'>Nước</Option>
                  <Option value='OTHER'>Khác</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
            <label htmlFor='' className=' text-base font-semibold' style={{ marginRight: 73 }}>
              Giá <b style={{ color: 'red' }}>*</b>
            </label>
            <div className='' style={{ marginRight: 100 }}>
              <Form.Item name='price' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                <Input
                  type='number'
                  style={{ borderRadius: 6, marginRight: 200 }}
                  className='w-full outline-0 md: my-2'
                  placeholder='Giá của tài san'
                />
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
    </>
  );
};

export default UpdateService;
