import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getAssetUser } from 'src/api/assets';

type TAssetUser = {
  id: number;
  name: string;
  amount: number;
  price: string;
};

const column: ColumnsType<TAssetUser> = [
  {
    key: 'index',
    title: 'STT',
    render(_, __, index) {
      return index + 1;
    },
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Tên tài sản',
  },
  {
    key: 'amount',
    dataIndex: 'amount',
    title: 'Số lượng',
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Giá tiền',
    render(value) {
      return Number(value).toLocaleString('VND');
    },
  },
];

const ClientAsset = () => {
  const [assets, setAsssets] = useState<TAssetUser[]>([]);

  useEffect(() => {
    const listAssets = async () => {
      const { data } = await getAssetUser();
      setAsssets(data);
    };
    listAssets();
  }, []);

  return (
    <div className='room'>
      <div className='title_page'>
        <h1>Danh sách tài sản</h1>
      </div>

      {/* <div className='room_form' style={{ marginTop: 30 }}>
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
      </div> */}
      <br />
      <Table columns={column} dataSource={assets} scroll={{ x: 1200 }} />
    </div>
  );
};

export default ClientAsset;
