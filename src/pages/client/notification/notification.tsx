import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getAllRoom } from 'src/api/room';

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [room, setRoom] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const getRoom = async () => {
      const { data } = await getAllRoom();
      setRoom(data.responses);
    };
    getRoom();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (data: any) => {};
  return (
    <>
      <div className='es-container'>
        <div className='title'>
          <div className='title--name'>
            <h2>
              <strong>Báo cáo</strong>
            </h2>
          </div>
          <div className='title--button flex items-center'>
            <button
              className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded '
              onClick={showModal}
            >
              <ExclamationCircleOutlined className='icon-btn' /> Gửi báo cáo
            </button>
          </div>
        </div>
        <Modal title='Tạo báo cáo' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form onFinish={handleSubmit}>
            <div>
              <label htmlFor='' className='w-64 text-base font-semibold'>
                Phòng<b className='color-red'>*</b>
              </label>
              <div className='w-full' style={{ marginTop: 10 }}>
                <Form.Item name='title'>
                  <Input className='border-2 p-2 outline-0 w-full' placeholder='Tiêu đề email' />
                </Form.Item>
              </div>
            </div>
            <div>
              <label htmlFor='' style={{ marginRight: 38 }}>
                Phòng
              </label>
              <Select defaultValue='Danh sách nhà' size='large' className='w-full'>
                {room.map((item: any) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Notification;
