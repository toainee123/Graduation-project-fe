import { useEffect, useState } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { getUserInfomation } from 'src/api/infomation';
import moment from 'moment';

type TRemoteUser = {
  email: string;
  name: string;
  phone: string;
  address: string;
  bod: string;
  cccd: string;
  daterangecccd: string;
  issuedcccdby: string;
};

export const ClientInfomation = () => {
  const [form] = Form.useForm<TRemoteUser>();

  const [user, setUser] = useState<TRemoteUser>();

  useEffect(() => {
    const getUserInfor = async () => {
      const { data } = await getUserInfomation();
      setUser(data?.data);
    };
    getUserInfor();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        daterangecccd: moment(user.daterangecccd).format('DD/MM/YYYY'),
        bod: moment(user.bod).format('DD/MM/YYYY') ?? '',
      });
    }
  }, [user]);

  console.log(moment(user?.daterangecccd).format('DD/MM/YYYY'));

  return (
    <>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Thông Tin Cá Nhân</strong>
          </h2>
        </div>
      </div>
      <Form
        form={form}
        layout='vertical'
        onFieldsChange={(_, allFields: any) => {
          // props?.onChange(allFields);
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item label='Họ và tên:' name='name'>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label='Địa chỉ:' name='address'>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label='Địa chỉ email:' name='email'>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={8} span={24}>
            <Form.Item name='cccd' label='CMND/ CCCD số:' className='label-space'>
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col lg={8} span={24}>
            <Form.Item name='daterangecccd' label='Ngày cấp:' className='label-space'>
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col lg={8} span={24}>
            <Form.Item name='issuedcccdby' label='Nơi cấp:' className='label-space'>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={12} span={24}>
            <Form.Item name='phone' label='Điện thoại: ' className='label-space'>
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col lg={12} span={24}>
            <Form.Item name='bod' label='Ngày sinh:' className='label-space'>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
