import React, { useState } from 'react'
import { CloseCircleFilled, EditFilled } from '@ant-design/icons';
import { Form, Input, Space, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

import "./relative.scss"
const Relative = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
        console.log(counter);
    };

    const dataSource = Array.from(Array(counter)).map((c, index: any) => {

        return {
            key: `${index}`,
            name: <input type="text" className='border-2 w-fit' defaultValue={c} />,
            birthDay: <input type="date" className='border-2 w-fit' defaultValue={c} />,
            gender: <div className='sm:w-full flex'>
                <div>
                    <input type="radio" className='mx-3' name="Gender" id="rad1" />
                    <label htmlFor="rad1" className=''>Nam</label>
                </div>
                <div className=''>
                    <input type="radio" className='mx-3' name="Gender" id="rad2" />
                    <label htmlFor="rad2" className=''>Nữ</label>
                </div>
            </div>,
            cccd: <input type="number" className='border-2 w-fit' defaultValue={c} />,
            address: <input type="text" className='border-2 w-fit' defaultValue={c} />,
            phoneNumber: <input type="number" className='border-2 w-fit' defaultValue={c} />,
            licensePlates: <input type="text" className='border-2 w-fit' defaultValue={c} />,
            registrationDate: <input type="date" className='border-2 w-fit' defaultValue={c} />,
        }
    })

    const columns = [

        {
            title: <div>Họ tên</div>,
            dataIndex: 'name',
            key: 'name',
            width: 100
        },
        {
            title: <div>Ngày sinh</div>,
            dataIndex: 'birthDay',
            key: 'birthDay',
            width: 100
        },
        {
            title: <div>Giới tính</div>,
            dataIndex: 'gender',
            key: 'gender',
            width: 100
        },
        {
            title: <div>CCCD/CMND</div>,
            dataIndex: 'cccd',
            key: 'cccd',
            width: 100
        },
        {
            title: <div>Địa chỉ</div>,
            dataIndex: 'address',
            key: 'address',
            width: 100
        },
        {
            title: <div>Số điện thoại</div>,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 100
        },
        {
            title: <div>Số xe</div>,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 100
        },

        {
            title: <div>Ngày ĐKTT</div>,
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            width: 100
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <button >
                        <CloseCircleFilled className="color-red action-table" />
                    </button>

                </Space>
            ),
            width: 100
        },
    ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} summary={() => (
                <Table.Summary >
                    <Table.Summary.Cell index={100}> <button className='text-xl' onClick={handleClick}><i className="fa-solid fa-circle-plus" style={{ color: '#18af31' }} />
                    </button></Table.Summary.Cell>

                </Table.Summary>
            )} />
        </div>
    )
}

export default Relative