import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, message, Modal, Select, Upload, UploadProps } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import './navAsset.scss';
import { getDistrict, getProvinces, getWards } from 'src/api/provinces/provinces';
import { httpMessage } from 'src/utils/constants';
import { getListDeposit } from 'src/api/deposit';
import { getListHouse } from 'src/api/house';
import { getRoom } from 'src/api/charge';

type FormInputs = {
  nameRoom: string;
  province: string;
  fullAddress: string;
};

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} ${httpMessage.UPLOAD_SUCCESS}`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${httpMessage.UPLOAD_FAILED}`);
    }
  },
};

const NavAssets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [house, setHouse] = useState([]);
  const [homeId, setHomeId] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomId, setRoomId] = useState([]);

  useEffect(() => {
    const getDeposit = async () => {
      const { data } = await getListDeposit({});
      setData(data.responses);
    };
    const getHouse = async () => {
      const { data } = await getListHouse();
      setHouse(data.result);
    };
    getHouse();
    getDeposit();
  }, []);

  const handleChangeHomeId = async (value: any) => {
    setHomeId(value);
    const getRoomWithHomeId = await getRoom(value)
      .then((res) => {
        setRoom(res.data.result.responses);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChangeRoomId = (value: any) => {
    console.log(value, ' value');
    setRoomId(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='room_selected row'>
      <div className='room_form' style={{ marginTop: 30 }}>
        <form action=''>
          <Select defaultValue='Danh sách nhà' onChange={handleChangeHomeId}>
            {house.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Select
            defaultValue='Danh sách phòng'
            onChange={handleChangeRoomId}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            {room.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Input style={{ width: 200 }} placeholder='Tìm tài sản...' />
          <button className='btn_search ml-3'>
            <SearchOutlined /> Tìm kiếm
          </button>
        </form>
      </div>
      <div className='flex justify-end items-center mt-4'>
        <div className=''>
          <Link to='#'>
            <button
              onClick={showModal}
              className='focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900'
            >
              <i className='fa-sharp fa-solid fa-upload'></i> Xem
            </button>
          </Link>
          <Modal title='Nhập phòng từ file Excel ' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Upload {...props}>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  '
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      aria-hidden='true'
                      className='w-10 h-10 mb-3 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Click to upload</span> or drag and drop
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Chỉ nhận file .CSV</p>
                  </div>
                </label>
              </div>
            </Upload>
          </Modal>

          <Link to='/admin/create-assets'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              {' '}
              <i className='fa-solid fa-users'></i> Thêm mới tài sản
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavAssets;
