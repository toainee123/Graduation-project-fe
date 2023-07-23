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

  const [provice, setProvice] = useState([]);
  const [district, setDistrict] = useState([{ value: 'Tất cả', label: 'Tất cả' }]);
  const [ward, setWard] = useState([{ value: 'Tất cả', label: 'Tất cả' }]);
  useEffect(() => {
    const getProvices = async () => {
      const { data } = await getProvinces();
      const provices = data?.results.map((item: any) => {
        return {
          value: item.province_id,
          label: item.province_name,
        };
      });

      setProvice(provices);
    };
    getProvices();
  }, []);

  useEffect(() => { }, []);

  const handleGetDistrict = async (idProvice: number) => {
    const { data } = await getDistrict(idProvice);

    const districts = data?.results.map((item: any) => {
      return {
        value: item.district_id,
        label: item.district_name,
      };
    });

    setDistrict(districts);
  };

  const handleGetWard = async (idDistrict: number) => {
    const { data } = await getWards(idDistrict);

    console.log(data);

    const wards = data?.results.map((item: any) => {
      return {
        value: item.ward_id,
        label: item.ward_name,
      };
    });

    setWard(wards);
  };
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

        <div className='flex justify-between'>
          <Form.Item
            name='ci_number'
            label='CMND/ CCCD số:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{ span: 7 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='ci_datecreate'
            label='Ngày cấp:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{}}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='ci_placecreate'
            label='Nơi cấp:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
          >
            <Input />
          </Form.Item>
        </div>

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
          <div style={{ width: '30%', marginRight: '10px' }}></div>
        </div>

        <div className='flex justify-between'>
          <Form.Item
            name='provice'
            label='Tỉnh/TP:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{ span: 7 }}
          >
            <Select
              defaultValue='Tất cả'
              options={provice}
              onChange={(e: any) => {
                handleGetDistrict(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name='district'
            label='Quận/ huyện:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{}}
          >
            <Select
              defaultValue='Tất cả'
              options={district}
              onChange={(e: any) => {
                handleGetWard(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name='ward'
            label='Phường/ xã:'
            className='label-space'
            style={{ width: '30%', marginRight: '10px' }}
            labelCol={{}}
          >
            <Select defaultValue='Tất cả' options={ward} />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default Inforuser;
