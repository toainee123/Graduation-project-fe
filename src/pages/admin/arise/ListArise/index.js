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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getApiArise } from './api';
import { dataSource, columns } from './constant';
import './style.scss';
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import { deleteApiArise, getApiArise } from './api';

const Arise = () => {
    const listAriseStore = useSelector((state) => state.listArise);
    const {
        listArise, // danh sách phát sinh
        deleteArise, // xóa phát sinh
    } = listAriseStore;
    const dispatch = useDispatch();
    const [dataFilter, setDataFilter] = useState({
        nameArise: '',
    });
    // active modal
    const [isActiveModal, setIsActiveModal] = useState({
        active: false,
        idDelete: null
    });
    // cột bảng
    const columns = [
        {
            title: 'Action',
            key: 'action',
            render: (item) => {
                return (
                    <Space size='middle'>
                        <EditFilled className='color-green action-table' />
                        <CloseCircleFilled className='color-red action-table' onClick={() => showModal(item)} />
                    </Space>
                );
            },
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
    useEffect(() => {
        if (deleteArise) {
            alert("Thành công")
        }
        dispatch(getApiArise());
    }, [deleteArise])

    useEffect(() => {
        dispatch(getApiArise());
    }, []);
    // show modal
    const showModal = (item) => {
        setIsActiveModal({
            ...isActiveModal,
            active: true,
            idDelete: item.id
        });
    };

    const handleOk = (id) => {
        setIsActiveModal(false);
        handleDelete(id)
    };

    const handleCancel = () => {
        setIsActiveModal(false);
    };
    const parseData = (item) => {
        if (true) {
            return <CloseCircleFilled />;
        }
    };
    const handleSearch = () => {
        dispatch(getApiArise());
    };
    const handleDelete = () => {
        console.log(isActiveModal.idDelete);
        dispatch(deleteApiArise(isActiveModal.idDelete))
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
                    <Button type='primary ml-3' onClick={() => handleSearch()}>
                        {' '}
                        <PlusOutlined style={{ fontSize: 15 }} /> Xem
                    </Button>
                    <Link to={urlRouter.ADD_ARISE}>
                        <Button type='primary ml-3'>
                            {' '}
                            <PlusOutlined style={{ fontSize: 15 }} /> Thêm
                        </Button>
                    </Link>
                    <Button type='primary ml-3'>
                        {' '}
                        <CloseSquareOutlined style={{ fontSize: 15 }} /> Xóa
                    </Button>
                    <Button type='primary ml-3'>
                        {' '}
                        <CloudDownloadOutlined style={{ fontSize: 15 }} /> Xuất Excel
                    </Button>
                </div>
            </div>
            <div>
                <Table
                    dataSource={(listArise.length && listArise.length > 0 && listArise) || []}
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
                <Modal title='Xác nhận hành động' open={isActiveModal.active} onOk={handleOk} onCancel={handleCancel}>
                    <p>Bạn có chắc chắn xóa không</p>
                </Modal>
            </div>
        </>
    );
};

export default Arise;
