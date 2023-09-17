import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Input, DatePicker, Radio, Space, Popconfirm } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import '../relative/relative.scss'
import { useNavigate, useParams } from 'react-router-dom';

import { addRoomMember, apiGetRoomTenantDetail, deleteMember, getRoom, getRoomMember } from 'src/api/room';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
const Relative = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const { roomId } = useParams();
    const [items, setItems] = useState([]);
    const navigate = useNavigate()
    const [maxCustomer, setMaxCustomer] = useState();
    const [statusAdd, setStatusAdd] = useState(true);
    console.log(roomId);
    // const myParam = useLocation().search;
    // const idH = new URLSearchParams(myParam).get('idHouse');
    const [status, setStatus] = useState(false);
    useEffect(() => {
        const getData = async () => {
            // const respon = await getRoom(idH)
            // setListRoom(respon.data.result.responses)

            const responseMaxCustomer = await apiGetRoomTenantDetail(roomId);

            setMaxCustomer(responseMaxCustomer?.data?.maxcustomer)


            const response = await getRoomMember(roomId);
            const { data } = response;
            setData(data);
            const newArrr = response?.data?.map(item => {
                console.log(moment(item.bod));
                return {
                    id: item.id,
                    name: item.name,
                    bod: moment(item.bod),
                    cccd: item.cccd,
                    address: item.address,
                    host: false,
                    email: item.email,
                    phone: item.phone,
                    vehicleNumber: item.vehiclenumber,
                    gender: item.gender
                }
            })
            form.setFieldsValue(
                { items: newArrr }
            )
        }

        getData();
    }, [status])



    const onFinish = async (values) => {

        const dataMember = data ? data : [];
        console.log(dataMember);
        for (const key in dataMember) {

            await deleteMember(dataMember[key].id);
        }

        const listMemberData = values?.items.map((item) => {
            const birthdayDate = item.bod
            const birthdayDay = birthdayDate.date() + 1 >= 10 ? birthdayDate.date() + 1 : '0' + (birthdayDate.date() + 1)
            const birthdayMonth = birthdayDate.month() + 1 >= 10 ? birthdayDate.month() + 1 : '0' + (birthdayDate.month() + 1)
            const birthdayYear = birthdayDate.year()
            const strBodDate = birthdayYear + '/' + birthdayMonth + '/' + birthdayDay
            return {
                roomId: +roomId,
                name: item.name,
                email: item.email,
                phone: item.phone,
                cccd: item.cccd,
                address: item.address,
                host: false,
                bod: strBodDate,
                vehicleNumber: item.vehicleNumber,
                gender: item.gender
            }
        })


        try {
            for (const key in listMemberData) {
                await addRoomMember(listMemberData[key])
            }
            toast.success('Thành công!!!')
            setStatus(!status);
        } catch (error) {
            console.log(error);
        }
        navigate(-1)
    }

    const handleRemoveItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (

        <Form form={form} onFinish={onFinish} >
            <table className='w-full text-sm text-center' >
                <thead className=" bg-gray-50 dark:bg-gray-700 ">
                    <tr >
                        <th>Họ tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>CCCD/CMTND</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Số xe</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <Form.List name="items" rules={[
                    {
                        validator: async (_, items) => {
                            console.log(items.length);
                            if (items.length >= maxCustomer - 1) {
                                setStatusAdd(false)
                            }

                            if (items.length === 0) {
                                setStatusAdd(true)
                            }

                            if (items.length > 0 && items.length < maxCustomer - 1) {
                                setStatusAdd(true)
                            }
                        },
                    },
                ]}>
                    {(fields, { add, remove }) => (
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={index} className='p-2'>
                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "name"]}
                                            rules={[{ required: true, message: 'Không để trống họ tên' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "bod"]}
                                            rules={[{ required: true, message: 'Không để trống ngày sinh' }]}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                    </td>

                                    <td className='gender'>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "gender"]}
                                            rules={[{ required: true, message: 'Không để trống giới tính' }]}
                                        >
                                            <Radio.Group>
                                                <Radio value={'MALE'}>Nam</Radio>
                                                <Radio value={'FEMALE'}>Nữ</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "cccd"]}
                                            rules={[{ required: true, message: 'Không để trống cccd' }]}

                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "address"]}
                                            rules={[{ required: true, message: 'Không để trống địa chỉ' }]}

                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            rules={[{ required: true, message: 'Không để trống số điện thoại' }]}
                                            name={[field.name, "phone"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "vehicleNumber"]}
                                            rules={[{ required: true, message: 'Không để trống số xe' }]}

                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "email"]}
                                            rules={[{ required: true, message: 'Không để trống email' }]}

                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                        >
                                            <Button onClick={() => remove(field.name)} block className='flex justify-center items-center' type="primary" danger>
                                                <DeleteOutlined />
                                            </Button>
                                        </Form.Item>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>
                                    {" "}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => {
                                            console.log(statusAdd);
                                            if (statusAdd) {
                                                add();
                                            } else {
                                                toast.error('Số thành viên đã tối đa, không thể thêm được nữa!')
                                            }


                                        }} block >
                                            Thêm thành viên
                                        </Button>
                                    </Form.Item>
                                </td>

                                <td>
                                    {" "}
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Lưu
                                        </Button>
                                    </Form.Item>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Form.List>
            </table>
            <ToastContainer />
        </Form >


    );
};
export default Relative