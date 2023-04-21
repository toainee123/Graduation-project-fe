import React, { useEffect, useState } from 'react';
import { getDataWater } from 'src/features/water/dataWaterSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import Table, { ColumnsType } from 'antd/lib/table';
import { Button, DatePicker, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
const DataWater = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDataWater());
  }, []);
  const {
    register,
    handleSubmit,
    getFieldState,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<any>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'water',
    rules: {
      required: true,
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const dataSource = useAppSelector((state) => state.water.value).map((item: any, index: number) => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      idHouse: item.idHouse,
      idRoom: item.idRoom,
      unit: item.unit,
      price: item.price,
      inputValue: item.inputValue,
      outputValue: item.outputValue,
    };
  });
  console.log(errors);

  const columns: ColumnsType<any> = [
    { title: 'Số nhà', dataIndex: 'idHouse', key: 'idHouse' },
    { title: 'Số phòng', dataIndex: 'idRoom', key: 'idRoom' },
    { title: 'Khách thuê', dataIndex: 'name', key: 'name' },
    {
      title: 'CS Nước cũ',
      key: 'inputValue',
      render: (text, record, index) => {
        return (
          <div key={record.id}>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              type='number'
              defaultValue={record.inputValue}
              {...register(`water.${index}.inputValue`, {
                required: true,
              })}
            />
            <p className='text-red-500'>
              {getFieldState(`water.${index}.inputValue`).isDirty &&
                getValues(`water.${index}.inputValue`) == '' &&
                'Không để trống'}
            </p>
            <p className='text-red-500'>
              {getFieldState(`water.${index}.inputValue`).isDirty &&
                getValues(`water.${index}.inputValue`) <= 0 &&
                'Chỉ số điện phải lớn hơn 0'}
            </p>
          </div>
        );
      },
    },
    {
      title: 'CS Nước mới',
      key: 'outputValue',
      render: (text, record, index) => {
        return (
          <div key={record.id}>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              type='number'
              max='50000000000000'
              defaultValue={record.outputValue}
              {...register(`water.${index}.outputValue`, {
                required: true,
              })}
              // add required -> can getFieldState
            />
            <p className='text-red-500'>
              {getFieldState(`water.${index}.outputValue`).isDirty &&
                getValues(`water.${index}.outputValue`) == '' &&
                'Không để trống'}
            </p>
            <p className='text-red-500'>
              {getFieldState(`water.${index}.outputValue`).isDirty &&
                getValues(`water.${index}.outputValue`) <= 0 &&
                'Chỉ số điện phải lớn hơn 0'}
            </p>

            <p className='text-red-500'>
              {getFieldState(`water.${index}.outputValue`).isDirty &&
                +getValues(`water.${index}.outputValue`) < +getValues(`water.${index}.inputValue`) &&
                `CS mới phải lớn cs cũ`}
            </p>
          </div>
        );
      },
    },
    {
      title: 'Sử dụng',
      key: 'useWater',
      render: (text, record, index) => {
        const numbera =
          parseInt(getValues(`water.${index}.outputValue`)) - parseInt(getValues(`water.${index}.inputValue`));

        return <span>{numbera}</span>;
        // return <span>ccc</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => {
              const value = getValues(`water.${index}.outputValue`);
              // dispatch action to update water
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const onChange = () => {
    // console.log(date, dateString);
  };
  const onChangee = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleCalculatorPower = () => {
    // console.log('setOldElectric', oldElectric, newElectric);
    // console.log("lectric", newElectric);
  };

  return (
    <section>
      <div className=' flex justify-between items-center'>
        <div className='title_page'>
          <h1>Chỉ Số Điện</h1>
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
            - Bạn phải gán dịch vụ thuộc loại điện cho khách thuê trước thì phần chỉ số này mới được tính cho phòng đó
            khi tính tiền.
            <br />- Đối với lần đầu tiên sử dụng phần mềm bạn sẽ phải nhập chỉ số cũ và mới cho tháng sử dụng đầu tiên,
            các tháng tiếp theo phần mềm sẽ tự động lấy chỉ số mới tháng trước làm chỉ số cũ tháng sau.
          </p>
        </div>{' '}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 8 }} />
          </form>
        </div>
      </section>
    </section>
  );
};

export default DataWater;
