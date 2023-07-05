import React from 'react'
import './formCreateMember.scss'
import { useNavigate } from 'react-router-dom'

const FormCreateMember = () => {
    const navigate = useNavigate()

    const start = new Date(Date.now());
    const getDate = new Intl.DateTimeFormat("vn-VI").format(start);

    return (
        <form action="">
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Họ và tên</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="text" />
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">CMND/CCCD</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8'>
                <div className='w-48 text-base font-medium text-slate-500'>
                    <button className='p-3 bg-sky-600 text-white rounded hover:bg-sky-700'>Lấy khách cũ</button>
                </div>
                <div className='lg:w-1/2 sm:w-full my-2 flex'>
                    <div>
                        <input type="radio" className='mx-2' name="Gender" id="rad1" />
                        <label htmlFor="rad1" className='mx-4'>Nam</label>
                    </div>
                    <div className='mx-4'>
                        <input type="radio" className='mx-2' name="Gender" id="rad2" />
                        <label htmlFor="rad2" className='mx-4'>Nữ</label>
                    </div>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Ngày cấp</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="date" />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Điện thoại 1</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" />
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi cấp</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <select className='w-full border-2 p-2 outline-0 md: my-2' name="" id="">
                        <option value="">tầng 1</option>
                        <option value="">tầng 2</option>
                        <option value="">tầng 3</option>
                    </select>
                </div>
            </div>
            <div className='lg:flex gap-12 gap-8 justify-between items-center gap-8 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Điện thoại 2</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" />
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Email</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="email" placeholder='Email' />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center md:justify-start gap-8'>
                <label htmlFor="" className='w-40 text-base font-medium text-slate-500'>Địa chỉ thường chú</label>
                <div className='w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="text" placeholder='Địa chỉ' />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="date" placeholder='Số lượng người tối đa' />
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="date" placeholder='Đơn giá' />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Thuê phòng số</label>
                <div className='lg:w-1/2 sm:w-full'>

                    <select className='w-full border-2 p-2 outline-0 md: my-2 text-center' name="" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Tiền phòng</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" />
                </div>
            </div>

            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày bắt đầu</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="date" />
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Đặt cọc</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" placeholder='Đơn giá' />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Thanh toán mỗi lần</label>
                <div className="lg:w-1/2 sm:w-full">
                    <select className='w-full border-2 p-2 outline-0 md: my-2 text-center' name="" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">12</option>
                    </select>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Biển số xe</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="text" placeholder='biển số xe' />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Người giới thiệu</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="text" />
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Đặt cọc</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" placeholder='Đơn giá' />
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-2 md:justify-start gap-8'>
                <label htmlFor="" className="w-40 text-base font-medium text-slate-500">Ghi chú khác</label>
                <div className='w-full'>
                    <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" placeholder='Đơn giá' />
                </div>
            </div>
            <div className='lg:flex justify-between items-center gap-2 py-3 md:justify-start gap-8'>
                <label htmlFor="" className='w-40 text-base font-semibold'>Hình ảnh</label>
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
            </div>

            <div className="sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end py-2">
                <div>
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Gửi</button>
                    <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 " onClick={() => navigate(-1)} >Hủy</button>
                </div>
            </div>
        </form>
    )
}

export default FormCreateMember