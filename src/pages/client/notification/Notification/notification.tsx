import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Tag, message } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getAllNotification, sendNotification } from 'src/api/notification';
import { convertDate } from 'src/utils/helps';

const Notification = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getListNotification = async () => {
      const { data } = await getAllNotification();
      setData(data);
    };
    getListNotification();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const Onsubmit = async (value: any) => {
    console.log('value', value.content);
    const result = {
      content: value.content,
    };
    await sendNotification(result)
      .then((res) => {
        message.success('Gửi thông báo thành công');
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
        const getListNotification = async () => {
          const { data } = await getAllNotification();
          setData(data);
        };
        getListNotification();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
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
              <ExclamationCircleOutlined className='icon-btn' /> Gửi yêu cầu
            </button>
          </div>
        </div>

        <Modal
          title='Gửi yêu cầu'
          visible={isModalVisible}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                // form.resetFields();
                Onsubmit(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form onFinish={Onsubmit} form={form}>
            <label htmlFor='content' className='w-64 text-base font-semibold'>
              Nội dung thông báo<b className='color-red'>*</b>
            </label>
            <div style={{ marginTop: 15 }}>
              <Form.Item name='content' rules={[{ required: true, message: 'Không được bỏ trống' }]}>
                <Input className='border-2 p-2 outline-0 w-full' placeholder='Nội dung thông báo' />
              </Form.Item>
            </div>
          </Form>
        </Modal>
        <div>
          <div className='flex flex-col'>
            <div className='overflow-x-auto '>
              <div className='inline-block min-w-full '>
                <div className='overflow-hidden'>
                  <table className='min-w-full'>
                    <thead className='bg-gray-200 border-b text-center'>
                      <tr className='text-center'>
                        <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                          STT
                        </th>
                        <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                          Nội dung báo cáo
                        </th>
                        <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                          Trạng thái
                        </th>
                        <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                          Ngày gửi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item: any, index: number) => (
                        <tr
                          key={index}
                          className='text-center bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
                        >
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {item.content}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {item?.status ? (<Tag style={{ width: '100%', cursor: "pointer", textAlign: 'center' }} color="#87d068">Đã được xử lý</Tag>) : (
                              <Tag style={{ width: '100%', cursor: "pointer", textAlign: 'center' }} color="#f50">Chưa được xử lý</Tag>
                            )}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {convertDate(item?.datenotification)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
