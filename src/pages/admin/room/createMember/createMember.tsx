import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import "./createMember.scss";
import FormCreateMember from 'src/components/admin/room/form/createMember/formCreateMember';
import Relative from 'src/components/admin/room/form/relative/relative';
import Contract from 'src/components/admin/room/contract/contract';
import { useParams } from 'react-router-dom';
import { getByIdRoom, getRoom } from 'src/api/room';

const CreateMember = () => {
    const [detailRoom, setDetailRoom] = useState<any>();
    const { roomId } = useParams();
    console.log("id", roomId);

    useEffect(() => {
        const fetchRoom = async (roomId: any) => {
            const { data } = await getByIdRoom(roomId);
            console.log("data");
            setDetailRoom(data);
        };
        fetchRoom(roomId);
    }, [roomId]);

    const items: TabsProps['items'] = [
        {
            label: 'Thông tin khách thuê',
            key: '1',
            children: <FormCreateMember detailRoom={detailRoom} />
        },
        {
            label: 'Thành viên',
            key: '2',
            children: <Relative />
        },
        {
            label: 'Hợp đồng',
            key: '3',
            children: <Contract />
        }
    ]


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