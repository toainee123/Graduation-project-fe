import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input, message, Modal, Select, Upload, UploadProps } from 'antd'
import { Link } from 'react-router-dom'

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
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const NavRoom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="room_selected row" >
            <div className="room_form">
                <form action="">
                    <Select
                        defaultValue="-Trạng thái phòng-"
                        style={{ width: 200 }}
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
                    <Select
                        defaultValue="-Trạng thái phí-"
                        style={{ width: 200 }}
                        options={[
                            {
                                label: '-Trạng thái phí-',
                                options: [
                                    { label: 'Chưa thu phí', value: 'jack' },
                                ],
                            },
                        ]}
                    />
                    <Input style={{ width: 200 }} placeholder="Tìm phòng..." />
                    <button className='btn_search'><SearchOutlined /> Tìm kiếm</button>
                </form>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className='inline-block'>
                    <span className='font-semibold text-base px-2'>Còn trống 3</span>
                    <span className='font-semibold text-base px-2 border-r-2 border-l-2 border-black'>Đã cho thuê 1</span>
                    <span className='font-semibold text-base px-2'>Chưa thu phí</span>
                </div>
                <div className=''>
                    <Link to="#">
                        <button onClick={showModal} className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900"><i className="fa-sharp fa-solid fa-upload"></i> Nhập phòng từ excel</button>
                    </Link>
                    <Modal title="Nhập phòng từ file Excel " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Upload {...props}>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Chỉ nhận file Excel</p>
                                    </div>
                                </label>
                            </div>
                        </Upload>
                    </Modal>

                    <Link to="#">
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'> <i className="fa-solid fa-users"></i> Khách thuê</button>
                    </Link>
                    <Link to="#">
                        <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'><i className="fa-solid fa-list"></i> Phòng</button>
                    </Link>
                    <Link to="#">
                        <button className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'><i className="fa-solid fa-building-columns"></i> Thêm nhà</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavRoom