import { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Select, Upload, UploadProps } from 'antd'
import { Link } from 'react-router-dom'

import "./navRoom.scss"

import { getDistrict, getProvinces, getWards } from 'src/api/provinces/provinces';
import { httpMessage } from 'src/utils/constants';
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { createHouse, getAllHouse } from 'src/features/room/houseSlice'

const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} ${httpMessage.UPLOAD_SUCCESS}`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} ${httpMessage.UPLOAD_FAILED}`);
        }
    },
};

const NavRoom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [provinces, setProvinces] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [nameDistrict, setNameDistrict] = useState('');
    const [wards, setWards] = useState<any[]>([])
    const [address, setAddress] = useState("")
    const [city, setCity] = useState()
    const [districtStore, setDistrictStore] = useState()
    const [wardStore, setWardStore] = useState()
    const [form] = Form.useForm();

    const house = useAppSelector(state => state.house.value)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllHouse())
    }, [])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeProvinces = (e: any) => {
        console.log(`selected ${e}`);
        setCity(e)
    };
    const handleChangeDistricts = (e: any) => {
        console.log(`selectedDistrict`, districts);
        const name = districts.find((item: any) => item.district_id === e)
        console.log('nameDistrict', nameDistrict);
        setNameDistrict(name)
        setDistrictStore(e)
    };
    const handleChangeWard = (e: any) => {
        console.log(`selected ${e}`);
        setWardStore(e)
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            const { data } = await getProvinces()
            setProvinces(data.results)
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        if (city) {
            const fetchDistrict = async () => {
                const { data } = await getDistrict(city)
                setDistricts(data.results)
            }
            fetchDistrict()
        }
    }, [city])

    useEffect(() => {
        if (districtStore) {
            const fetchWard = async () => {
                const { data } = await getWards(districtStore)
                setWards(data.results)
            }
            fetchWard()
        }
    }, [districtStore])
    const onFinish = async (values: any) => {
        await dispatch(createHouse(values)).unwrap().then((resp: any) => {
            message.success(`Thêm ${values.name} thành công`)
        })
            .catch((err: any) => {
                message.error(`thêm ${values.name} thất bại`)
            })
        setOpen(false)
    }
    return (
        <div className="room_selected row" >
            <div className="room_form">
                <Form>
                    <div className='flex gap-2'>
                        <Form.Item>
                            <Select
                                placeholder="-Trạng thái phòng-"
                                style={{ width: "200", marginRight: "10px" }}
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
                        </Form.Item>
                        <Form.Item>
                            <Select
                                placeholder="-Trạng thái phí-"
                                style={{ width: "200", marginRight: "10px" }}
                                options={[
                                    {
                                        label: '-Trạng thái phí-',
                                        options: [
                                            { label: 'Chưa thu phí', value: 'jack' },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input style={{ width: 200 }} placeholder="Tìm phòng..." />
                        </Form.Item>
                        <Form.Item>
                            <button className='btn_search' >
                                <i className="fa-solid fa-magnifying-glass px-1"></i>
                                Tìm kiếm
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div className="xl:flex justify-between items-center mt-4">
                <div className='inline-block'>
                    <span className='font-semibold text-base px-2'>Còn trống {house?.room?.roomAvailable}</span>
                    <span className='font-semibold text-base px-2 border-r-2 border-l-2 border-black'>Đã cho thuê {house?.room?.roomAlready}</span>
                    <span className='font-semibold text-base px-2'>Chưa thu phí</span>
                </div>
                <div className='md:my-2'>
                    <Link to="listMember">
                        <button className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'> <i className="fa-solid fa-users"></i> Khách thuê</button>
                    </Link>
                    <Link to="listRoom">
                        <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'><i className="fa-solid fa-list"></i> Phòng</button>
                    </Link>
                    <Link to="#">
                        <button onClick={() => setOpen(true)} className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5'><i className="fa-solid fa-building-columns"></i> Thêm nhà</button>
                    </Link>
                    <Modal
                        centered
                        open={open}
                        onOk={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    // form.resetFields();
                                    onFinish(values);
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                        onCancel={() => setOpen(false)}
                        className="ant-modal-create"
                    >
                        <div className="title_page">
                            <h1>thêm nhà</h1>
                        </div>
                        <Form
                            form={form}
                        >
                            <div>
                                <div className='text-base mb-2'>Tên nhà</div>
                                <Form.Item name="name" rules={[{ required: true, message: "Tên nhà không được bỏ trống" }]}>
                                    <Input placeholder='tên nhà' />
                                </Form.Item>
                            </div>

                            <div className=' flex gap-4 items-center my-2'>
                                <div className='flex-1'>
                                    <label className='text-base'>Thành phố/Tỉnh</label>
                                    <Form.Item name="city" rules={[{ required: true, message: "Thành phố/Tỉnh không được bỏ trống" }]}>
                                        <Select
                                            defaultValue="Thành phố/Tỉnh"
                                            showSearch
                                            className='select-province'
                                            onChange={(e) => handleChangeProvinces(e)}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={provinces?.map((proVince: any, i: number) => ({
                                                key: i,
                                                value: proVince.province_id,
                                                label: proVince.province_name
                                            }))}
                                        />
                                    </Form.Item>
                                </div>
                                <div className='flex-1'>
                                    <label className='text-base'>Quận/Huyện</label>
                                    <Form.Item name="district" rules={[{ required: true, message: "Quận/Huyện không được bỏ trống" }]}>
                                        <Select

                                            defaultValue="Quận/Huyện"
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            className='select-province'
                                            onChange={(e) => handleChangeDistricts(e)}
                                            options={districts?.map((item: any, i: number) => ({
                                                key: i,
                                                value: item.district_id,
                                                label: item.district_name
                                            }))}
                                        />
                                    </Form.Item>
                                </div>

                                <div className='flex-1'>
                                    <label className='text-base'>Phường/Xã</label>
                                    <Form.Item name="ward" rules={[{ required: true, message: "Phường/Xã không được bỏ trống" }]}>
                                        <Select
                                            defaultValue="Phường/Xã"
                                            className='select-province'
                                            onChange={(e) => handleChangeWard(e)}
                                            options={wards?.map((item: any, i: number) => ({
                                                key: i,
                                                value: item.ward_id,
                                                label: item.ward_name
                                            }))}
                                        />
                                    </Form.Item>

                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='text-base mb-2'>Địa chỉ</div>
                                <Form.Item name='address' rules={[{ required: true, message: "Địa chỉ không được bỏ trống" }]}>
                                    <Input type="text" className='w-full py-1 pl-2 border' placeholder="số nhà, ngõ,..." onChange={(e) => setAddress(e.target.value)} />
                                </Form.Item>
                            </div>
                            <div>
                                <div className='text-base mb-2'>Địa chỉ chính xác</div>
                                <Form.Item>
                                    <Input type="text" className='w-full py-1 pl-2 border' value={`${address ? `${address},` : ""} ${wardStore ? `${wards.find(item => item.ward_id === wardStore)?.ward_name},` : ""} ${districtStore ? `${districts.find(item => item.district_id === districtStore)?.district_name},` : ""} ${city ? `${provinces.find(item => item.province_id === city)?.province_name}.` : ""}`} readOnly />
                                </Form.Item>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default NavRoom