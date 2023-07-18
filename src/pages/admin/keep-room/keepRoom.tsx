import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, DatePickerProps, Form, Popconfirm, Select, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDeposit, getListDeposit } from 'src/api/keep-room';
import { fetchDeleteDeposit, fetchDeposit, selectSuccessDeposit } from 'src/features/deposit/deposit';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { convertDate } from 'src/utils/helps';

const KeepRoom = () => {
  const statusState = useAppSelector(selectSuccessDeposit);
  const [messageApi] = message.useMessage();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deposit, setDeposit] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const info = () => {
    messageApi.success('Đã xác nhận thành công');
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dateFormatList = ['DD/MM/YYYY'];
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const lastChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date);
  };
  useEffect(() => {
    const getDeposit = async () => {
      const { data } = await getListDeposit();
      setData(data.responses);
    };
    getDeposit();
  }, []);

  const handleChangeStatus = async (id: any, status: any) => {
    const payload = {
      id,
      status: status,
    };
    dispatch(fetchDeposit(payload))
      .unwrap()
      .then((resp: any) => {
        const getDeposit = async () => {
          const { data } = await getListDeposit();
          setData(data.responses);
        };
        getDeposit();
        info();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const confirm = async (id: any) => {
    dispatch(fetchDeleteDeposit(id))
      .unwrap()
      .then((resp) => {
        const getDeposit = async () => {
          const { data } = await getListDeposit();
          setData(data.responses);
        };
        getDeposit();
        messageApi.success('Đã xoa thành công');
      })
      .catch((err) => {
        messageApi.success('Xoa khong thành công');
      });
  };
  const handleUpdate = async (id: number) => {
    console.log('id', id);
    setOpen(true);
    const { data } = await getDeposit(id);
    setDeposit(data);
  };

  return (
    <div>
      <div className='room'>
        <div className='room_filter my-3'>
          <div className='row'>
            <h1>Cọc giữ phòng</h1>
          </div>
          <form action='' style={{ marginTop: 30 }}>
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <div style={{ marginRight: 160 }}>
                <label htmlFor='' style={{ marginRight: 15 }}>
                  Từ ngày
                </label>
                <Space direction='vertical'>
                  <DatePicker onChange={onChange} format={dateFormatList} placeholder='Chọn ngày từ...' />
                </Space>
              </div>
              <div>
                <label htmlFor='' style={{ marginRight: 55 }}>
                  đến
                </label>
                <Space direction='vertical'>
                  <DatePicker onChange={lastChange} format={dateFormatList} placeholder='Chọn ngày từ...' />
                </Space>
              </div>
              <div style={{ display: 'flex', marginLeft: 200 }}>
                <Link to='#'>
                  <button
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                    style={{ marginRight: 15 }}
                  >
                    {' '}
                    <i className='fa-solid fa-users'></i>Tìm kiếm
                  </button>
                </Link>
                <div className=''>
                  <Link to='http://localhost:3000/admin/create-keep-room'>
                    <button
                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                      style={{ marginRight: 15 }}
                    >
                      {' '}
                      <i className='fa-solid fa-users'></i> Thêm
                    </button>
                  </Link>
                  <Link to='#'>
                    <button
                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                      style={{ marginRight: 15 }}
                    >
                      {' '}
                      <i className='fa-solid fa-users'></i> Xuất file Excel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: 20 }}>
              <div style={{ marginRight: 150 }}>
                <label htmlFor='' style={{ marginRight: 38 }}>
                  Nhà
                </label>
                <Select
                  defaultValue='Danh sách phòng'
                  style={{ width: '200', marginRight: '10px' }}
                  options={[
                    {
                      options: [
                        { label: 'Tầng 1', value: 'jack' },
                        { label: 'Tầng 2', value: 'lucy' },
                      ],
                    },
                  ]}
                />
              </div>
              <div>
                <label htmlFor='' style={{ marginRight: 38 }}>
                  Phòng
                </label>
                <Select
                  defaultValue='Danh sách phòng'
                  style={{ width: '200', marginRight: '10px' }}
                  options={[
                    {
                      options: [
                        { label: 'Tầng 1', value: 'jack' },
                        { label: 'Tầng 2', value: 'lucy' },
                      ],
                    },
                  ]}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:mx-0.5 lg:mx-0.5'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='bg-gray-200 border-b'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      STT
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Họ và tên
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số điện thoại
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Tiền cọc
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Ngày đặt
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Ngày dự kiến đến
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số nhà
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số phòng
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Trạng thái
                    </th>
                    <th scope='col' colSpan={2} className='text-sm font-medium text-gray-900 px-6 py-4 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item: any) => (
                    <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.id}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.phone}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(+item?.money)}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {convertDate(item?.bookingdate)}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {convertDate(item.checkindate)}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.houseId}</td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.roomId}</td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {item.status === null ? (
                          <div>
                            <button
                              className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
                              onClick={() => handleChangeStatus(item.id, true)}
                            >
                              <i className='fa-solid fa-check'></i> Nhận phòng
                            </button>
                            <button
                              onClick={() => handleChangeStatus(item.id, false)}
                              className='focus:outline-none text-white bg-red-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
                            >
                              Hủy
                            </button>
                          </div>
                        ) : item.status === true ? (
                          <div>Đã nhận phòng</div>
                        ) : (
                          <div className='text-red-500'>Đã hủy</div>
                        )}
                      </td>
                      <td className='flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <div>
                          <Popconfirm
                            title='Bạn có muốn xóa không ?'
                            onConfirm={() => confirm(item.id)}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                          >
                            <Button danger>Delete</Button>
                          </Popconfirm>
                        </div>
                        <div className='ml-2'>
                          <Link to={`/admin/Update-deposit/${item.id}`}>
                            <Button name={item.id}>Update</Button>
                          </Link>
                        </div>
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
  );
};

export default KeepRoom;
