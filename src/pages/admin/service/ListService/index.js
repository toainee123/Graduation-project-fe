import { RedoOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getApiService } from './api';
import { dataSource, columns, arrayFilterSearch } from './constant';

const Service = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const [dataFilter, setDataFilter] = useState({
        nameService: ""
    })
    // get value select
    // const handleGetValue = (field, type,) => {
    //     if (type === "TYPE_SEARCH") {
    //         const data = handleGetOptions(field);
    //         return data.find(obj => obj.value === (statusPage && statusPage[field])) || null
    //     }
    //     const data = handleGetOptions(field);
    //     return data.find(obj => obj.value === (dataFilter && dataFilter[field])) || null
    // }
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
    const getFilter = () => arrayFilterSearch.map(item => {
        if (item.type === "text") {
            return (
                <li style={{ float: "left" }}>
                    <input
                        type="text"
                        value={dataFilter[item.field]}
                        placeholder={item.placeHolder}
                        onChange={e => handleUpdateField(e, item.field, item.type)}
                    />
                </li>
            )
        }
        if (item.type === 'drop-down') {
            return (
                <li className="w-200px" style={{ float: "left" }}>
                    <div className="form-group">
                        <>List Service</>
                        {/* <div className="form-control-wrap">
                            <Select
                                // options={handleGetOptions(itemFilter.field) || []}
                                // getOptionLabel={option => getOptionLabel(option, itemFilter.field)}
                                // getOptionValue={option => getOptionValue(option, itemFilter.field)}
                                // onFocus={() => handleFocus(itemFilter.field)}
                                // onChange={e => handleUpdateField(e, itemFilter.field, itemFilter.type, itemFilter.fieldDisabled)}
                                // placeholder={itemFilter.placeHolder}
                                // value={handleGetValue(itemFilter.field)}
                                isClearable
                            // isDisabled={dataFilter.disabled[itemFilter.field] && dataFilter.disabled[itemFilter.field]}
                            />
                        </div> */}
                    </div>
                </li>
            )
        }
    })
    const handleSearch = () => {
        console.log("Search")
    }
    const resetFilter = () => {

    }
    return (
        <>
            <h1>List Service</h1>
            <div className='render-input'>
                <ul className="btn-toolbar gx-1 " >
                    {getFilter()}
                    <li style={{ float: "left" }}>
                        <Button
                            type="default"
                            onClick={() => resetFilter()}
                        >
                            <RedoOutlined />
                        </Button>
                    </li>
                    <li style={{ float: "left" }}>
                        <Button
                            type="primary"
                            onClick={() => handleSearch()}
                        >Tìm kiếm
                        </Button>
                    </li>
                </ul>
            </div>
            <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowSelection={{
                        // type: selectionType,
                        // ...rowSelection,
                    }}
                />
            </div>
        </>
    )
}

export default Service