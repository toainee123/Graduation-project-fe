import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

import './createMember.scss';

import FormCreateMember from 'src/components/admin/room/form/createMember/formCreateMember';
import Relative from 'src/components/admin/room/form/relative/relative';
import Contract from 'src/components/admin/room/contract/contract';
import { apiGetRoomTenantDetail, getByIdRoom } from 'src/api/room';
import Service from 'src/components/admin/room/form/service/service';

const CreateMember = () => {
  const [detailRoom, setDetailRoom] = useState<any>();
  const [getData, setGetData] = useState<any>([]);
  const [houseId, setHouseId] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>('1');
  const { roomId } = useParams();
  const search = useLocation().search;
  const keyLocation = new URLSearchParams(search).get('key');

  const initialValues = {
    dateRangeCccd: moment(),
    bod: moment(),
    date: moment(),
  };
  useEffect(() => {
    if (keyLocation === 'view' || keyLocation === 'update') {
      const fetchDetailMember = async () => {
        const { data } = await apiGetRoomTenantDetail(roomId);
        setGetData(data);
      };
      const getIdHouse = async () => {
        const { data } = await getByIdRoom(roomId);
        setHouseId(data.idhouse);
      };
      getIdHouse();
      fetchDetailMember();
    }
  }, [keyLocation]);

  useEffect(() => {
    // if (keyLocation === null) {

    const fetchRoom = async (roomId: any) => {
      const { data } = await getByIdRoom(roomId);
      setDetailRoom(data);
    };
    fetchRoom(roomId);
    // }
  }, [roomId]);

  const items: TabsProps['items'] = [
    {
      label: 'Hợp đồng',
      key: '1',
      children: <Contract houseid={houseId} setActiveTab={setActiveTab} />,
    },
    {
      label: 'Thông tin khách thuê',
      key: '2',
      children: (
        <FormCreateMember
          detailRoom={detailRoom}
          setActiveTab={setActiveTab}
          roomId={roomId}
          initialValues={initialValues}
          getData={getData}
        />
      ),
    },
    {
      label: 'Dịch vụ',
      key: '3',
      children: <Service setActiveTab={setActiveTab} />,
    },
    {
      label: 'Thành viên',
      key: '4',
      children: <Relative />,
    },
  ];
  return (
    <div>
      <div className='title_page'>
        {keyLocation === null && <h1>thêm Thông tin phòng</h1>}
        {keyLocation === 'update' && <h1>Cập nhật thông tin phòng</h1>}
        {keyLocation === 'view' && <h1>xem thông tin phòng</h1>}
      </div>
      <Tabs
        {...(keyLocation === null ? { activeKey: activeTab } : { defaultActiveKey: activeTab })}
        defaultActiveKey=''
        tabBarGutter={10}
        type='card'
        items={items}
      />
    </div>
  );
};

export default CreateMember;
