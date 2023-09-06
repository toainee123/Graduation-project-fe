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
const Paymentmethod: React.FC<CustomizedFormProps> = ({ fields, onChange }) => {
  const [form] = Form.useForm();
  const formItemLayout = { labelCol: { span: 5 } };

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
          <Form.Item
            label='email'
            name='email'
            rules={[{ required: true, message: 'Không được để trống' }]}
            style={{ display: 'none' }}
          >
            <Input style={{ padding: '15px' }} />
          </Form.Item>
        </div>
        <div className='mt-4'>
          <Form.Item label='TMN Code' name='tmncode' rules={[{ required: true, message: 'Không được để trống' }]}>
            <Input style={{ padding: '15px' }} />
          </Form.Item>
        </div>
        <div className='mt-4'>
          <Form.Item label='Hash Secret' name='serectkey' rules={[{ required: true, message: 'Không được để trống' }]}>
            <Input style={{ padding: '15px' }} />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Paymentmethod;
