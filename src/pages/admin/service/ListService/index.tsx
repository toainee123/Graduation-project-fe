import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space, message, Modal, Form } from 'antd';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import './style.scss';
import { useEffect, useState } from 'react';
import { deleteService, getListService } from 'src/api/service';
import { Table } from 'antd';

const Service = () => {
  const [list, setList] = useState([]);
  const { confirm } = Modal;
  const [messageApi] = message.useMessage();
  useEffect(() => {
    const ListService = async () => {
      const { data } = await getListService({});
      setList(data.responses);
    };
    ListService();
  }, []);

  const showDeleteConfirm = (id: any) => {
    console.log("id", id);

    confirm({
      title: 'Bạn có muốn xóa dịch vụ này không ?',
      icon: <ExclamationCircleFilled />,
      content: 'Lưu ý: Toàn bộ dữ liệu về dịch vụ này sẽ bị xóa',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        await deleteService(id)
          .then((resp) => {
            const ListService = async () => {
              const { data } = await getListService({});
              setList(data.responses);
            };
            ListService();
            if (resp.status === 200) {
              alert('thanh cong');
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const dataSource = list.map((item: any, index: number) => {
    return {
      key: index + 1,
      name: item?.name,
      price: Number(item?.price).toLocaleString('VND'),
      code: item?.code,
      id: item?.id
    }
  })

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
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
      title: 'Mã dịch vụ',
      dataIndex: 'code',
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link to={`http://localhost:3000/admin/service/${record.id}`}>
            <Button>Sửa</Button>
          </Link>
          <Button onClick={() => showDeleteConfirm(record.id)} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const onSubmit = (data: any) => {
    const result = {
      search: data.name,
    };
    if (result) {
      const listService = async (result: any) => {
        const { data } = await getListService(result);
        setList(data.responses);
      };
      listService(result);
    } else {
      const getDeposit = async () => {
        const { data } = await getListService({});
        setList(data.responses);
      };
      getDeposit();
    }
  };

  return (
    <>
      <div className='header'>
        <div className='title_page'>
          <h1>Dịch vụ</h1>
        </div>
        <div className='action'>
          <Link to={urlRouter.ADD_SERVICE}>
            <Button type='primary' >
              <i className="fa-sharp fa-solid fa-plus pr-2"></i>
              Thêm dịch vụ
            </Button>
          </Link>
        </div>
      </div>
      <div className='description'>
        <strong>Lưu ý:</strong>
        <p>
          Các dịch vụ phải được gán cho từng khách thuê phòng để khi tính tiền sẽ có tiền dịch vụ đó. Để cấu hình đơn
          giá điện nước tính theo bậc thang bạn vẫn phải tạo 2 dịch vụ là điện, nước
        </p>
      </div>
      <div className='render-input'>
        <Form name='myForm' onFinish={onSubmit} style={{ display: 'flex' }}>
          <Form.Item name='name' rules={[{ required: true, message: 'Vui lòng không được bỏ trống!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table dataSource={dataSource} columns={columns} rowKey='name' scroll={{ x: 1200 }} />
    </>
  );
};

export default Service;
