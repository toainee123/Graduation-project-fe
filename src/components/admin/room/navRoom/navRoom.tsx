import { SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NavRoom = () => {
    return (
        <div className="room_selected row" >
            <div className="room_form">
                <form action="">
                    <Select
                        defaultValue="-Trạng thái phòng-"
                        style={{ width: 200 }}
                        options={[
                            {
                                label: '-Trạng thái phòng-',
                                options: [
                                    { label: 'Còn trống', value: 'jack' },
                                    { label: 'Đã cho thuê', value: 'lucy' },
                                ],
                            },
                        ]}
                    />
                    <Select
                        defaultValue="-Trạng thái phí-"
                        style={{ width: 200 }}
                        options={[
                            {
                                label: '-Trạng thái phí-',
                                options: [
                                    { label: 'Chưa thu phí', value: 'jack' },
                                ],
                            },
                        ]}
                    />
                    <Input style={{ width: 200 }} placeholder="Tìm phòng..." />
                    <button className='btn_search'><SearchOutlined /> Tìm kiếm</button>
                </form>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className='inline-block'>
                    <span className='font-semibold text-base px-2'>Còn trống 3</span>
                    <span className='font-semibold text-base px-2 border-r-2 border-l-2 border-black'>Đã cho thuê 1</span>
                    <span className='font-semibold text-base px-2'>Chưa thu phí</span>
                </div>
                <div className=''>
                    <Link to="#">
                        <button className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900"><i className="fa-sharp fa-solid fa-upload"></i> Nhập từ phòng từ excel</button>
                    </Link>
                    <Link to="#">
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'> <i className="fa-solid fa-users"></i> Khách thuê</button>
                    </Link>
                    <Link to="#">
                        <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'><i className="fa-solid fa-list"></i> Phòng</button>
                    </Link>
                    <Link to="#">
                        <button className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'><i className="fa-solid fa-building-columns"></i> Thêm nhà</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavRoom