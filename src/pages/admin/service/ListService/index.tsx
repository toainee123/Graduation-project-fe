import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import './style.scss';
import { useEffect, useState } from 'react';
import { deleteService, getListService } from 'src/api/service';
import { Table } from 'antd';

const Service = () => {
  const [list, setList] = useState([]);
  const [messageApi] = message.useMessage();
  useEffect(() => {
    const ListService = async () => {
      const { data } = await getListService();
      setList(data.responses);
    };
    ListService();
  }, []);

  const handleRemove = async (id: any) => {
    await deleteService(id)
      .then((resp) => {
        const getDeposit = async () => {
          const { data } = await getListService();
          setList(data.result);
        };
        getDeposit();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link to={`http://localhost:3000/admin/service/${record.id}`}>
            <Button>Sửa</Button>
          </Link>
          <Button onClick={() => handleRemove(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className='header'>
        <div className='header-title'>
          <h1>Dịch vụ</h1>
        </div>
        <div className='action'>
          <Link to={urlRouter.ADD_SERVICE}>
            <Button type='primary'>
              {''}
              <PlusOutlined style={{ fontSize: 15 }} />
              Thêm dịch vụ
            </Button>
          </Link>
        </div>
      </div>
      <hr />
      <div className='description'>
        <strong>Lưu ý:</strong>
        <p>
          Các dịch vụ phải được gán cho từng khách thuê phòng để khi tính tiền sẽ có tiền dịch vụ đó. Để cấu hình đơn
          giá điện nước tính theo bậc thang bạn vẫn phải tạo 2 dịch vụ là điện, nước
        </p>
      </div>
      <div className='render-input'>
        <Input
          // value={dataFilter[item.field]}
          placeholder='Tên'
          // onChange={e => handleUpdateField(e, item.field, item.type)}
        />
        <Button type='primary'>Tìm</Button>
      </div>
      <Table dataSource={list} columns={columns} rowKey='name' />
    </>
  );
};

export default Service;
