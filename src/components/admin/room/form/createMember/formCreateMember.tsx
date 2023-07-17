import React, { useState } from 'react'
import './formCreateMember.scss'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Form, Input, Radio, Select } from 'antd'

const FormCreateMember = () => {
    const navigate = useNavigate()
    const start = new Date(Date.now());
    const getDate = new Intl.DateTimeFormat("vn-VI").format(start);
    const { Option } = Select

    return (

        <Form
            size='large'>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Họ và tên</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">CMND/CCCD</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-3 '>
                <div className='w-48 text-base font-medium text-slate-500'>
                    <button className='p-2 bg-sky-600 text-white rounded hover:bg-sky-700'>Lấy khách cũ</button>
                </div>
                <div className='lg:w-1/2 sm:w-full '>
                    <Radio.Group >
                        <Radio value={1}>Nam</Radio>
                        <Radio value={2}>Nữ</Radio>
                    </Radio.Group>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Ngày cấp</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <DatePicker className='w-full' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-3 '>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Điện thoại 1</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full ' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi cấp</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item>
                        <Select className='w-full text-center'>
                            <Option value="">1</Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 gap-8 justify-between items-center gap-8 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Điện thoại 2</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Email</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Email' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-40 text-base font-medium text-slate-500'>Địa chỉ thường chú</label>
                <div className='w-full '>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Địa chỉ' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Số lượng người tối đa' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Đơn giá' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Thuê phòng số</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item>
                        <Select className='w-full text-center'>
                            <Option value="">1</Option>
                        </Select>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Tiền phòng</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
            </div>

            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày bắt đầu</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Đặt cọc</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Đơn giá' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Thanh toán mỗi lần</label>
                <div className="lg:w-1/2 sm:w-full ">
                    <Form.Item>
                        <Select className='w-full text-center'>
                            <Option value="">1</Option>
                        </Select>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Biển số xe</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='biển số xe' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Người giới thiệu</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Đặt cọc</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Đơn giá' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-2 md:justify-start gap-8 my-3'>
                <label htmlFor="" className="w-40 text-base font-medium text-slate-500">Ghi chú khác</label>
                <div className='w-full '>
                    <Form.Item rules={[{ required: true, message: "không được bỏ trống trường" }]}>
                        <Input className='w-full' placeholder='Đơn giá' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex justify-between items-center gap-2 py-3 md:justify-start gap-8 my-3'>
                <label htmlFor="" className='w-24 text-base font-semibold'>Hình ảnh</label>
                <div className='w-full'>
                    <div className="flex items-center justify-center w-full">
                        <Form.Item>
                            <Input />
                        </Form.Item>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end py-2">
                <div>
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Gửi</button>
                    <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 " onClick={() => navigate(-1)} >Hủy</button>
                </div>
            </div>
        </Form>
    )
}

export default FormCreateMember