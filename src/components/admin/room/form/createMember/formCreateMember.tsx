import React, { useState } from 'react'
import './formCreateMember.scss'
import { useNavigate } from 'react-router-dom'
import { DatePicker, Form, Input, Radio, Select } from 'antd'

const FormCreateMember = () => {
    const navigate = useNavigate()
    const start = new Date(Date.now());
    const getDate = new Intl.DateTimeFormat("vn-VI").format(start);
    const { Option } = Select
    const onFinish = (e: any) => {
        console.log(e);

    }
    return (

        <Form
            onFinish={onFinish}
            size='large'>
            <div className='lg:flex justify-between items-center gap-2 py-3 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-24 text-base font-semibold'>Hình ảnh</label>
                <div className='w-full'>
                    <div className="flex items-center justify-center w-full">
                        <Form.Item name="">
                            <Input />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Họ và tên</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="name" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">CMND/CCCD</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="cccd" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4 '>
                <div className='w-48 text-base font-medium text-slate-500'>
                    <button className='p-2 bg-sky-600 text-white rounded hover:bg-sky-700'>Lấy khách cũ</button>
                </div>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item name="gender" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Radio.Group >
                            <Radio value={1}>Nam</Radio>
                            <Radio value={2}>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Ngày cấp</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="dateRangeCccd" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <DatePicker className='w-full' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4 '>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Điện thoại 1</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="phone" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full ' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi cấp</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item name="issuedCccdBy" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Select className='w-full text-center'>
                            <Option value="">1</Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 gap-8 justify-between items-center gap-8 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <DatePicker className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' placeholder='Đơn giá' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Địa chỉ thường chú</label>
                <div className="lg:w-1/2 sm:w-full ">
                    <Form.Item name="">
                        <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                            <Input className='w-full' placeholder='Địa chỉ thường chú' />
                        </Form.Item>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Email</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="email" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' placeholder='Email' />
                    </Form.Item>
                </div>

            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Số lượng người tối đa</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' placeholder='Số lượng người tối đa' />
                    </Form.Item>
                </div>
                <label htmlFor="vehicleNumber" className="w-48 text-base font-medium text-slate-500">Biển số xe</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' placeholder='biển số xe' />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Thuê phòng số</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item name="roomId" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Select className='w-full text-center'>
                            <Option value="">1</Option>
                        </Select>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Tiền phòng</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' />
                    </Form.Item>
                </div>
            </div>

            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="date" className='w-48 text-base font-medium text-slate-500'>Ngày bắt đầu</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <DatePicker className='w-full' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Đặt cọc</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Input className='w-full' placeholder='Đơn giá' />
                    </Form.Item>
                </div>
            </div>

            <div className='lg:flex gap-12 justify-between items-center gap-2 md:justify-start gap-8 my-4'>
                <label htmlFor="" className="w-40 text-base font-medium text-slate-500">Ghi chú khác</label>
                <div className='w-full '>
                    <Form.Item name="description" rules={[{ required: true, message: "Không được bỏ trống" }]}
                    >
                        <Input.TextArea rows={10} cols={201} className='textArea' maxLength={650} showCount={true} placeholder='Aa' />
                    </Form.Item>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end py-2">
                <Form.Item name="">
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Gửi</button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default FormCreateMember