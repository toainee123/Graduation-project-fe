import React, { useEffect, useState } from 'react';
// import './style.scss';
import { Checkbox, Select } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getApiDetailService, postApiService, putApiService } from './api';
import './style.scss'
import { listItemService } from './constant';
import moment from 'moment';
import { clearStore } from './reducer';



const UpdateSevice = () => {
    const
        updateServiceStore
            = useSelector((state) => state.updateService)
    const {
        addService,
        detailService, // chi tiết service
        updateService, // chi tiết service
    } = updateServiceStore
    const { state } = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(addService)
    const [dataRequest, setDataRequest] = useState({
        serviceName: null,
        serviceType: null,
        price: null,
        using: null,
        serviceDescription: null,
    })

    useEffect(() => {
        if (addService && addService.id && !state) {
            dispatch(clearStore())
            navigate(`/admin/${urlRouter.SERVICE}`)
        }
    }, [addService])
    useEffect(() => {
        if (updateService && updateService.id && state) {
            dispatch(clearStore())
            navigate(`/admin/${urlRouter.SERVICE}`)
        }
    }, [updateService])
    useEffect(() => {
        if (state && state.id) {
            dispatch(getApiDetailService(state.id))
        }
    }, [state])
    useEffect(() => {
        if (detailService && detailService.id) {
            setDataRequest(detailService)
        }
    }, [detailService])

    console.log(dataRequest)
    const handleUpdateField = (e, field, type) => {
        if (type === "CHECK-BOX") {
            return setDataRequest({
                ...dataRequest,
                [field]: e.target.checked
            })
        }
        if (type === "SELECT") {
            return setDataRequest({
                ...dataRequest,
                [field]: e
            })
        }
        if (type === "DATE") {
            return setDataRequest({
                ...dataRequest,
                [field]: moment(e).format("YYYY/MM/DD")
            })
        }
        return setDataRequest({
            ...dataRequest,
            [field]: e.target.value
        })
    }
    const handleAdd = () => {
        const newDataRequestAddService = {
            ...dataRequest,
        }
        dispatch(postApiService(newDataRequestAddService))
    }
    const handleEdit = () => {
        const newDataRequestAddService = {
            ...dataRequest,
        }
        dispatch(putApiService(newDataRequestAddService))
    }

    const renderItem = (item) => {
        if (item.type === "TEXT") {
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
                        <input
                            className='w-full border-2 p-4 outline-0'
                            type='text'
                            onChange={e => handleUpdateField(e, item.field, item.type)}
                            placeholder={item.placeholder}
                            value={dataRequest[item.field]}
                        />
                    </div>
                </div>
            )
        }
        if (item.type === "NUMBER") {
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
                        <input
                            className='w-full border-2 p-4 outline-0'
                            type='number'
                            onChange={e => handleUpdateField(e, item.field, item.type)} placeholder={item.placeholder}
                            value={dataRequest[item.field]}
                        />
                    </div>
                </div>
            )
        }
        if (item.type === "SELECT") {
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
                            value={dataRequest[item.field]}
                        />
                    </div>
                </div>
            )
        }
        if (item.type === "TEXT-AREA") {
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
                            onChange={e => handleUpdateField(e, item.field, item.type)}
                            placeholder={item.placeholder}
                            value={dataRequest[item.field]}
                        />
                    </div>
                </div>
            )
        }
        if (item.type === "CHECK-BOX") {
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
                            checked={dataRequest[item.field]}
                        />
                    </div>
                </div>
            )
        }
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
                            onChange={e => handleUpdateField(e, "using", "CHECK-BOX")}
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
                        {state && state.id ? (
                            <button
                                className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2'
                                onClick={() => handleEdit()}
                            >
                                <i className='fa-solid fa-check'></i>
                                Cập nhật
                            </button>
                        ) : (
                            <button
                                className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2'
                                onClick={() => handleAdd()}
                            >
                                <i className='fa-solid fa-check'></i>
                                Thêm mới
                            </button>
                        )}
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
