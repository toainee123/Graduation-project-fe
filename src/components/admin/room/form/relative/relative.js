import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Input, DatePicker, Radio, Space, Popconfirm } from 'antd';
import { PlusOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import '../relative/relative.scss'
import { useLocation, useParams } from 'react-router-dom';
import { addRoomMember, getRoom } from 'src/api/room';
const Relative = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [items, setItems] = useState({ items: [] });
    const myParam = useLocation().search;
    const idH = new URLSearchParams(myParam).get('idHouse');
    const [listRoom, setListRoom] = useState();
    useEffect(() => {
        const getHouseId = async () => {
            const respon = await getRoom(idH)
            setListRoom(respon.data.result.responses)
        }
        getHouseId();
    }, [])



    const onFinish = async (values) => {
        const room = listRoom?.find(item => item.id === +id)
        const maxCustomer = room.maxCustomer;
        if (values?.items.length > maxCustomer - 1) {
            alert(`Phòng giói hạn chỉ có ${maxCustomer} thành viên(đã tính chủ phòng)`)
        }
        const listMemberData = values?.items.map((item) => {
            const birthdayDate = item.birthday
            const birthdayDay = birthdayDate.date() + 1 >= 10 ? birthdayDate.date() + 1 : '0' + (birthdayDate.date() + 1)
            const birthdayMonth = birthdayDate.month() + 1 >= 10 ? birthdayDate.month() + 1 : '0' + (birthdayDate.month() + 1)
            const birthdayYear = birthdayDate.year()
            const strBodDate = birthdayYear + '/' + birthdayMonth + '/' + birthdayDay
            return {
                roomId: +id,
                name: item.fullname,
                email: item.email,
                phone: item.phone_number,
                cccd: item.cccd,
                address: item.address,
                host: false,
                bod: strBodDate,
                vehicleNumber: item.vehicle_number,
                gender: item.gender
            }
        })

        console.log(listMemberData);

        try {
            for (const key in listMemberData) {
                await addRoomMember(listMemberData[key])
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (

        <Form form={form} onFinish={onFinish}>
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
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={index} className='p-2'>
                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "fullname"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "birthday"]}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                    </td>

                                    <td className='gender'>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "gender"]}
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
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "address"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "phone_number"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "vehicle_number"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                            name={[field.name, "email"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </td>

                                    <td>
                                        <Form.Item
                                            required={true}
                                            key={field.key}
                                        >
                                            <Button onClick={() => add()} block className='flex justify-center items-center' type="primary" danger>
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
                                        <Button type="dashed" onClick={() => add()} block>
                                            Add item
                                        </Button>
                                    </Form.Item>
                                </td>

                                <td>
                                    {" "}
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Form.List>
            </table>
        </Form >


    );
};
export default Relative