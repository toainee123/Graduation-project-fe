import { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getAllHouse } from 'src/features/room/houseSlice';
import { getProvinces, getDistrict, getWards } from 'src/api/provinces/provinces';
import { getById } from 'src/api/house';
import { useParams } from 'react-router-dom';
const EditHouse = ({ form, idHouse }: any) => {
    console.log('update house');

    const [formData, setFormData] = useState<any>();

    const [provinces, setProvinces] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [wards, setWards] = useState<any[]>([])
    const [address, setAddress] = useState("")
    const [city, setCity] = useState()
    const [districtStore, setDistrictStore] = useState()
    const [wardStore, setWardStore] = useState()
    // const { id }: any = useParams()
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await getById(idHouse);
            setFormData(data?.result)
            form.resetFields()
        }
        getProducts()
    }, []);
    const handleChangeProvinces = (e: any) => {
        console.log(`selected ${e}`);
        setCity(e)
    };
    const handleChangeDistricts = (e: any) => {
        console.log(`selectedDistrict ${e}`);
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
        if (+formData?.city > 0) {
            console.log('call formData.city', formData.city);

            const fetchDistrict = async () => {
                const { data } = await getDistrict(formData?.city)
                setDistricts(data.results)
            }
            fetchDistrict()
        }
    }, [formData?.city])

    useEffect(() => {
        if (districtStore) {
            const fetchWard = async () => {
                const { data } = await getWards(districtStore)
                setWards(data.results)
            }
            fetchWard()
        }
    }, [districtStore])

    useEffect(() => {
        if (+formData?.district > 0) {
            console.log('call formData.district', formData.district);
            const fetchWard = async () => {
                const { data } = await getWards(formData?.district)
                setWards(data.results)
            }
            fetchWard()
        }
    }, [formData?.district])
    return (
        <>
            {formData && <div>
                <div className="title_page">
                    <h1>Chỉnh sửa nhà</h1>
                </div>
                <Form
                    form={form}
                    initialValues={formData}
                >
                    <div>
                        <div className='text-base mb-2'>Tên nhà</div>
                        <Form.Item name="name" rules={[{ required: true, message: "Tên nhà không được bỏ trống" }]}>
                            <Input placeholder='Tên nhà' />
                        </Form.Item>
                    </div>
                    <div className='mb-2'>
                        <div className='text-base mb-2'>Địa chỉ</div>
                        <Form.Item name='address' rules={[{ required: true, message: "Địa chỉ không được bỏ trống" }]}>
                            <Input type="text" className='w-full py-1 pl-2 border' placeholder="Số nhà, ngõ,..." onChange={(e) => setAddress(e.target.value)} />
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
                </Form>
            </div>}
        </>
    );
};
export default EditHouse