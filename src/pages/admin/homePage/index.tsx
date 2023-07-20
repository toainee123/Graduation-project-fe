import React, { useEffect, useState } from 'react';
import { fetchDataChart, selectDashboardLoading } from '../../../features/dashboard/DashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import ColumnChart from 'src/components/specific/chart/Bar';
import PieChart from 'src/components/specific/chart/Pie';
import { RoomAvailability } from './sections/RoomAvailability';
import OweRoomMoneyList from './sections/OweRoomMoneyList';
import ContractExpiration from './sections/ContractExpirationTable';
import { getDashboard } from 'src/api/dashboard';
import { TransFormToBarData } from './hooks/useTranformToBarData';

interface Props {}

const Homepage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);
  const [dataChart, setDataChart] = useState<Array<object>>([]);
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      setDataChart(TransFormToBarData(data.revenue));
    };

    getList();
  }, []);

  const [dataPie, setDataPie] = useState<Array<object>>([
    { type: 'Đang thuê', value: 60 },
    { type: 'Phòng trống', value: 40 },
  ]);

  useEffect(() => {
    dispatch(fetchDataChart())
      .unwrap()
      .then((resp) => {
        setData(resp);
      })
      .catch();
  }, []);
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      setDataSource(data);
    };

    getList();
  }, []);
  console.log(dataSource);

  return (
    <div className=''>
      <h2>HomePage</h2>
      <div className=' w-full grid grid-cols-2 gap-4 '>
        <div className=' '>
          <h1>Trạng thái phòng</h1>
          <div className='bg-gray-100'>
            <PieChart data={dataPie} angleField='value' colorField='type' />
          </div>
        </div>
        <div className=' '>
          <h1> doanh thu vn đồng</h1>
          <div className='bg-gray-100'>
            <ColumnChart data={dataChart} xField='month' yField='totalRevenue' />
          </div>
        </div>
      </div>
      <div className=' w-full grid grid-cols-2 gap-4 '>
        <RoomAvailability />
        <OweRoomMoneyList />
      </div>
      <div className=' w-full grid grid-cols-2 gap-4 '>
        <ContractExpiration />
      </div>
    </div>
  );
};

export default Homepage;
