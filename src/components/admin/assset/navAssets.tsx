import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, message, Modal, Select, Upload, UploadProps } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import './navAsset.scss';
import { getDistrict, getProvinces, getWards } from 'src/api/provinces/provinces';
import { httpMessage } from 'src/utils/constants';

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
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState();
  const [districtStore, setDistrictStore] = useState();
  const [wardStore, setWardStore] = useState();

  // const { register, handleSubmit, formState } = useForm<FormInputs>()

  // const onSubmit: SubmitHandler<FormInputs> = (data: any) => {
  //     console.log("form input", data);
  // }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeProvinces = (e: any) => {
    console.log(`selected ${e}`);
    setCity(e);
  };
  const handleChangeDistricts = (e: any) => {
    console.log(`selectedDistrict ${e}`);
    setDistrictStore(e);
  };
  const handleChangeWard = (e: any) => {
    console.log(`selected ${e}`);
    setWardStore(e);
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const { data } = await getProvinces();
      setProvinces(data.results);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistrict = async () => {
      const { data } = await getDistrict(city);
      setDistricts(data.results);
    };
    fetchDistrict();
  }, [city]);

  useEffect(() => {
    const fetchWard = async () => {
      const { data } = await getWards(districtStore);
      setWards(data.results);
    };
    fetchWard();
  }, [districtStore]);

  return (
    <div className='room_selected row'>
      <div className='room_form'>
        <form action=''>
          <Select
            defaultValue='-Danh sách tài sản-'
            style={{ width: '200', marginRight: '10px' }}
            options={[
              {
                label: '-Tất cả-',
                options: [
                  { label: 'Tầng 1', value: 'jack' },
                  { label: 'Tầng 2', value: 'lucy' },
                ],
              },
            ]}
          />
          <Select
            defaultValue='-Phòng-'
            style={{ width: '200', marginRight: '10px' }}
            options={[
              {
                label: '-Phòng-',
                options: [{ label: '1', value: 'jack' }],
              },
            ]}
          />
          <Input style={{ width: 200 }} placeholder='Tìm tài sản...' />
          <button className='btn_search'>
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

          <Link to='#'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              {' '}
              <i className='fa-solid fa-users'></i> Thêm
            </button>
          </Link>
          <Link to='#'>
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
              <i className='fa-solid fa-list'></i> Xóa
            </button>
          </Link>
          <Link to='#'>
            <button
              onClick={() => setOpen(true)}
              className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            >
              <i className='fa-solid fa-building-columns'></i> Xuất file excel
            </button>
          </Link>
          {/* <Modal
            title='Thêm nhà'
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            className='ant-modal-create'
          >
            <form>
              <div>
                <div className='text-base mb-2'>Tên nhà</div>
                <input type='text' className='w-full py-1 pl-2 border' placeholder='Tên nhà...' />
              </div>

              <div className=' flex gap-4 items-center my-2'>
                <div className='flex-1'>
                  <label className='text-base'>Thành phố/Tỉnh</label>
                  <Select
                    defaultValue='Thành phố/Tỉnh'
                    showSearch
                    className='select-province'
                    onChange={(e) => handleChangeProvinces(e)}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={provinces?.map((proVince: any, i: number) => ({
                      key: i,
                      value: proVince.province_id,
                      label: proVince.province_name,
                    }))}
                  />
                </div>
                <div className='flex-1'>
                  <label className='text-base'>Quận/Huyện</label>
                  <Select
                    defaultValue='Quận/Huyện'
                    showSearch
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    className='select-province'
                    onChange={(e) => handleChangeDistricts(e)}
                    options={districts?.map((item: any, i: number) => ({
                      key: i,
                      value: item.district_id,
                      label: item.district_name,
                    }))}
                  />
                </div>

                <div className='flex-1'>
                  <label className='text-base'>Phường/Xã</label>
                  <Select
                    defaultValue='Phường/Xã'
                    className='select-province'
                    onChange={(e) => handleChangeWard(e)}
                    options={wards?.map((item: any, i: number) => ({
                      key: i,
                      value: item.ward_id,
                      label: item.ward_name,
                    }))}
                  />
                </div>
              </div>
              <div className='mb-2'>
                <div className='text-base mb-2'>Địa chỉ</div>
                <input
                  type='text'
                  className='w-full py-1 pl-2 border'
                  placeholder='số nhà, ngõ,...'
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <div className='text-base mb-2'>Địa chỉ chính xác</div>
                <input
                  type='text'
                  className='w-full py-1 pl-2 border'
                  value={`${address ? `${address},` : ''} ${
                    wardStore ? `${wards.find((item) => item.ward_id === wardStore)?.ward_name},` : ''
                  } ${
                    districtStore
                      ? `${districts.find((item) => item.district_id === districtStore)?.district_name},`
                      : ''
                  } ${city ? `${provinces.find((item) => item.province_id === city)?.province_name}.` : ''}`}
                  readOnly
                />
              </div>
              <div className='text-red-500 mt-5'>(*) tất cả các trường bắt buộc</div>
              <button>gửi</button>
            </form>
          </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default NavAssets;
