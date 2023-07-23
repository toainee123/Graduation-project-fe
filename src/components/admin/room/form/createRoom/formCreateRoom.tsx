import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd'
import type { UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import "./formCreateRoom.scss"
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getAllHouse } from 'src/features/room/houseSlice';
import { limitCountUpload } from 'src/utils/constants';
import { createRooms } from 'src/features/room/roomSlice';

const FormCreateRoom = () => {
    const [countImg, setCountImg] = useState([])
    const [limitprice, setLimitPrice] = useState(Number);
    const { Option } = Select

    const house = useAppSelector(state => state.house.value)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllHouse())
    }, [])

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            const isImg = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
            if (!isImg) {
                message.error("Chỉ nhận file jpeg/jpg/png")
                return isImg || Upload.LIST_IGNORE;
            };

            const isLimitImg = file.size / 1024 / 1024 <= limitCountUpload.LIMIT_SIZE;
            if (!isLimitImg) {
                message.error(`Ảnh không vượt quá 2MB!`);
                return isLimitImg || Upload.LIST_IGNORE;
            };
        },
        onChange: (info: any) => {
            setCountImg(info.fileList)
        },
        showUploadList: {
            showPreviewIcon: false
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 2,
            format: (percent) => percent && `${parseFloat(percent.toFixed(1))}%`,
        },
        maxCount: limitCountUpload.LIMIT_COUNT,
    };

    const onChange = (value: any) => {
        setLimitPrice(value)
    }
    const onFinish = async (values: any) => {
        try {
            await dispatch(createRooms(values))
            message.success(`Thêm nhà ${values.name} thành công`)
        } catch (error) {
            message.error(`thêm nhà ${values.name} thất bại`)
        }

    }
    return (
        <div className='mt-8'>
            <Form
                size='large'
                onFinish={onFinish}
            >
                <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
                    <label htmlFor="" className='w-28 text-base font-semibold'>Hình ảnh</label>
                    <Form.Item name="image" className='form-upload'>
                        {/* <Upload listType="picture-card" multiple={true} action="local" >
                            {countImg.length >= limitCountUpload.LIMIT_COUNT ? null : (
                                <div className='btn-upload'>
                                    <PlusOutlined />
                                    <div className='mt-2'>Upload</div>
                                    <span>{countImg.length}/{limitCountUpload.LIMIT_COUNT}</span>
                                </div>
                            )}
                        </Upload> */}
                        <Input placeholder='Link' className='w-full outline-0 md: my-2' />
                    </Form.Item>
                </div>

                <div className='lg:flex justify-between py-2 items-center gap-8 md:justify-start gap-8'>
                    <label htmlFor="" className='w-64 text-base font-semibold'>Phòng số</label>
                    <div className='w-full items-center'>
                        <Form.Item name="name" rules={[{ required: true, message: "Không được bỏ trống" }]}>
                            <Input className='w-full outline-0 md: my-2' type="text" placeholder='Phòng số' />
                        </Form.Item>
                    </div>
                    <label htmlFor="" className="w-64 text-base font-semibold">Nhà</label>
                    <div className='w-full'>
                        <Form.Item name="houseId" rules={[{ required: true, message: "Không được bỏ trống" }]}>
                            <Select
                                placeholder="Lựa chọn nhà"
                                allowClear
                            >
                                {house?.result?.map((item: any, i: any) => (
                                    <Option key={i} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8' >
                    <label htmlFor="" className='w-64 text-base font-semibold'>Số lượng người tối đa</label>
                    <div className='w-full'>
                        <Form.Item name="maxCustomer" rules={[{ required: true, message: "Không được bỏ trống" }]}>
                            <InputNumber type='number' style={{ borderRadius: 6 }} controls={false} min={1} max={6} className='w-full outline-0 md: my-2' placeholder='Số lượng người tối đa' addonAfter="VNĐ" />
                        </Form.Item>
                    </div>
                    <label htmlFor="" className="w-64 text-base font-semibold">Đơn giá</label>
                    <div className='w-full'>
                        <Form.Item name="price" rules={[{ required: true, message: "Không được bỏ trống" }]}>
                            <InputNumber
                                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(?: \b|-)([1-9]{1, 2}[0]?|1000)\b/g)}
                                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                onChange={onChange}
                                controls={false}
                                className='w-full outline-0 md: my-2' placeholder='Đơn giá' addonAfter="VNĐ"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
                    <label htmlFor="" className='w-28 text-base font-semibold'>Diện tích phòng</label>
                    <div className='w-full'>
                        <Form.Item name="area" rules={[{ required: true, message: "Không được bỏ trống" }]}>
                            <InputNumber className='w-full outline-0 items-center md: my-2' placeholder='Diện tích phòng (m2)' addonAfter="M2" />
                        </Form.Item>
                    </div>
                </div>
                <div className='lg:flex justify-between py-2 items-center gap-12 md:justify-start gap-8'>
                    <label htmlFor="" className='w-28 text-base font-semibold'>Mô tả</label>
                    <Form.Item name="description" rules={[{ required: true, message: "Không được bỏ trống" }]}
                    >
                        <Input.TextArea rows={10} cols={201} className='textArea' maxLength={650} showCount={true} placeholder='Aa' />
                    </Form.Item>
                </div>
                <Form.Item>
                    <div className="sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end">
                        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Gửi</button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormCreateRoom