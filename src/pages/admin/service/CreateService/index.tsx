import { Form, Input, InputNumber, Select, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService } from 'src/api/service';
import './style.scss';

const CreateSevice = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [changeCode, setChangeCode] = useState('');
  const [limitprice, setLimitPrice] = useState(Number);
  const handleChange = (value: any) => {
    console.log('Selected value:', value);
    setChangeCode(value);
  };
  const Onsubmit = (data: any) => {
    console.log('data', data);

    const result = {
      ...data,
      code: changeCode,
    };
    console.log('result', result);
    createService(result)
      .then((res) => {
        navigate(-1);
        message.success(`Thêm dịch vụ ${result.name} thành công`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const onChange = (value: any) => {
    setLimitPrice(value);
  };
  return (
    <>
      <div className='title_page'>
        <h1>Thêm mới dịch vụ</h1>
      </div>
      <div className='float-right'></div>
      <div className=''>
        <Form size='large' onFinish={Onsubmit}>
          <div className='grid grid-cols-[100px_1fr_100px_1fr] gap-8'>
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
          <div className='w-full grid grid-cols-[130px_1fr_160px_1fr] mt-2'>
            <label htmlFor='' className=' text-base font-semibold' style={{ marginRight: 73 }}>
              Giá <b style={{ color: 'red' }}>*</b>
            </label>
            <div className=' w-full'>
              <Form.Item name='price' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                <InputNumber
                  formatter={(value) =>
                    value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(?: \b|-)([1-9]{1, 2}[0]?|1000)\b/g)
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                  controls={false}
                  className='w-full outline-0'
                  placeholder='Đơn giá tài sản'
                  addonAfter='VNĐ'
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <div className='sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end'>
              <button
                onClick={() => navigate(-1)}
                className='focus:outline-none text-black bg-gray-300  hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
              >
                <i className='fa-solid fa-angles-left'></i> Quay về
              </button>
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

export default CreateSevice;
