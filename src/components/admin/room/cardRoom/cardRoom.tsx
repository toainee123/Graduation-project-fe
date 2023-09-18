import React, { useEffect, useState } from 'react';
import { Alert, Modal, Tooltip, Form, message } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getDistrict, getRoom, getWards } from 'src/api/room';
import { urlRouter } from 'src/utils/constants';
import EditHouse from '../editHouse/editHouse';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { HouseSliceAction, deleteHouse, editHouse, getAllHouse, selectFilterHouse } from 'src/features/room/houseSlice';
import { GetOutRoomTenant, deleteRoom } from 'src/features/room/roomSlice';
import thumNail from './logo bee.png';
const { confirm } = Modal;

const CardRoom = ({ idHouse }: any) => {
  const [listRoom, setListRoom] = useState<any>([]);
  const [analyticRoom, setAnalyticRoom] = useState<any>();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilterHouse);
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(idHouse);
      setListRoom(data.result?.responses);
      setAnalyticRoom(data.room);
    };
    fetchRoom();
  }, [idHouse]);

  useEffect(() => {
    if (filter.status === '' || filter.status !== '' || filter.search !== '') {
      const fetchRoom = async () => {
        const { data } = await getRoom(idHouse, filter);
        setListRoom(data.result?.responses);
        setAnalyticRoom(data.room);
      };
      fetchRoom();
    }
  }, [filter]);

  useEffect(() => {
    if (idHouse) {
      dispatch(HouseSliceAction.funcAddIdHouse(idHouse));
    }
  }, [idHouse]);

  const onFinish = async (value: any) => {
    await dispatch(editHouse({ idHouse, value }))
      .unwrap()
      .then((resp) => {
        dispatch(getAllHouse());
        setOpen(false);
        return message.success(`Cập nhật ${value.name} thành công`);
      })
      .catch((err) => {
        return message.error(`Cập nhật ${value.name} thất bại`);
      })
      .catch((err) => {
        return message.error(`Cập nhật ${value.name} thất bại`);
      });
  };

  // const showDeleteConfirm = (idHouse: any) => {
  //   confirm({
  //     title: 'Bạn có chắc muốn xóa không',
  //     icon: <ExclamationCircleFilled />,
  //     content: 'Lưu ý: Toàn bộ dữ liệu trong phòng và khách thuê sẽ bị xóa',
  //     okText: 'Đồng ý',
  //     okType: 'danger',
  //     cancelText: 'Cancel',
  //     onOk() {
  //       // remove(idHouse);
  //       // setListRoom(listRoom.filter((item: any) => item.id !== idHouse))
  //       dispatch(deleteHouse(idHouse))
  //         .unwrap()
  //         .then((resp) => {
  //           message.success('xóa nhà thành công');
  //         })
  //         .catch((err) => {
  //           message.error('xóa nhà không thành công');
  //         });
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
  // };
  const showConfirmGetOutRoom = (roomId: any) => {
    confirm({
      title: 'Xác nhận khách trả phòng',
      icon: <ExclamationCircleFilled />,
      // content: 'Lưu ý: Toàn bộ dữ liệu trong phòng và khách thuê sẽ bị xóa về mặc định !',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Thoát',
      onOk() {
        dispatch(GetOutRoomTenant(roomId))
          .unwrap()
          .then((resp) => {
            message.success('Trả phòng thành công');
            const fetchRoom = async () => {
              const { data } = await getRoom(idHouse);
              setListRoom(data.result?.responses);
              setAnalyticRoom(data.room);
            };
            fetchRoom();
          })
          .catch((err) => {
            message.error('Trả phòng không thành công');
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // const showConfirmDeleteRoom = (roomId: any) => {
  //   confirm({
  //     title: 'Xác nhận xóa phòng',
  //     icon: <ExclamationCircleFilled />,
  //     // content: 'Lưu ý: Toàn bộ dữ liệu trong phòng và khách thuê sẽ bị xóa về mặc định !',
  //     okText: 'Đồng ý',
  //     okType: 'danger',
  //     cancelText: 'Thoát',
  //     onOk() {
  //       dispatch(deleteRoom(roomId))
  //         .unwrap()
  //         .then((resp) => {
  //           message.success('Xóa phòng thành công');
  //           const fetchRoom = async () => {
  //             const { data } = await getRoom(idHouse);
  //             setListRoom(data.result?.responses);
  //             setAnalyticRoom(data.room);
  //           };
  //           fetchRoom();
  //         })
  //         .catch((err) => {
  //           message.error('Xóa phòng không thành công');
  //         });
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
  // };
  return (
    <div>
      <div className='xl:flex justify-between items-center mb-5'>
        {listRoom?.length > 0 ? (
          <div className='inline-block'>
            <span className='font-semibold text-base px-2'>Còn trống {analyticRoom?.roomAvailable || '0'}</span>
            <span className='font-semibold text-base px-2 border-l-2 border-black'>
              Đã cho thuê {analyticRoom?.roomAlready || '0'}
            </span>
          </div>
        ) : (
          <div>
            <Alert message='Chưa có phòng nào được thêm tại đây !' type='warning' showIcon />
          </div>
        )}

        <div className='md:my-2'>
          <Link to={urlRouter.CREATE_ROOM}>
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'>
              <i className='fa-solid fa-bed'></i> Thêm phòng
            </button>
          </Link>

          <Link to=''>
            <button
              onClick={() => setOpen(true)}
              className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
            >
              <i className='fa-solid fa-pen'></i> Sửa nhà
            </button>
          </Link>
          <Modal
            centered
            okText='Cập nhật'
            open={open}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  // form.resetFields();
                  onFinish(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
            onCancel={() => setOpen(false)}
            className='ant-modal-create'
          >
            {open && <EditHouse form={form} idHouse={idHouse} />}
          </Modal>
          {/* <Link to='#'>
            <button
              onClick={() => showDeleteConfirm(idHouse)}
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
            >
              <i className='fa-solid fa-trash'></i> Xóa
            </button>
          </Link> */}
        </div>
      </div>
      <div className=' px-4 sm:py-2 sm:px-1 lg:max-w-full lg:px-2'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8'>
          {listRoom.length > 0 &&
            listRoom?.map((item: any, i: number) =>
              item.status ? (
                <div className='max-w-sm shadow-xl rounded-lg bg-blue-300 flex flex-col' key={i}>
                  <div className='h-60'>
                    <img
                      src={item?.image}
                      alt=''
                      className='bg-slate-500 cursor-pointer rounded-t-lg duration-300 ease-in-out hover:opacity-50'
                    />
                  </div>
                  <div className='p-4 h-3/5 grid grid-cols-1 gap-y-1'>
                    <div className='number_house'>
                      <p className='text-base text-gray-500'>
                        <i className='fa-solid fa-house'></i> <span>{item?.name}</span>
                      </p>
                    </div>
                    <div className='text-center'>
                      <Tooltip title='Trả phòng'>
                        <button
                          onClick={() => showConfirmGetOutRoom(item.id)}
                          className='focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-2 py-1 mx-1'
                        >
                          <i className='fa-solid fa-rotate-left'></i>
                        </button>
                      </Tooltip>
                      <Tooltip title='Xem phòng'>
                        <Link to={`/admin/${urlRouter.ROOM}/${urlRouter.VIEW_MEMBER_IN_ROOM}/${item.id}?key=view`}>
                          <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-2 py-1 mx-1'>
                            <i className='fa-solid fa-eye'></i>
                          </button>
                        </Link>
                      </Tooltip>
                      <Tooltip title='Chỉnh sửa phòng'>
                        <Link to={`/admin/${urlRouter.ROOM}/${urlRouter.UPDATE_MEMBER_IN_ROOM}/${item.id}?key=update`}>
                          <button className=' focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 font-medium rounded-lg text-sm px-2 py-1 mx-1'>
                            <i className='fa-solid fa-gear'></i>
                          </button>
                        </Link>
                      </Tooltip>
                    </div>
                    <div>
                      <i className='fa-solid fa-user text-gray-500'></i>{' '}
                      <span className='text-green-600 font-bold'>{item?.maxCustomer}</span>
                      <br />
                      <i className='fa-solid fa-money-bill text-gray-500'></i>{' '}
                      <span className='text-red-500 font-semibold'>{Number(item?.price).toLocaleString('VND')}</span>
                    </div>
                    <div>
                      <Link
                        to={`/admin/${urlRouter.ROOM}/${urlRouter.EDIT_ROOM}/${item.id}?key=update`}
                        className='block text-blue-700 border border-blue-700 hover:text-white hover:bg-blue-800 hover:duration-300 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center mr-2 '
                      >
                        <i className='fa-solid fa-gear'></i> Chỉnh sửa phòng
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='m-w-72 rounded-lg bg-gray-200 hover:bg-gray-200 shadow-sm flex flex-col' key={i}>
                  <div className='overflow-hidden relative cursor-pointer h-60'>
                    <img src={item?.image} alt='' className='rounded-t-lg duration-300 ease-in-out hover:opacity-50' />
                  </div>
                  <div className='p-4 h-3/5 grid grid-cols-1 gap-y-2'>
                    <div className='number_house'>
                      <p className='text-base text-gray-500'>
                        <i className='fa-solid fa-house'></i> <span>{item?.name}</span>
                      </p>
                    </div>
                    <div className=' text-center'>
                      <button>
                        <Link
                          to={`${urlRouter.CREATE_MEMBER}/${item.id}`}
                          className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm p-2 text-center mr-2 '
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
                      <span className='text-red-500 font-semibold'>{Number(item?.price).toLocaleString('VND')}</span>
                    </div>
                    <div className=''>
                      <Link
                        to={`/admin/${urlRouter.ROOM}/${urlRouter.EDIT_ROOM}/${item.id}?key=update`}
                        className='block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-2 text-center mr-2 '
                      >
                        <i className='fa-solid fa-gear'></i> Chỉnh sửa phòng
                      </Link>
                    </div>
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
