import React from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import "./createMember.scss";
import FormCreateMember from 'src/components/admin/room/form/createMember/formCreateMember';
import Relative from 'src/components/admin/room/form/relative/relative';
import Contract from 'src/components/admin/room/contract/contract';

const items: TabsProps['items'] = [
    {
        label: 'Thông tin khách thuê',
        key: '1',
        children: <FormCreateMember />
    },
    {
        label: 'Thành viên',
        key: '3',
        children: <Relative />
    },
    {
        label: 'Hợp đồng',
        key: '4',
        children: <Contract />
    },
]

const CreateMember = () => {
    return (
        <div>
            <div className="title_page">
                <h1>Thêm Khách Thuê Phòng</h1>
            </div>
            <Tabs
                defaultActiveKey="1"
                tabBarGutter={10}
                type='card'
                items={items}
            />

        </div>
    )
}

export default CreateMember