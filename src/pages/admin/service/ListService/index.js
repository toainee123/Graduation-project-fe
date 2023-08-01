import { CloseCircleFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import { deleteApiService, getApiService } from './api';
import { convertStringToStringsNoDecimal } from './common';

const Service = () => {
    const listServiceStore = useSelector((state) => state.listService);
    const {
        listService, // danh sách phát sinh
        deleteService, // xóa phát sinh
    } = listServiceStore;
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [dataFilter, setDataFilter] = useState({
        nameService: ""
    })

    // active modal
    const [isActiveModal, setIsActiveModal] = useState({
        active: false,
        idDelete: null
    });
    useEffect(() => {
        if (deleteService) {
            alert("Thành công")
        }
        dispatch(getApiService());
    }, [deleteService])
    useEffect(() => {
        dispatch(getApiService());
    }, [])

    // get value select
    // const handleGetValue = (field, type,) => {
    //     if (type === "TYPE_SEARCH") {
    //         const data = handleGetOptions(field);
    //         return data.find(obj => obj.value === (statusPage && statusPage[field])) || null
    //     }
    //     const data = handleGetOptions(field);
    //     return data.find(obj => obj.value === (dataFilter && dataFilter[field])) || null
    // }
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
    const handleSearch = () => {
        dispatch(getApiService());
    };
    const handleDelete = () => {
        dispatch(deleteApiService(isActiveModal.idDelete))
    };

    const columns = [
        {
            title: 'Thao tác',
            key: 'action',
            render: (item) => (
                <Space size="middle">
                    <EditFilled
                        className="color-green action-table"
                        onClick={() => navigate(urlRouter.UPDATE_SERVICE, { state: item })}
                    />
                    <CloseCircleFilled
                        className="color-red action-table"
                        onClick={() => showModal(item)}
                    />
                </Space>
            ),
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            key: 'serviceName',
        },
        {
            title: 'Mô tả',
            dataIndex: 'serviceDescription',
            key: 'serviceDescription',
        },
        {
            title: 'Loại dịch vụ',
            dataIndex: 'serviceType',
            key: 'serviceType',
        },
        {
            title: 'Đơn giá ($)',
            dataIndex: 'price',
            key: 'price',
            render: (item) => (
                convertStringToStringsNoDecimal(item)
            ),
        },
        {
            title: 'Đang dùng',
            dataIndex: 'using',
            key: 'using',
            render: (item) => (
                item ? "Đang sử dụng" : "Không sử dụng"
            ),
        },
    ];

    return (
        <>
            <div className='header'>
                <div className='header-title'>
                    <h1>List Service</h1>
                </div>
                <div className='action'>
                    <div className='btn-view'>
                        <Link to={urlRouter.ADD_SERVICE} >
                            <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5  px-4 rounded flex items-center justify-between'>
                                <PlusOutlined className='icon-btn' /> Thêm dịch vụ
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <div className='description'>
                <strong>Lưu ý:</strong>
                <p>
                    Các dịch vụ phải được gán cho từng khách thuê phòng để khi tính tiền sẽ có tiền dịch vụ đó.
                    Để cấu hình đơn giá điện nước tính theo bậc thang bạn vẫn phải tạo 2 dịch vụ là điện, nước; sau đó vào menu "Thiết lập" ={">"} Tab "Đơn giá điện nước bậc thang" để thiết lập đơn giá.
                </p>
            </div>
            <div className='render-input'>
                <Input
                    // value={dataFilter[item.field]}
                    placeholder="Tên"
                // onChange={e => handleUpdateField(e, item.field, item.type)}
                />
                <Button
                    onClick={() => handleSearch()}
                    type="primary"
                >
                    Tìm
                </Button>
            </div>
            <div>
                <Table
                    dataSource={(listService && listService.length && listService.length > 0 && listService) || []}
                    columns={columns}
                    rowSelection={{
                        // type: selectionType,
                        // ...rowSelection,
                    }}
                />
            </div>
            <div>
                <div>
                    <Modal title='Xác nhận hành động' open={isActiveModal.active} onOk={handleOk} onCancel={handleCancel}>
                        <p>Bạn có chắc chắn xóa không</p>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default Service