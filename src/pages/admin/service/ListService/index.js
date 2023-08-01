import { CloseCircleFilled, EditFilled, PlusOutlined, RedoOutlined, ReloadOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getApiService } from './api';
import { columns } from './constant';
import './style.scss'
import { Link } from 'react-router-dom';
import { urlRouter } from 'src/utils/constants';
import { getApiService } from './api';

const Service = () => {
    const listServiceStore = useSelector((state) => state.listService);
    const {
        listService, // danh sách phát sinh
        // deleteArise, // xóa phát sinh
    } = listServiceStore;
    const dispatch = useDispatch()
    const [dataFilter, setDataFilter] = useState({
        nameService: ""
    })




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
    const [isActiveModal, setIsActiveModal] = useState(false);

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
        if (type === "drop-down") {
            return setDataFilter({
                ...dataFilter,
                [field]: e ? e.value : null,
            })
        }
        if (type === "date") {
            return setDataFilter({
                ...dataFilter,
                [field]: e ? `${e.format('YYYY-MM-DD')}` : null
            })
        }
        return (
            setDataFilter({
                ...dataFilter,
                [field]: e.target.value
            })
        )
    }
    const resetFilter = () => {

    }
    const parseData = (item) => {
        if (true) {
            return <CloseCircleFilled />
        }
    }
    const renderAcion = () => {
        return (
            <Space size="middle">
                <EditFilled className="color-green action-table" />
                <CloseCircleFilled className="color-red action-table" />
            </Space>
        )
    }
    const handleSearch = () => {
        dispatch(getApiService());
    };

    const handleEdit = () => {

    }



    const columns = [
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <EditFilled
                        className="color-green action-table"
                    // onClick={()}
                    />
                    <CloseCircleFilled
                        className="color-red action-table"
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
        },
        {
            title: 'Đang dùng',
            dataIndex: 'using',
            key: 'using',
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
                <Modal title="Basic Modal"
                    open={isActiveModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        </>
    )
}

export default Service