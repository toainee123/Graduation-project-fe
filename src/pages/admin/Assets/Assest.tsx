import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import NavAssets from 'src/components/admin/assset/navAssets';

interface DataType {
  key: string;
  home: string;
  room: number;
  assetsCode: string;
  assetsName: 'Điều hòa';
  dateOfUse: '15/1/2023';
  quantity: '12';
  price: '2000000';
  status: string[];
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Nhà',
    dataIndex: 'home',
    key: 'home',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phòng',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Mã tài sản',
    dataIndex: 'assetsCode',
    key: 'assetsCode',
  },
  {
    title: 'Tên tài sản',
    dataIndex: 'assetsName',
    key: 'assetsCode',
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'dateOfUse',
    key: 'assetsCode',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'assetsCode',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
    key: 'assetsCode',
  },
  {
    title: 'Trạng thái',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { status }) => (
      <>
        {status.map((status) => {
          let color = status.length > 8 ? 'red' : 'blue';
          if (status === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    home: 'John Brown',
    room: 32,
    assetsCode: 'FDS123',
    assetsName: 'Điều hòa',
    dateOfUse: '15/1/2023',
    quantity: '12',
    price: '2000000',
    status: ['Thanh lý', 'Chưa thanh lý'],
  },
];

const Assets = () => {
  return (
    <div className='room'>
      <div className='room_filter my-3'>
        <div className='row'>
          <h1>Danh sách tài sản</h1>
        </div>
        <NavAssets />
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Assets;
