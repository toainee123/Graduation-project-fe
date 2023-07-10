import React from 'react'

const Contract = () => {
    return (
        <div>
            <span className='font-medium text-slate-500 py-2'>Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng.</span>
            <div className='ml-3 mr-3'>
                <form action="">
                    <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8'>
                        <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Số hợp đồng</label>
                        <div className='lg:w-1/2 sm:w-full'>
                            <input className='w-full border-2 p-2 outline-0 md: my-2' type="text" />
                        </div>
                        <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Thời gian hợp đồng</label>
                        <div className='lg:w-1/2 sm:w-full'>
                            <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" />
                        </div>
                    </div>
                    <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8'>
                        <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày hợp đồng</label>
                        <div className='lg:w-1/2 sm:w-full'>
                            <input className='w-full border-2 p-2 outline-0 md: my-2' type="text" />
                        </div>
                        <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Ngày kết thúc HĐ</label>
                        <div className='lg:w-1/2 sm:w-full'>
                            <input className='w-full border-2 p-2 outline-0 md: my-2' type="number" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contract