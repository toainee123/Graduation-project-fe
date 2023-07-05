import { DatePicker, DatePickerProps, Select, Space } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const KeepRoom = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const showModal = () => {
    setOpen(true);
  };
  const dateFormatList = ['DD/MM/YYYY'];
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const lastChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date);
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

                <Link to='http://localhost:3000/admin/create-keep-room'>
                  <button
                    onClick={showModal}
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
                      Từ ngày
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Tới ngày
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số nhà
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số phòng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>1</td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>16</td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>24</td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>321</td>
                    <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>321</td>
                  </tr>
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
