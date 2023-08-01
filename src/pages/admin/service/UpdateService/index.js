import React, { useState } from 'react';
// import './style.scss';
import { Checkbox, Select } from 'antd';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import { useDispatch } from 'react-redux';
import { postApiService } from './api';
import './style.scss'
import { checkBoxType, listItemService, numberType, selectType, textAreaType, textType } from './constant';



const UpdateSevice = () => {
    const dispatch = useDispatch();
    const [dataRequest, setDataRequest] = useState({
        serviceName: null,
        serviceType: null,
        price: null,
        using: null,
        serviceDescription: null,
    })
    // 
    const handleUpdateField = (e, field, type) => {
        if (type === checkBoxType) {
            return setDataRequest({
                ...dataRequest,
                [field]: e.target.checked
            })
        }
        if (type === selectType) {
            return setDataRequest({
                ...dataRequest,
                [field]: e
            })
        }
        return setDataRequest({
            ...dataRequest,
            [field]: e.target.value
        })
    }

    const renderItem = (item) => {
        if (item.type === textType) {
            return (
                <div
                    className='col-6 justify-between items-center flex float-left'
                >
                    <div className='col-25'>
                        <label htmlFor='' className=' text-base font-semibold'>
                            {item.label} {item.required && (<b className='color-red'>*</b>)}
                        </label>
                    </div>
                    <div className='col-75'>
                        <input className='w-full border-2 p-4 outline-0' type='text' onChange={e => handleUpdateField(e, item.field, item.type)} placeholder={item.placeholder} />
                    </div>
                </div>
            )
        }
        if (item.type === numberType) {
            return (
                <div
                    className='col-6 justify-between items-center flex float-left'
                >
                    <div className='col-25'>
                        <label htmlFor='' className=' text-base font-semibold'>
                            {item.label} {item.required && (<b className='color-red'>*</b>)}
                        </label>
                    </div>
                    <div className='col-75'>
                        <input className='w-full border-2 p-4 outline-0' type='number' onChange={e => handleUpdateField(e, item.field, item.type)} placeholder={item.placeholder} />
                    </div>
                </div>
            )
        }
        if (item.type === selectType) {
            return (
                <div
                    className='col-6 justify-between items-center flex float-left'
                >
                    <div className='col-25'>
                        <label htmlFor='' className=' text-base font-semibold'>
                            {item.label} {item.required && (<b className='color-red'>*</b>)}
                        </label>
                    </div>
                    <div className='col-75 h-58'>
                        <Select
                            size='large'
                            className='w-full'
                            onChange={e => handleUpdateField(e, item.field, item.type)}
                            options={[
                                {
                                    value: 'Premium',
                                    label: 'Premium',
                                },
                                {
                                    value: 'Special',
                                    label: 'Special',
                                },
                                {
                                    value: 'Economy',
                                    label: 'Economy',
                                },
                            ]}
                        />
                    </div>
                </div>
            )
        }
        if (item.type === textAreaType) {
            return (
                <div
                    className='col-12 justify-between items-center flex float-left'
                >
                    <div className='col-2'>
                        <label htmlFor='' className=' text-base font-semibold'>
                            {item.label} {item.required && (<b className='color-red'>*</b>)}
                        </label>
                    </div>
                    <div className='col-10 h-58'>
                        <textarea
                            className='w-full border-2 p-4'
                            rows={5}
                            onChange={e => handleUpdateField(e, item.field, textAreaType)}
                            placeholder='Thông tin ghi chú ...'
                        />
                    </div>
                </div>
            )
        }
        if (item.type === checkBoxType) {
            return (
                <div
                    className='col-6 justify-between items-center flex float-left'
                >
                    <div className='col-25'>
                        <label htmlFor='' className=' text-base font-semibold'>
                            {item.label} {item.required && (<b className='color-red'>*</b>)}
                        </label>
                    </div>
                    <div className='col-75 h-58'>
                        <Checkbox
                            onChange={e => handleUpdateField(e, item.field, item.type)}
                        />
                    </div>
                </div>
            )
        }
    }

    const onHandleAddService = () => {
        const newDataRequestAddService = {
            ...dataRequest,
        }
        console.log(newDataRequestAddService)
        // dispatch(postApiService(newDataRequestAddService))
    }

    return (
        <>
            <div>
                <h1>Sửa dịch vụ</h1>
            </div>
            <div className='mt-8'>
                {/* <form action=''>     */}
                {/* <div className='flex justify-between items-center gap-12 py-3'> */}
                <div
                    className='col-12'
                >
                    {listItemService.map((item) => renderItem(item))}
                    {/* <div
                        className='col-6 justify-between items-center flex'
                    >
                        <div className='col-25'>
                            <label htmlFor='' className=' text-base font-semibold'>
                                Tên dịch vụ <b className='color-red'>*</b>
                            </label>
                        </div>
                        <div className='col-75'>
                            <input className='w-full border-2 p-4 outline-0' type='text' onChange={e => handleUpdateField(e, "serviceName", "text")} placeholder='Tên dịch vụ' />
                        </div>
                    </div>
                    <div
                        className='col-6'
                    >
                        <label htmlFor='' className='w-64 text-base font-semibold'>
                            Loại <b className='color-red'>*</b>
                        </label>
                        <div className='w-full'>
                            <select className='border-2 p-4 outline-0 w-full' onChange={e => handleUpdateField(e, "serviceType", "select")} name='' id=''>
                                <option defaultChecked  >Chọn loại dịch vụ</option>
                                <option value='1'>Loại 1</option>
                                <option value='2'>Loại 2</option>
                                <option value='3'>Loại 3</option>
                            </select>
                        </div>
                    </div> */}
                </div>
                {/* </div> */}
                {/* <div className='flex justify-between items-center gap-12 py-3'>
                    <label htmlFor='' className='w-64 text-base font-semibold'>
                        Đơn giá <b className='color-red'>*</b>
                    </label>
                    <div className='w-full'>
                        <input className='border-2 p-4 outline-0 w-full' type='number' onChange={e => handleUpdateField(e, "price", "text")} placeholder='Đơn giá' />
                    </div>
                    <label htmlFor='' className='w-64 text-base font-semibold'>
                        Đang dùng
                    </label>
                    <div className='w-full'>
                        <Checkbox
                            onChange={e => handleUpdateField(e, "using", "checkbox")}
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center gap-12 py-3'></div>
                <div className='flex justify-between items-center gap-12 py-3'>
                    <label htmlFor='' className='w-28 text-base font-semibold'>
                        Ghi chú
                    </label>
                    <div className='w-full'>
                        <textarea
                            className='w-full border-2 p-4'
                            rows={5}
                            onChange={e => handleUpdateField(e, "description", "text")}
                            placeholder='Thông tin ghi chú ...'
                        />
                    </div>
                </div> */}
                <div className='warning-title'>
                    <h3> (*) Thông tin bắt buộc</h3>
                </div>
                <div className='sticky bottom-0 py-3 mt-8 bg-gray-100 border rounded flex justify-end'>
                    <div>
                        <button
                            onClick={onHandleAddService}
                            className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2'
                        >
                            Thêm dịch vụ
                        </button>
                        <Link
                            to={`/admin/${urlRouter.SERVICE}`}
                        >
                            <button className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 '>
                                Hủy
                            </button>
                        </Link>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </>
    );
};

export default UpdateSevice;
