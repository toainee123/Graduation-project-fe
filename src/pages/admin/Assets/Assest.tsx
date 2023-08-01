import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getListAssets } from 'src/api/assets';
import NavAssets from 'src/components/admin/assset/navAssets';
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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [messageApi] = message.useMessage();
  const info = () => {
    messageApi.success('Đã xác nhận thành công');
  };

  useEffect(() => {
    const listAssets = async () => {
      const { data } = await getListAssets();
      setData(data.responses);
    };
    listAssets();
  }, []);
  const confirm = async (id: any) => {};
  return (
    <div className='room'>
      <div className='title_page'>
        <h1>Danh sách tài sản</h1>
      </div>

      <NavAssets />
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
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Ngày bắt đầu sử dụng
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Trạng thái tài sản
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Thời gian thanh lý
                    </th>
                    <th scope='col' colSpan={2} className='text-sm font-medium text-gray-900 px-6 py-4 text-left'></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item: any, index: any) => (
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
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {item.isliquidation === true ? 'Đã thanh lý' : 'Chưa thanh lý'}
                      </td>
                      <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        {item.dateliquidation === null
                          ? 'Không có thời gian thanh lý'
                          : convertDate(item.dateliquidation)}
                      </td>
                      <td className='flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                        <div>
                          <Popconfirm
                            title='Bạn có muốn xóa không ?'
                            onConfirm={() => confirm(item.id)}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                          >
                            <Button danger>Xóa</Button>
                          </Popconfirm>
                        </div>
                        <div className='ml-2'>
                          <Link to={`/admin/assets/${item.id}`}>
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

export default Assets;
