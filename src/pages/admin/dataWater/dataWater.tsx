import { Button, DatePicker, Select, Space, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDataWater } from 'src/features/water/dataWaterSlice';
import { useAppDispatch } from 'src/store/hooks';

const DataWater = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDataWater());
  }, []);
  return (
    <section>
      <div className=' flex justify-between items-center'>
        <div className='title_page'>
          <h1>Chỉ Số Nước</h1>
        </div>
        <div className='btn_action '>
          <Link to='#'>
            <button className='focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900'>
              <i className='fa-solid fa-magnifying-glass'></i> Xem
            </button>
          </Link>
          <Link to='#'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              <i className='fa-solid fa-check'></i> Lưu
            </button>
          </Link>
          <Link to='#'>
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
              <i className='fa-regular fa-file'></i> Xuất file
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <section>
        <div className='flex justify-between w-9/12 mt-5'>
          <div>
            <label className='text-base font-semibold mr-2'>Tháng/năm</label>
            <DatePicker />
          </div>
          <div>
            <label className='text-base font-semibold mr-2'>Kỳ</label>
            <Select
              defaultValue='Tất cả'
              style={{ width: 200 }}
              //   onChange={handleChange}
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
              //   onChange={handleChange}
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
              //   onChange={handleChange}
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
            - Bạn phải gán dịch vụ thuộc loại điện cho khách thuê trước thì phần chỉ số này mới được tính cho phòng đó
            khi tính tiền.
            <br />- Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên,
            các tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ số cũ tháng sau.
          </p>
        </div>
        <div className='mt-8'>{/* <Table className='m-w-full' dataSource={dataSource} columns={columns} /> */}</div>
      </section>
    </section>
  );
};

export default DataWater;
