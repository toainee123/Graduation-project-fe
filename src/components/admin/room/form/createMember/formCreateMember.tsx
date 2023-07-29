import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DatePicker, Form, Input, InputNumber, Radio, Select, message } from 'antd';

import './formCreateMember.scss';

import { createRoomTenant, editTenant } from 'src/features/room/roomSlice';
import { useAppDispatch } from 'src/store/hooks';
import { convertDateAntd } from 'src/utils/enums';
import moment from 'moment';
import { urlRouter } from 'src/utils/constants';

const FormCreateMember = ({ detailRoom, initialValues, getData, roomId }: any) => {
    const [limitprice, setLimitPrice] = useState(Number);
    const navigate = useNavigate();
    const search = useLocation().search;
    const keyLocation = new URLSearchParams(search).get('key');
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { Option } = Select;

    useEffect(() => {
        if (getData) {
            const fakeData = {
                id: 12,
                price: getData.price,
                name: getData.name,
                nameroom: getData.nameroom,
                phone: getData.phone,
                email: getData.email,
                address: getData.address,
                other: getData.other,
                bod: moment(getData.bod),
                memberid: 16,
                date: moment(getData.date),
                dateRangeCccd: moment(getData.daterangecccd),
                issuedCccdBy: getData.issuedcccdby,
                cccd: getData.cccd,
                vehicleNumber: getData.vehiclenumber,
                gender: getData.gender,
                image: getData.image,
                maxcustomer: getData.maxcustomer,
                deposit: getData.deposit,
            };
            form.setFieldsValue(fakeData);
        }
    }, [getData]);
    console.log('data romm', getData);

    useEffect(() => {
        if (detailRoom) {
            form.setFieldsValue(detailRoom);
        }
    }, [detailRoom]);

    const onChange = (value: any) => {
        setLimitPrice(value);
    };
    const onFinish = async (values: any) => {
        if (keyLocation === null) {
            const payload = {
                ...values,
                host: true,
                roomId: detailRoom.id,
                bod: convertDateAntd(values.bod),
                date: convertDateAntd(values.date),
                dateRangeCccd: convertDateAntd(values.dateRangeCccd),
            };
            delete payload.price;
            delete payload.maxcustomer;
            delete payload.nameroom;
            delete payload.value;
            await dispatch(createRoomTenant(payload))
                .unwrap()
                .then((resp) => {
                    message.success(`Thêm nhà ${values.name} thành công`);
                })
                .catch((err) => {
                    message.error(`thêm nhà ${values.name} thất bại`);
                });
            navigate(`/admin/${urlRouter.ROOM}`);
        }
    }
    return (
        <Form
            initialValues={{ ...detailRoom, initialValues, getData }}
            form={form}
            onFinish={onFinish}
            size='large'>
            <div className='lg:flex justify-between items-center gap-2 py-3 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-24 text-base font-semibold'>Hình ảnh</label>
                <div className='w-full'>
                    <div className="flex items-center justify-center w-full">
                        <Form.Item name="image">
                            {keyLocation === 'view ' ? <Input readOnly /> : <Input />}
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Họ và tên</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="name" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' />}
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">CMND/CCCD</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="cccd" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' />}
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4 '>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Giới tính</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item name="gender" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <Radio.Group >
                            <Radio value={'Nam'}>Nam</Radio>
                            <Radio value={'Nữ'}>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Ngày cấp</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="dateRangeCccd" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <DatePicker className='w-full' format="DD/MM/YYYY" />
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4 '>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Điện thoại 1</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="phone" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' />}
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi cấp</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item name="issuedCccdBy" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' />}
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 gap-8 justify-between items-center gap-8 md:justify-start gap-8 my-4'>
                <div className='w-48 text-base font-medium text-slate-500'></div>
                <div className='lg:w-1/2 sm:w-full'></div>
                {/* <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Nơi sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="" >
                        <Input className='w-full' placeholder='Nơi sinh' />
                    </Form.Item>
                </div> */}
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày sinh</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="bod" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <DatePicker className='w-full' format="DD/MM/YYYY" disabled /> : <DatePicker className='w-full' format="DD/MM/YYYY" />}
                    </Form.Item>
                </div>

            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Địa chỉ thường chú</label>
                <div className="lg:w-1/2 sm:w-full ">
                    <Form.Item name="address" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' placeholder='Địa chỉ thường chú' />}
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Email</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="email" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' placeholder='Email' />}
                    </Form.Item>
                </div>

            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Số lượng người tối đa</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="maxcustomer" >
                        <Input className='w-full' readOnly placeholder='Số lượng người tối đa' />
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Biển số xe</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="vehicleNumber" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <Input className='w-full' readOnly /> : <Input className='w-full' placeholder='Biển số xe' />}
                    </Form.Item>
                </div>
            </div>
            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="nameroom" className='w-48 text-base font-medium text-slate-500'>Thuê phòng số</label>
                <div className='lg:w-1/2 sm:w-full '>
                    <Form.Item name="nameroom" >
                        <Select disabled className='w-full text-center'>
                            <Option value="1">1</Option>
                        </Select>
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Tiền phòng</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="price" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        <InputNumber
                            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(?: \b|-)([1-9]{1, 2}[0]?|1000)\b/g)}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            onChange={onChange}
                            controls={false}
                            readOnly
                            className='w-full outline-0 md: my-2' placeholder='Đơn giá' addonAfter="VNĐ"
                        />
                    </Form.Item>
                </div>
            </div>

            <div className='lg:flex gap-12 justify-between items-center gap-12 md:justify-start gap-8 my-4'>
                <label htmlFor="" className='w-48 text-base font-medium text-slate-500'>Ngày bắt đầu thuê phòng</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="date" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <DatePicker className='w-full' format="DD/MM/YYYY" disabled /> : <DatePicker className='w-full' format="DD/MM/YYYY" />}
                    </Form.Item>
                </div>
                <label htmlFor="" className="w-48 text-base font-medium text-slate-500">Đặt cọc</label>
                <div className='lg:w-1/2 sm:w-full'>
                    <Form.Item name="deposit" rules={[{ required: true, message: "Không được bỏ trống trường này" }]}>
                        {keyLocation === 'view' ? <InputNumber className='w-full outline-0 md: my-2' addonAfter="VNĐ"
                        /> : <InputNumber
                            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(?: \b|-)([1-9]{1, 2}[0]?|1000)\b/g)}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            onChange={onChange}
                            controls={false}
                            className='w-full outline-0 md: my-2' placeholder='Tiền cọc phòng' addonAfter="VNĐ"
                        />}
                    </Form.Item>
                </div>
            </div>

            <div className='lg:flex gap-12 justify-between items-center gap-2 md:justify-start gap-8 my-4'>
                <label htmlFor="" className="w-40 text-base font-medium text-slate-500">Ghi chú khác</label>
                <div className='w-full '>
                    <Form.Item name="other" rules={[{ required: true, message: "Không được bỏ trống" }]}
                    >
                        {keyLocation === 'view' ? <Input.TextArea rows={10} cols={201} className='textArea' /> : <Input.TextArea rows={10} cols={201} className='textArea' maxLength={650} showCount={true} placeholder='Aa' />}
                    </Form.Item>
                </div>
            </div>

            <div className="sticky bottom-0 mt-8 bg-gray-100 border rounded flex justify-end py-2">
                <button onClick={() => navigate(-1)} className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 '>
                    Hủy
                </button>
                {
                    keyLocation === null &&
                    <Form.Item>
                        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Gửi</button>
                    </Form.Item>
                }
                {
                    keyLocation === 'update' &&
                    <Form.Item>
                        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  "><i className="fa-solid fa-check"></i> Cap nhat</button>
                    </Form.Item>
                }
            </div>
        </Form >
    )
}

export default FormCreateMember
