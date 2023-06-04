import React from 'react'
import "./createRoom.scss"
import { useNavigate } from 'react-router-dom'

const CreateRoom = () => {
    const navigate = useNavigate()
    return (
        <div className='create_page h-full'>
            <div className='title_page'>
                <h1>Thêm Phòng</h1>
            </div>
            <div className='mt-8'>
                <form action="">
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor="" className='w-64 text-base font-semibold'>Phòng số</label>
                        <div className='w-full'>
                            <input className='w-full border-2 p-4 outline-0' type="text" placeholder='Phòng số' />
                        </div>
                        <label htmlFor="" className="w-64 text-base font-semibold">Nhà</label>
                        <div className='w-full'>
                            <select className='w-full border-2 p-4 outline-0' name="" id="">
                                <option value="">tầng 1</option>
                                <option value="">tầng 2</option>
                                <option value="">tầng 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor="" className='w-64 text-base font-semibold'>Số lượng người tối đa</label>
                        <div className='w-full'>
                            <input className='w-full border-2 p-4 outline-0' type="number" placeholder='Số lượng người tối đa' />
                        </div>
                        <label htmlFor="" className="w-64 text-base font-semibold">Đơn giá</label>
                        <div className='w-full'>
                            <input className='w-full border-2 p-4 outline-0' type="number" placeholder='Đơn giá' />
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor="" className='w-64 text-base font-semibold'>Dài</label>
                        <div className='w-full'>
                            <input className='w-full border-2 p-4 outline-0' type="number" placeholder='Chiều dài phòng' />
                        </div>
                        <label htmlFor="" className="w-64 text-base font-semibold">Rộng</label>
                        <div className='w-full'>
                            <input className='w-full border-2 p-4 outline-0' type="number" placeholder='Chiều rộng phòng' />
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'>

                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'>
                        <label htmlFor="" className='w-28 text-base font-semibold'>Mô tả</label>
                        <div className='w-full'>
                            <textarea className='w-full border-2 p-4' rows={5} placeholder='Mô tả phòng...'></textarea>
                        </div>
                    </div>
                    <div className='flex justify-between items-center gap-12 py-3'>
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
                    </div>

                    <div className="sticky bottom-0 py-3 mt-8 bg-gray-100 border rounded flex justify-end">
                        <div>
                            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Gửi</button>
                            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 " onClick={() => navigate(-1)} >Hủy</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom