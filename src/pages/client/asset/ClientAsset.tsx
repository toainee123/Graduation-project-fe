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

const ClientAsset = () => {
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
  return (
    <div className='room'>
      <div className='title_page'>
        <h1>Danh sách tài sản</h1>
      </div>

      <div className='room_form' style={{ marginTop: 30 }}>
        <Form action=''>
          <div className='flex'>
            <div>
              <Form.Item name='search'>
                <Input style={{ width: 200 }} placeholder='Tìm tài sản...' />
              </Form.Item>
            </div>
            <button className='btn_search ml-3'>
              <SearchOutlined /> Tìm kiếm
            </button>
          </div>
        </Form>
      </div>
      <br />
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
                      Tên tài sản
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Giá tiền
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số lượng
                    </th>
                    <th scope='col' colSpan={2} className='text-sm font-medium text-gray-900 px-6 py-4 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {assets?.map((item: any, index: any) => (
                    <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(+item?.price)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.amount}</td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {convertDate(item?.dateuse)}
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

export default ClientAsset;
