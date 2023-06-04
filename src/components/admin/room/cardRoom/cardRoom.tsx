import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { type } from 'os';
import React from 'react'
import { Link } from 'react-router-dom'
import { ROOM_TYPE } from 'src/types/room';
import { urlRouter } from 'src/utils/constants';


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

const { confirm } = Modal;
const showDeleteConfirm = () => {
    confirm({
        title: 'Bạn có chắc chắn muốn xóa phòng này không',
        icon: <ExclamationCircleFilled />,
        content: 'Toàn bộ dữ liệu trong phòng, và khách thuê sẽ bị xóa',
        okText: 'Đồng ý',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};
const CardRoom = () => {
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <div className='inline-block'>
                    <span className='font-semibold text-base px-2'>Còn trống 0</span>
                    <span className='font-semibold text-base px-2 border-r-2 border-l-2 border-black'>Đã cho thuê 1</span>
                    <span className='font-semibold text-base px-2'>Chưa thu phí</span>
                </div>
                <div>
                    <Link to={urlRouter.CREATE_ROOM}>
                        <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'><i className="fa-solid fa-bed"></i> Thêm phòng</button>
                    </Link>
                    <Link to="#">
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'><i className="fa-solid fa-pen"></i> Sửa nhà</button>
                    </Link>
                    <Link to="#" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i className="fa-solid fa-trash"></i> Xóa</Link>
                </div>
            </div>
            <div className=" px-4 sm:py-2 sm:px-1 lg:max-w-full lg:px-2">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                    {infoRoom.map((item, i) => (

                        item.member ? (
                            <div className="m-w-72 h-52 rounded-lg bg-blue-300 p-4 flex flex-col justify-between" key={i}>
                                <div className="number_house">
                                    <p className='text-base text-gray-500'><i className="fa-solid fa-house"></i> <span>{item.numberHouse}</span></p>
                                </div>

                                <div className="action text-center">
                                    <Link to="#" className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 mx-1'>
                                        <button >
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </Link>
                                    <Link to="#" className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 mx-1'>
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
                                    <Link to="#" className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '>
                                        <button >
                                            <i className="fa-solid fa-gear"></i> Chỉnh sửa
                                        </button>
                                    </Link>
                                    <button onClick={showDeleteConfirm}>
                                        <Link to="#" className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '>
                                            <i className="fa-solid fa-trash"></i> Xóa
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ) : (

                            <div className="m-w-72 h-52 rounded-lg bg-gray-100 hover:bg-gray-200 p-4 flex flex-col justify-between" key={i}>
                                <div className="number_house">
                                    <p className='text-base text-gray-500'><i className="fa-solid fa-house"></i> <span>{item.numberHouse}</span></p>
                                </div>
                                <div className="action text-center">
                                    <button >
                                        <Link to="#" className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center mr-2 '>
                                            thêm thành viên
                                        </Link>
                                    </button>
                                </div>
                                <div>
                                    <i className="fa-solid fa-user text-gray-500"></i> <span className='text-green-600 font-bold'>{item.member}</span><br />
                                    <i className="fa-solid fa-money-bill text-gray-500"></i> <span className='text-red-500 font-semibold'>{item.priceRoom}</span>
                                </div>
                                <div className="action text-center">
                                    <button >
                                        <Link to="#" className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '>
                                            <i className="fa-solid fa-gear"></i> Chỉnh sửa
                                        </Link>
                                    </button>
                                    <button onClick={showDeleteConfirm}>
                                        <Link to="#" className='text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 '>
                                            <i className="fa-solid fa-trash"></i> Xóa
                                        </Link>
                                    </button>
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