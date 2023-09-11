import { ExclamationCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, DatePickerProps, Form, Popconfirm, Select, Space, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { deleteDeposit, getListDeposit } from 'src/api/deposit';
import { getListHouse } from 'src/api/house';
import { getRoom } from 'src/api/room';
import { fetchDeleteDeposit, fetchDeposit, selectSuccessDeposit } from 'src/features/deposit/deposit';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { urlRouter } from 'src/utils/constants';
import { convertDate, convertDateFilter } from 'src/utils/helps';
import * as XLSX from 'xlsx-js-style';

const KeepRoom = () => {
  const { register, handleSubmit } = useForm();
  const { confirm } = Modal;
  const statusState = useAppSelector(selectSuccessDeposit);
  const [messageApi] = message.useMessage();
  const [dateTo, setDateTo] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [data, setData] = useState([]);
  const [homeId, setHomeId] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [form] = Form.useForm();
  const [room, setRoom] = useState([]);
  const [house, setHouse] = useState([]);
  const dispatch = useAppDispatch();

  const info = () => {
    messageApi.success('Đã xác nhận thành công');
  };

  const dateFormatList = ['YYYY/MM/DD'];
  const DateToOnChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateTo(dateString);
  };
  const DateFromChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateFrom(dateString);
  };
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
  const handleChangeStatus = async (id: any, status: any) => {
    const payload = {
      id,
      status: status,
    };
    dispatch(fetchDeposit(payload))
      .unwrap()
      .then((resp: any) => {
        const getDeposit = async () => {
          const { data } = await getListDeposit({});
          setData(data.responses);
        };
        getDeposit();
        info();
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const showDeleteConfirm = (id: any) => {
    confirm({
      title: 'Bạn có muốn xóa dịch vụ này không ?',
      icon: <ExclamationCircleFilled />,
      content: 'Lưu ý: Toàn bộ dữ liệu về cọc phòng này sẽ bị xóa',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        await deleteDeposit(id)
          .then((resp) => {
            const listDeposit = async () => {
              const { data } = await getListDeposit({});
              setData(data.responses);
            };
            listDeposit();
            message.success('Xóa thành công');
          })
          .catch((err) => {
            message.error(err.message);
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    console.log(1);
  };

  const Onsubmit = async (data: any) => {
    const result = {
      dateTo: dateTo && convertDateFilter(dateTo),
      dateFrom: dateFrom && convertDateFilter(dateFrom),
      houseId: homeId,
      roomId: roomId,
    };
    if (result) {
      const getDeposit = async () => {
        const { data } = await getListDeposit(result);
        setData(data.responses);
      };
      getDeposit();
    } else {
      const getDeposit = async () => {
        const { data } = await getListDeposit({});
        setData(data.responses);
      };
      getDeposit();
    }
  };

  const handleExportExcel = async () => {
    console.log(data);

    const covertData = data?.map((item: any, index: number) => {
      console.log(item.status);

      let convertStatus;
      if (item.status === true) {
        convertStatus = 'Đã xác nhận';
      } else if (item.status === false) {
        convertStatus = 'Chưa xác nhận';
      } else if (item.status === null) {
        convertStatus = 'Chưa xác nhận gì cả';
      }
      return {
        // key: index,
        index: index + 1,
        name: item.name,
        phone: item.phone,
        money: item.money,
        bookingdate: convertDate(item.bookingdate),
        checkindate: convertDate(item.checkindate),
        house: item.nameHouse,
        room: item.nameRoom,
        status: convertStatus,
      };
    });
    console.log(covertData);

    let length = 0;

    let Heading = [
      ['STT', 'Họ tên', 'SĐT', 'Tiền cọc phòng', 'Ngày đặt', 'Ngày dự kiến đến', 'Nhà', 'Phòng', 'Trạng thái'],
    ];

    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    // title1
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } }];
    ws['A1'] = { t: 's', v: 'Danh sách cọc giữ phòng ' };
    ws['A1'].s = {
      font: { sz: 20, bold: true },
      alignment: { horizontal: 'center' },
    };

    XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A2' });
    var wscols = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
    ws['!cols'] = wscols;

    ws['!rows'] = [{ hpt: 30 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }, { hpt: 20 }];

    XLSX.utils.sheet_add_json(ws, covertData, { origin: 'A3', skipHeader: true });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'danh-sach-coc-giu-phong/2023.xlsx');
  };

  return (
    <div>
      <div className='room'>
        <div className='room_filter my-3'>
          <div className='row'>
            <div className='title_page'>
              <h1>Cọc giữ phòng</h1>
            </div>
            <div className='flex lg:justify-between lg:flex-row lg:items-end sm:flex-col-reverse'>
              <div>
                <form onSubmit={handleSubmit(Onsubmit)}>
                  <div className='grid lg:grid-cols-[160px_160px_160px_160px_160px] lg:gap-3 md:grid-cols-3 md:gap-3 sm:grid-cols-1 sm:gap-3'>
                    <div>
                      <label className='text-base text-slate-500 font-semibold'>Từ ngày</label>
                      <br />
                      <DatePicker
                        onChange={DateToOnChange}
                        size='large'
                        className='w-full'
                        format='YYYY-MM-DD'
                        placeholder='Chọn ngày từ...'
                      />
                    </div>
                    <div>
                      <label className='text-base text-slate-500 font-semibold'>Đến</label>
                      <br />
                      <DatePicker
                        className='w-full'
                        onChange={DateFromChange}
                        size='large'
                        format='YYYY-MM-DD'
                        placeholder='Chọn ngày từ...'
                      />
                    </div>
                    <div>
                      <label className='text-base text-slate-500 font-semibold'>Nhà</label>
                      <Select
                        defaultValue='Danh sách nhà'
                        size='large'
                        className='w-full'
                        onChange={handleChangeHomeId}
                      >
                        {house.map((item: any) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className='text-base text-slate-500 font-semibold'>Phòng</label>
                      <Select
                        defaultValue='Danh sách nhà'
                        size='large'
                        className='w-full'
                        onChange={handleChangeRoomId}
                      >
                        {room.map((item: any) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <br className='lg:block md:block sm:hidden' />
                      <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:w-full '>
                        <i className='fa-solid fa-magnifying-glass px-1'></i>
                        Tìm kiếm
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <Link to='http://localhost:3000/admin/create-keep-room'>
                  <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                    <i className='fa-solid fa-plus'></i> Thêm
                  </button>
                </Link>

                <button
                  className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'
                  onClick={() => {
                    handleExportExcel();
                  }}
                >
                  <i className='fa-regular fa-file-excel'></i> Xuất file Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:mx-0.5 lg:mx-0.5'>
          <div className='py-2 inline-block min-w-full '>
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
                  {data?.map((item: any, index: number) => (
                    <tr key={index} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.id}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.phone}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {Number(item?.money).toLocaleString('VND')}
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
                              <i className='fa-dashed fa-check'></i> Nhận phòng
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
                          <Button onClick={() => showDeleteConfirm(item.id)} danger>
                            Xóa
                          </Button>
                        </div>
                        <div className='ml-2'>
                          <Link to={`/admin/update-deposit/${item.id}`}>
                            <Button name={item.id}>Sửa</Button>
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
