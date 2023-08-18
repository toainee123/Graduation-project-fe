import React, { useEffect, useState } from 'react'

import './clientRoom.css'
import { getInfoRoomUser } from 'src/api/dashboard';

const ClientRoom = () => {
    const [dataRoom, setDataRoom] = useState<any>()
    const [idxWater, setidxWater] = useState<any>([])
    const [idxElectric, setIdxElectric] = useState([])
    const [infoCustomer, setInfoCustomer] = useState([])
    // const [dataRoom, setDataRoom] = useState()
    useEffect(() => {
        const getDataRoom = async () => {
            const { data } = await getInfoRoomUser()
            setDataRoom(data.infoRoom)
            setInfoCustomer(data.infoCustomer)
            setidxWater(data.indexWater)
            setIdxElectric(data.indexElectric)
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
                                {/* <td>{Number(dataRoom.price).toLocaleString('VND')}</td> */}
                                <td>lỗi giá tiền</td>
                                <td>{dataRoom?.area}m2</td>
                                <td>{dataRoom?.maxcustomer}</td>
                                <td>{dataRoom?.countCustomer}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='mt-8'>
                    <div className='box-content-titlte mb-2'>
                        <h2>Số lượng điện, nước đã sử dụng ({idxElectric.map((item: any) => (`Tháng ${item.month}/${item.year}`))})</h2>
                    </div>
                    <div className='grid lg:grid-cols-4 lg:gap-8 md:grid-cols-2 sm:grid-cols-1 sm:gap-4 '>
                        <div className='text-center box-content-service text-[28px] font-semibold'><i className=" text-blue-400 fa-solid fa-bolt pr-2"></i>{idxElectric.map((item: any) => (item.total))} kWh</div>
                        <div className='text-center box-content-service text-[28px] font-semibold'><i className="text-green-400 fa-solid fa-hand-holding-droplet pr-2"></i>{idxWater.map((item: any) => (item.total))} m3</div>
                    </div>
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
                                    <td className='font-bold'>{item.name}</td>
                                    <td>{item.cccd}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.host ? "Chủ phòng" : "thành viên"}</td>
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