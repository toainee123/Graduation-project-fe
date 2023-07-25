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

const CreateMember = () => {
  const [detailRoom, setDetailRoom] = useState<any>();
  const [getData, setGetData] = useState<any>([]);
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
      console.log('Call api get roomTenant');
      const fetchDetailMember = async () => {
        const { data } = await apiGetRoomTenantDetail(roomId);
        console.log(data);

        setGetData(data);
      };
      fetchDetailMember();
    }
  }, [keyLocation]);
  console.log('data', getData);

  useEffect(() => {
    if (keyLocation === null) {
      const fetchRoom = async (roomId: any) => {
        const { data } = await getByIdRoom(roomId);
        console.log('data');
        setDetailRoom(data);
      };
      fetchRoom(roomId);
    }
  }, [roomId]);

  const items: TabsProps['items'] = [
    {
      label: 'Thông tin khách thuê',
      key: '1',
      children: (
        <FormCreateMember detailRoom={detailRoom} roomId={roomId} initialValues={initialValues} getData={getData} />
      ),
    },
    {
      label: 'Thành viên',
      key: '2',
      children: <Relative />,
    },
    {
      label: 'Hợp đồng',
      key: '3',
      children: <Contract />,
    },
  ];
  return (
    <div>
      <div className='title_page'>
        {keyLocation === null && <h1>thêm Thông tin phòng</h1>}
        {keyLocation === 'update' && <h1>Cập nhật thông tin phòng</h1>}
        {keyLocation === 'view' && <h1>xem thông tin phòng</h1>}
      </div>
      <Tabs defaultActiveKey='1' tabBarGutter={10} type='card' items={items} />
    </div>
  );
};

export default CreateMember;
