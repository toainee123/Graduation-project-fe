import React, { useState } from 'react';
import './style.scss';
import { Checkbox, DatePicker, Select } from 'antd';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';


const UpdateSevice = () => {

    const [dataRequest, setDataRequest] = useState({
        ariseName: null,
        type: null,
        price: null,
        using: null,
        description: null,
    })

    const handleUpdateField = (e, field, type) => {
        if (type === "checkbox") {
            return setDataRequest({
                ...dataRequest,
                [field]: e.target.checked
            })
        }
        return setDataRequest({
            ...dataRequest,
            [field]: e.target.value
        })
    }
    console.log(dataRequest)
    return (
        <>
            <div>
                <h1>Thêm phát sinh</h1>
            </div>
            <div className='mt-8'>
                <form action=''>
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor='' className='w-64 text-base font-semibold'>
                            Nhà <b className='color-red'>*</b>
                        </label>
                        <div className='w-full'>
                            <Select
                                defaultValue='lucy'
                                className='w-full'
                                //   onChange={handleChange}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                ]}
                            />
                        </div>
                        <label htmlFor='' className='w-64 text-base font-semibold'>
                            Phòng <b className='color-red'>*</b>
                        </label>
                        <div className='w-full'>
                            <Select
                                defaultValue='lucy'
                                className='w-full'
                                //   onChange={handleChange}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor='' className='w-64 text-base font-semibold'>
                            Tháng/năm <b className='color-red'>*</b>
                        </label>
                        <div className='w-full'>
                            <DatePicker
                                className='w-full'
                            // onChange={onChange}
                            />
                        </div>
                        <label htmlFor='' className='w-64 text-base font-semibold'>
                            Số tiền
                        </label>
                        <div className='w-full'>
                            <input className='border-2 p-4 outline-0 w-full' type='number' onChange={e => handleUpdateField(e, "price", "text")} placeholder='Đơn giá' />
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'></div>
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor='' className='w-28 text-base font-semibold'>
                            Nội dung
                        </label>
                        <div className='w-full'>
                            <textarea
                                className='w-full border-2 p-4'
                                rows={5}
                                onChange={e => handleUpdateField(e, "description", "text")}
                                placeholder='Thông tin ghi chú ...'
                            />
                        </div>
                    </div>
                    {/* <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor="" className='w-28 text-base font-semibold'>Hình ảnh</label>
                        <div className='w-full'>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div> */}
                    <div className='warning-title'>
                        <h3> (*) Thông tin bắt buộc</h3>
                    </div>
                    <div className='sticky bottom-0 py-3 mt-8 bg-gray-100 border rounded flex justify-end'>
                        <div>
                            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  '>
                                <i className='fa-solid fa-check'></i> Gửi
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
                </form>
            </div>
        </>
    );
};

export default UpdateSevice;
