import React from 'react'
import { Link } from 'react-router-dom'

const infoRoom = [
    {
        "numberHouse": 1,
        "member": 2,
        "priceRoom": 3000000
    },
    {
        "numberHouse": 2,
        "member": 0,
        "priceRoom": 3000000
    }, {
        "numberHouse": 3,
        "member": 0,
        "priceRoom": 3000000
    },
    {
        "numberHouse": 4,
        "member": 0,
        "priceRoom": 3000000
    }
    , {
        "numberHouse": 5,
        "member": 0,
        "priceRoom": 3000000
    },
    {
        "numberHouse": 6,
        "member": 0,
        "priceRoom": 3000000
    }
]
const CardRoom = () => {
    return (
        <div>
            <div className='inline-block'>
                <span className='font-semibold text-base px-2'>Còn trống 0</span>
                <span className='font-semibold text-base px-2 border-r-2 border-l-2 border-black'>Đã cho thuê 1</span>
                <span className='font-semibold text-base px-2'>Chưa thu phí</span>
            </div>
            <div className=" px-4 sm:py-2 sm:px-1 lg:max-w-full lg:px-2">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                    {infoRoom.map((item, i) => (
                        item.member ? (
                            <div className="m-w-72 h-52 rounded-lg bg-blue-300 p-4 flex flex-col justify-between">
                                <div className="number_house">
                                    <p className='text-base text-gray-500'><i className="fa-solid fa-house"></i> <span>{item.numberHouse}</span></p>
                                </div>

                                <div className="action text-center">
                                    <Link to="#" className='text-blue-700 hover:text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center mr-2 px-2 py-1 '>
                                        <button >
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </Link>
                                    <Link to="#" className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1'>
                                        <button >
                                            <i className="fa-solid fa-gear"></i>
                                        </button>
                                    </Link>
                                </div>
                                <div>
                                    <i className="fa-solid fa-user text-gray-500"></i> <span className='text-green-600 font-bold'>{item.member}</span><br />
                                    <i className="fa-solid fa-money-bill text-gray-500"></i> <span className='text-red-500 font-semibold'>{item.priceRoom}</span>
                                </div>

                                <div className="action text-center">
                                    <Link to="#" className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center mr-2 '>
                                        <button >
                                            <i className="fa-solid fa-gear"></i> Chỉnh sửa
                                        </button>
                                    </Link>
                                    <Link to="#" className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center mr-2 '>
                                        <button >
                                            <i className="fa-solid fa-trash"></i> Xóa
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ) : (

                            <div className="m-w-72 h-52 rounded-lg bg-gray-100 hover:bg-gray-200 p-4 flex flex-col justify-between">
                                <div className="number_house">
                                    <p className='text-base text-gray-500'><i className="fa-solid fa-house"></i> <span>{item.numberHouse}</span></p>
                                </div>
                                <div className="action text-center">
                                    <Link to="#" className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center mr-2 '>
                                        <button >
                                            thêm thành viên
                                        </button>
                                    </Link>
                                </div>
                                <div>
                                    <i className="fa-solid fa-user text-gray-500"></i> <span className='text-green-600 font-bold'>{item.member}</span><br />
                                    <i className="fa-solid fa-money-bill text-gray-500"></i> <span className='text-red-500 font-semibold'>{item.priceRoom}</span>
                                </div>
                                <div className="action text-center">
                                    <Link to="#" className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center mr-2 '>
                                        <button >
                                            <i className="fa-solid fa-gear"></i> Chỉnh sửa
                                        </button>
                                    </Link>
                                    <Link to="#" className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center mr-2 '>
                                        <button >
                                            <i className="fa-solid fa-trash"></i> Xóa
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )

                    ))}
                </div>
            </div>
        </div >
    )
}

export default CardRoom