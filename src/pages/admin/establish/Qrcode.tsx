import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col, Upload, Typography, Modal } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { getDistrict, getProvinces, getWards } from 'src/api/provinces/provinces';
import { RcFile } from 'antd/lib/upload';
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
}

const { Title } = Typography;
const Qrcode: React.FC<CustomizedFormProps> = ({ onChange }) => {
  const [form] = Form.useForm();
  const [countImg, setCountImg] = useState(0);
  const formItemLayout = { labelCol: { span: 5 } };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {}, []);
  const handleChange: any = ({ fileList }: any) => {
    onChange(fileList);
    setCountImg(fileList.length);
  };

  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  return (
    <>
      <Title level={4}>Ảnh QRCODE thanh toán: </Title>
      <Upload
        listType='picture-card'
        onChange={handleChange}
        beforeUpload={() => {
          return false;
        }}
        onPreview={handlePreview}
        multiple={false}
        maxCount={1}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Qrcode;
