import {
    CloseCircleFilled,
    CloseSquareOutlined,
    CloudDownloadOutlined,
    EditFilled,
    PlusOutlined,
    RedoOutlined,
    ReloadOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Input, Modal, Select, Space, Table } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getApiArise } from './api';
import { dataSource, columns } from './constant';
import './style.scss';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';

const Arise = () => {
    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();
    const [dataFilter, setDataFilter] = useState({
        nameArise: '',
    });
    // active modal
    const [isActiveModal, setIsActiveModal] = useState(false);
    // cột bảng
    const columns = [
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size='middle'>
                    <EditFilled className='color-green action-table' onClick={showModal} />
                    <CloseCircleFilled className='color-red action-table' onClick={showModal} />
                </Space>
            ),
        },
        {
            title: 'Nhà',
            dataIndex: 'house',
            key: 'house',
        },
        {
            title: 'Phòng',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Diễn giải',
            dataIndex: 'explain',
            key: 'explain',
        },
        {
            title: 'Số tiền (VNĐ)',
            dataIndex: 'cost',
            key: 'cost',
        },
    ];

    const showModal = () => {
        setIsActiveModal(true);
    };

    const handleOk = () => {
        setIsActiveModal(false);
    };

    const handleCancel = () => {
        setIsActiveModal(false);
    };
    const handleUpdateField = (e, field, type) => {
        if (type === 'drop-down') {
            return setDataFilter({
                ...dataFilter,
                [field]: e ? e.value : null,
            });
        }
        if (type === 'date') {
            return setDataFilter({
                ...dataFilter,
                [field]: e ? `${e.format('YYYY-MM-DD')}` : null,
            });
        }
        return setDataFilter({
            ...dataFilter,
            [field]: e.target.value,
        });
    };
    const handleSearch = () => {
        console.log('Search');
    };
    const resetFilter = () => { };
    const parseData = (item) => {
        if (true) {
            return <CloseCircleFilled />;
        }
    };
    const renderAcion = () => {
        return (
            <Space size='middle'>
                <EditFilled className='color-green action-table' />
                <CloseCircleFilled className='color-red action-table' />
            </Space>
        );
    };
    return (
        <>
            <div className='header'>
                <div className='header-title'>
                    <h1>Danh sách phát sinh</h1>
                </div>
                {/* <div className='action'>
                    <Link to={urlRouter.ADD_SERVICE}>
                        <Button type='primary'>
                            {' '}
                            <PlusOutlined style={{ fontSize: 15 }} />
                            Thêm phát sinh
                        </Button>
                    </Link>
                </div> */}
            </div>
            <hr />
            <div className='description'>
                <strong>Lưu ý:</strong>
                <p>
                    Phát sinh là các số tiền ngoại lệ (các khoản tiền không cố định) mà khách phải trả (nhập số dương) hoặc được
                    trừ bớt đi (nhập số âm, thêm dấu trừ phía trước) theo từng tháng tính tiền phòng.
                </p>
            </div>
            <div className='render-input'>
                <div className='filter'>
                    <b className='filter-title'>Tháng/năm</b>
                    <DatePicker
                        style={{ width: 222 }}
                    // onChange={onChange}
                    />
                </div>
                <div className='filter'>
                    <b className='filter-title'>Nhà</b>
                    <Select
                        defaultValue='lucy'
                        style={{ width: 222 }}
                        //   onChange={handleChange}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'disabled',
                                label: 'Disabled',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },
                        ]}
                    />
                </div>
                <div className='action-filter'>
                    <Button type='primary ml-3'> <PlusOutlined style={{ fontSize: 15 }} /> Xem</Button>
                    <Link to={urlRouter.ADD_ARISE}>
                        <Button type='primary ml-3'> <PlusOutlined style={{ fontSize: 15 }} /> Thêm</Button>
                    </Link>
                    <Button type='primary ml-3'> <CloseSquareOutlined style={{ fontSize: 15 }} /> Xóa</Button>
                    <Button type='primary ml-3'> <CloudDownloadOutlined style={{ fontSize: 15 }} /> Xuất Excel</Button>
                </div>
            </div>
            <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowSelection={
                        {
                            // type: selectionType,
                            // ...rowSelection,
                        }
                    }
                />
            </div>
            <div>
                <Modal title='Xác nhận hành động' open={isActiveModal} onOk={handleOk} onCancel={handleCancel}>
                    <p>Bạn có chắc chắn không</p>
                </Modal>
            </div>
        </>
    );
};

export default Arise;
