import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteService, getListService } from 'src/api/service';
import { urlRouter } from 'src/utils/constants';

const Service = () => {
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [list, setList] = useState([]);
  const [messageApi] = message.useMessage();
  useEffect(() => {
    const ListService = async () => {
      const { data } = await getListService();
      setList(data.responses);
      setSelectedRow([{ key: 1 }]);
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
      title: 'Dịch vụ sử dụng',
      dataIndex: 'name',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 550,
    },
  ];

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
        dataSource={list}
        rowSelection={{
          type: 'checkbox',
          onChange(selectedRowKeys, selectedRows, info) {
            setSelectedRow(selectedRows);
          },
        }}
        columns={columns}
        rowKey='name'
      />
    </>
  );
};

export default Service;
