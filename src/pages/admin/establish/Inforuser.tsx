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
        <Form.Item label='Họ và tên:' name='fullname'>
          <Input />
        </Form.Item>

        <Form.Item label='Địa chỉ:' name='address'>
          <Input />
        </Form.Item>
        <Form.Item label='Địa chỉ email:' name='email'>
          <Input />
        </Form.Item>

        <div className='flex justify-between'></div>

        <div className='flex justify-between'>
          <Form.Item
            name='phone_number'
            label='Điện thoại: '
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{ span: 7 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='birthday'
            label='Ngày sinh:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{}}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='ci_number'
            label='CMND/ CCCD số:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{ span: 7 }}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Inforuser;
