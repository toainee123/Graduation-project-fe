import React, { useEffect, useState } from 'react'

import './clienRoom.css'
import { getInfoRoomUser } from 'src/api/dashboard';

const ClientRoom = () => {
    const [dataRoom, setDataRoom] = useState<any>()
    const [infoCustomer, setInfoCustomer] = useState([])
    // const [dataRoom, setDataRoom] = useState()
    useEffect(() => {
        const getDataRoom = async () => {
            const { data } = await getInfoRoomUser()
            setDataRoom(data.infoRoom)
            setInfoCustomer(data.infoCustomer)
        }
        getDataRoom()
    }, [])

    return (
        <div>
            <div className='title_page'>
                <h1>Thông tin phòng</h1>
            </div>
            <div className='mt-8'>
                <div>
                    <table className="table-fixed w-full box-content">
                        <thead>
                            <tr className='py-5 bg-slate-100'>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Tên phòng</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Giá thuê phòng</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Diện tích phòng</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Số lượng người tối đa</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Số người ở hiện tại</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center text-md text-gray-600 font-semibold'>
                                <td>{dataRoom?.name}</td>
                                <td>{Number(dataRoom?.price).toLocaleString('VND')}</td>
                                <td>{dataRoom?.area}m2</td>
                                <td>{dataRoom?.maxcustomer}</td>
                                <td>{dataRoom?.countCustomer}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='mt-8'>
                    <div className='box-content-titlte mb-2'>
                        <h2>Các thành viên trong phòng</h2>
                    </div>
                    <table className="table-fixed w-full box-content ">
                        <thead>
                            <tr className='py-5 bg-slate-100'>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Tên thành viên</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>CMTND/CCCD</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>số điện thoại</th>
                                <th className='text-md py-4 uppercase font-md text-gray-500'>Vai trò</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoCustomer.map((item: any, i: number) => (

                                <tr key={i} className='text-center text-md text-gray-600 font-semibold'>
                                    <td className='font-bold'>{item?.name}</td>
                                    <td>{item?.cccd}</td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.host ? "Chủ phòng" : "thành viên"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-8'>
                    <div className='box-content-titlte mb-5'>
                        <h2>lịch sử thanh toán</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientRoom