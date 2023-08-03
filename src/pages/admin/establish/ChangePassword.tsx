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
const ChangePassword: React.FC<CustomizedFormProps> = ({ fields, onChange }) => {
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
          <Form.Item label='Mật khẩu cũ' name='passwordold'>
            <Input />
          </Form.Item>
        </div>

        <div className='mt-4'>
          <Form.Item label='Mật khẩu mới' name='passwordnew' className='mt-4'>
            <Input />
          </Form.Item>
        </div>
        <div className='mt-4'>
          <Form.Item
            label='Nhập lại mật khẩu mới'
            name='passwordnew_confirm'
            className='mt-4'
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('passwordnew') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Không khớp'));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
