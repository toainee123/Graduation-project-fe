import { Alert, Checkbox, DatePicker, DatePickerProps, Input, message, Select, Space, Table } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { useEffect, useState } from 'react';

const ListDataPower = () => {
  const [oldElectric, setOldElectric] = useState(0);
  const [newElectric, setNewElectric] = useState(0);
  const [totalElectric, setTotalElectric] = useState(0);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangee = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleCalculatorPower = () => {
    console.log('setOldElectric', oldElectric, newElectric);
    // console.log("lectric", newElectric);
  };

  useEffect(() => {
    setTotalElectric(Math.abs(newElectric) - Math.abs(oldElectric));
  }, [oldElectric, newElectric]);

  const checkPower = () => {
    if (totalElectric < 0) {
      return message.error('Chỉ số mới phải lớn hơn chỉ số cũ');
    }
    message.success('Lưu chỉ số điện thành công');
  };

  const dataSource = [
    {
      key: '1',
      nameHouse: 'Mike',
      roomNumber: 32,
      hostName: '10 Downing Street',
      oldPower: (
        <input
          type='number'
          id='oldPower'
          onChange={(e: any) => {
            setOldElectric(e.target.value);
          }}
          defaultValue={50}
        />
      ),
      newPower: (
        <input
          type='number'
          id='newPower'
          onChange={(e: any) => {
            setNewElectric(e.target.value);
          }}
          defaultValue={150}
        />
      ),
      totalUse: totalElectric,
      action: (
        <button
          onClick={checkPower}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        >
          <i className='fa-solid fa-check'></i> Lưu
        </button>
      ),
    },
  ];

  const columns = [
    {
      title: 'Nhà',
      dataIndex: 'nameHouse',
      key: 'nameHouse',
    },
    {
      title: 'Phòng',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Khách thuê',
      dataIndex: 'hostName',
      key: 'hostName',
    },
    {
      title: 'CS điện cũ',
      dataIndex: 'oldPower',
      key: 'oldPower',
    },
    {
      title: 'CS điện mới',
      dataIndex: 'newPower',
      key: 'newPower',
    },
    {
      title: 'Sử dụng',
      dataIndex: 'totalUse',
      key: 'totalUse',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];
  return (
    <section>
      <div className='flex justify-between w-9/12 mt-5'>
        <div>
          <label className='text-base font-semibold mr-2'>Tháng/năm</label>
          <DatePicker onChange={onChange} />
        </div>
        <div>
          <label className='text-base font-semibold mr-2'>Kỳ</label>
          <Select
            defaultValue='Tất cả'
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'Tất cả', label: 'Tất cả' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </div>
        <div>
          <label className='text-base font-semibold mr-2'>Nhà</label>
          <Select
            defaultValue='Tất cả'
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'Tất cả', label: 'Tất cả' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </div>
        <div>
          <label className='text-base font-semibold mr-2'>Trạng thái phòng</label>
          <Select
            defaultValue='Tất cả'
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'Tất cả', label: 'Tất cả' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </div>
      </div>
      <div className='note mt-5'>
        <p>
          <strong>Lưu ý:</strong>
          <br />
          - Bạn phải gán dịch vụ thuộc loại điện cho khách thuê trước thì phần chỉ số này mới được tính cho phòng đó khi
          tính tiền.
          <br />- Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên,
          các tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ số cũ tháng sau.
        </p>
      </div>
      <div className='mt-8'>
        <div className='text-center'>
          <Checkbox onChange={onChangee}>
            <span className='font-semibold text-gray-600'>Cảnh báo chỉ số điện cũ lớn hơn chỉ số điện mới</span>
          </Checkbox>
        </div>
        <Table className='m-w-full' dataSource={dataSource} columns={columns} />
      </div>
    </section>
  );
};
export default ListDataPower;
