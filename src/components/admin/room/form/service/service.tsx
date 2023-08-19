import { Button, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteService, getListService, getServicee, updateService } from 'src/api/service';

const Service = () => {
  const [selectedRow, setSelectedRow] = useState<any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>();
  const [list, setList] = useState([]);
  const [messageApi] = message.useMessage();
  const { roomId }: any = useParams();

  useEffect(() => {
    const ListService = async () => {
      const { data } = await getListService({});
      setList(data.responses);

      const response = await getServicee(roomId);
      const arrKey = response?.data?.map((item: any) => {
        return item.serviceid;
      });

      console.log(arrKey);

      setSelectedRowKeys(arrKey);
    };
    ListService();
  }, []);

  const handleRemove = async (id: any) => {
    await deleteService(id)
      .then((resp) => {
        const getDeposit = async () => {
          const { data } = await getListService({});
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
      title: 'Dịch vụ sử dụng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 550,
      key: 'price',
    },
  ];
  const dataSource = list?.map((item: any, index) => {
    return {
      key: item.id,
      name: item.name,
      price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(+item?.price),
    };
  });

  return (
    <>
      <div className='description'>
        <strong>Lưu ý:</strong>
        <p>
          Vui lòng chọn dịch vụ cho khách thuê. Nếu khách có chọn dịch vụ thì khi tính tiền phòng phần mềm sẽ tự tính
          các khoản phí vào hóa đơn; ngược lại nếu không chọn phần mềm sẽ bỏ qua.
          <br />
          Đối với dịch vụ là loại điện/ nước thì sẽ tính theo chỉ số điện/ nước
          <br />
          Đối với các dịch vụ khác sẽ tính theo số lượng (ví dụ phòng có 2 xe đạp nhập số lượng là 2)
          <br />
        </p>
      </div>
      <Table
        dataSource={dataSource}
        rowSelection={{
          selectedRowKeys,
          type: 'checkbox',
          onChange(selectedRowKeys, selectedRows, info) {
            setSelectedRow(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        columns={columns}
        footer={() => (
          <Button
            onClick={async () => {
              // createRoomService
              const arrSv = selectedRow?.map((item: any) => {
                return item.key;
              });

              // Thiếu id của room_service và api cập nhật

              const response = await updateService(roomId, {
                serviceId: arrSv,
              });
              console.log(response);
            }}
          >
            Lưu
          </Button>
        )}
      />
    </>
  );
};

export default Service;
