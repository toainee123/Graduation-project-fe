import { ExclamationCircleFilled, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message, Modal, Select, Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAsset, getListAssets } from 'src/api/assets';
import { getRoom } from 'src/api/charge';
import { getListDeposit } from 'src/api/deposit';
import { getListHouse } from 'src/api/house';
import { convertDate } from 'src/utils/helps';

const column = [
  {
    title: 'Nhà',
    dataIndex: 'houseId',
  },
  {
    title: 'Phòng',
    dataIndex: 'roomId',
    key: 'roomId',
  },
  {
    title: 'Tên tài sản',
    dataIndex: 'name',
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'dateuse',
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
  },
  {
    title: 'Trạng thái',
    key: 'isliquidation',
  },
];

const Assets = () => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [messageApi] = message.useMessage();
  const [assets, setAsssets] = useState([]);
  const [house, setHouse] = useState([]);
  const [homeId, setHomeId] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomId, setRoomId] = useState([]);

  useEffect(() => {
    const listAssets = async () => {
      const { data } = await getListAssets({});
      setAsssets(data.responses);
    };
    listAssets();
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
  const showDeleteConfirm = (id: any) => {
    confirm({
      title: 'Bạn có muốn xóa dịch vụ này không ?',
      icon: <ExclamationCircleFilled />,
      content: 'Lưu ý: Toàn bộ dữ liệu về dịch vụ này sẽ bị xóa',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        await deleteAsset(id)
          .then((resp) => {
            const listAssets = async () => {
              const { data } = await getListAssets({});
              setData(data.responses);
            };
            listAssets();
            if (resp.status === 200) {
              message.success('Xóa thành công');
            }
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
  const handleChangeRoomId = (value: any) => {
    setRoomId(value);
  };
  const Onsubmit = (data: any) => {
    const result = {
      houseId: data.houseId,
      roomId: data.roomId,
      search: data.search,
    };
    if (result) {
      const listAssets = async (result: any) => {
        const { data } = await getListAssets(result);
        setAsssets(data.responses);
      };
      listAssets(result);
    } else {
      const getDeposit = async () => {
        const { data } = await getListAssets({});
        setAsssets(data.responses);
      };
      getDeposit();
    }
  };
  return (
    <div className='room'>
      <div className='title_page'>
        <h1>Danh sách tài sản</h1>
      </div>
      <div className='flex lg:justify-between lg:flex-row lg:items-end sm:flex-col-reverse'>
        <div className='room_form' style={{ marginTop: 30 }}>
          <Form action='' onFinish={Onsubmit}>
            <div className='grid lg:grid-cols-4 gap-2 md:grid-cols-1 sm:grid-cols-1'>
              <div>
                <Form.Item name='houseId'>
                  <Select defaultValue='Danh sách nhà' onChange={handleChangeHomeId}>
                    {house.map((item: any, i: any) => (
                      <Select.Option key={i} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item name='roomId'>
                  <Select defaultValue='Danh sách phòng' onChange={handleChangeRoomId}>
                    {room.map((item: any, i: any) => (
                      <Select.Option key={i} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item name='search'>
                  <Input placeholder='Tìm tài sản...' />
                </Form.Item>
              </div>
              <button className='btn_search'>
                <i className='fa-solid fa-magnifying-glass px-1'></i>
                Tìm kiếm
              </button>
            </div>
          </Form>
        </div>
        <div className=''>
          <Link to='/admin/create-assets'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              <i className='fa-solid fa-users'></i> Thêm mới tài sản
            </button>
          </Link>
        </div>
      </div>
      <br />
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
                      Tên tài sản
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Giá tiền
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số lượng
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Nhà
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Phòng
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Ngày bắt đầu sử dụng
                    </th>

                    <th scope='col' colSpan={2} className='text-sm font-medium text-gray-900 px-6 py-4 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {assets?.map((item: any, index: any) => (
                    <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item?.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {Number(item?.price).toLocaleString('VND')}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item?.amount}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {item?.nameHouse}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {item?.nameRoom}
                      </td>
                      <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                        {convertDate(item?.dateuse)}
                      </td>

                      <td className='flex text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                        <div>
                          <Button onClick={() => showDeleteConfirm(item?.id)} danger>
                            Xóa
                          </Button>
                        </div>
                        <div className='ml-2'>
                          <Link to={`/admin/assets/${item.id}`}>
                            <Button name={item?.id}>Sửa</Button>
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

export default Assets;
