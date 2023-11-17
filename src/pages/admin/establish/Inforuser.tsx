import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getDistrict, getProvinces, getWards } from 'src/api/provinces/provinces';
type Props = {};

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}
interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}
const Inforuser: React.FC<CustomizedFormProps> = ({ fields, onChange }) => {
  const [form] = Form.useForm();
  const formItemLayout = { labelCol: { span: 3 } };

  useEffect(() => {}, []);

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields: any) => {
          onChange(allFields);
        }}
      >
        <div className='mt-4'>
          <Form.Item label='Họ và tên:' name='fullname' rules={[{ required: true, message: 'Không được để trống' }]}>
            <Input />
          </Form.Item>
        </div>

        <div className='mt-4'>
          <Form.Item
            label='Địa chỉ:'
            name='address'
            className='mt-4'
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='mt-4'>
          <Form.Item
            label='Địa chỉ email:'
            name='email'
            className='mt-4'
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className='flex justify-between'></div>

        <div className='flex justify-between gap-8 mt-4'>
          <Form.Item
            name='phone_number'
            label='Điện thoại: '
            className='label-space'
            style={{ width: '70%', marginRight: '10px' }}
            labelCol={{ span: 6 }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='birthday'
            label='Ngày sinh:'
            className='label-space'
            style={{ width: '70%', marginLeft: '10px' }}
            labelCol={{ span: 5 }}
            rules={[{ required: true, message: 'Không được để trống' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Inforuser;
