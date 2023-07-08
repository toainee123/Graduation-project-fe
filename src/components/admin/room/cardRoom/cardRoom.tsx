import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoom } from 'src/api/room';
import { ROOM_TYPE } from 'src/types/room';
import { urlRouter } from 'src/utils/constants';

const { confirm } = Modal;
const showDeleteConfirm = () => {
  confirm({
    title: 'Bạn có chắc chắn muốn xóa phòng này không',
    icon: <ExclamationCircleFilled />,
    content: 'Toàn bộ dữ liệu trong phòng, và khách thuê sẽ bị xóa',
    okText: 'Đồng ý',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const CardRoom = () => {
  const [listRoom, setListRoom] = useState<any>([]);
  const [analyticRoom, setAnalyticRoom] = useState<any>();

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(3);

      setListRoom(data.result?.responses);
      setAnalyticRoom(data.room);
    };
    fetchRoom();
  }, []);

  return (
    <div>
      <div className='xl:flex justify-between items-center mb-5'>
        <div className='inline-block'>
          <span className='font-semibold text-base px-2'>Còn trống {analyticRoom?.roomAvailable || 'N/A'}</span>
          <span className='font-semibold text-base px-2 border-l-2 border-black'>
            Đã cho thuê {analyticRoom?.roomAlready || 'N/A'}
          </span>
        </div>
        <div className='md:my-2 flex-col'>
          <Link to={urlRouter.CREATE_ROOM}>
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
              <i className='fa-solid fa-bed'></i> Thêm phòng
            </button>
          </Link>
          <Link to='#'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              <i className='fa-solid fa-pen'></i> Sửa nhà
            </button>
          </Link>
          <Link
            to='#'
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            <i className='fa-solid fa-trash'></i> Xóa
          </Link>
        </div>
      </div>
      <div className=' px-4 sm:py-2 sm:px-1 lg:max-w-full lg:px-2'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8'>
          {listRoom.length > 0 &&
            listRoom?.map((item: any, i: number) =>
              item.status ? (
                <div className='m-w-72 h-52 rounded-lg bg-blue-300 p-4 flex flex-col justify-between' key={i}>
                  <div className='number_house'>
                    <p className='text-base text-gray-500'>
                      <i className='fa-solid fa-house'></i> <span>{item?.name}</span>
                    </p>
                  </div>

                  <div className='action text-center'>
                    <Link
                      to='#'
                      className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 mx-1'
                    >
                      <button>
                        <i className='fa-solid fa-eye'></i>
                      </button>
                    </Link>
                    <Link
                      to='#'
                      className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 mx-1'
                    >
                      <button>
                        <i className='fa-solid fa-gear'></i>
                      </button>
                    </Link>
                  </div>
                  <div>
                    <i className='fa-solid fa-user text-gray-500'></i>{' '}
                    <span className='text-green-600 font-bold'>{item?.maxCustomer}</span>
                    <br />
                    <i className='fa-solid fa-money-bill text-gray-500'></i>{' '}
                    <span className='text-red-500 font-semibold'>{`${new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(+item?.price)}`}</span>
                  </div>

                  <div className='action text-center'>
                    <Link
                      to='#'
                      className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '
                    >
                      <button>
                        <i className='fa-solid fa-gear'></i> Chỉnh sửa
                      </button>
                    </Link>
                    <button onClick={showDeleteConfirm}>
                      <Link
                        to='#'
                        className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '
                      >
                        <i className='fa-solid fa-trash'></i> Xóa
                      </Link>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className='m-w-72 h-52 rounded-lg bg-gray-100 hover:bg-gray-200 p-4 flex flex-col justify-between'
                  key={i}
                >
                  <div className='number_house'>
                    <p className='text-base text-gray-500'>
                      <i className='fa-solid fa-house'></i> <span>{item?.name}</span>
                    </p>
                  </div>
                  <div className='action text-center'>
                    <button>
                      <Link
                        to={urlRouter.CREATE_MEMBER}
                        className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center mr-2 '
                      >
                        Thêm khách
                      </Link>
                    </button>
                  </div>
                  <div>
                    <i className='fa-solid fa-user text-gray-500'></i>{' '}
                    <span className='text-green-600 font-bold'>{item?.maxCustomer}</span>
                    <br />
                    <i className='fa-solid fa-money-bill text-gray-500'></i>{' '}
                    <span className='text-red-500 font-semibold'>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(+item?.price)}
                    </span>
                  </div>
                  <div className='action text-center'>
                    <button>
                      <Link
                        to='#'
                        className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '
                      >
                        <i className='fa-solid fa-gear'></i> Chỉnh sửa
                      </Link>
                    </button>
                    <button onClick={showDeleteConfirm}>
                      <Link
                        to='#'
                        className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '
                      >
                        <i className='fa-solid fa-trash'></i> Xóa
                      </Link>
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
