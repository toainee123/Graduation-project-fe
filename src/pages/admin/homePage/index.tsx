import React, { useEffect, useState } from 'react';
import { fetchDataChart, selectDashboardLoading } from '../../../features/dashboard/DashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import LineChart from 'src/components/specific/chart/Bar';
import PieChart from 'src/components/specific/chart/Pie';
import { RoomAvailability } from './sections/RoomAvailability';
import OweRoomMoneyList from './sections/OweRoomMoneyList';
import ContractExpiration from './sections/ContractExpirationTable';
import { getDashboard } from 'src/api/dashboard';
import { TransFormToBarData, TransFormToPieChart } from './hooks/useTranformToBarData';

interface Props {}

const Homepage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);
  const [dataChart, setDataChart] = useState<Array<object>>([]);
  const [dataPie, setDataPie] = useState<Array<object>>([]);
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      setDataChart(TransFormToBarData(data.revenue));
      setDataPie(TransFormToPieChart(data.staticRoom));
    };

    getList();
  }, []);

  useEffect(() => {
    dispatch(fetchDataChart())
      .unwrap()
      .then((resp) => {
        setData(resp);
      })
      .catch();
  }, []);
  return (
    <div className=''>
      <div className=' w-full grid grid-cols-2 gap-4 '>
        <div className=' '>
          <h1>Trạng thái phòng</h1>
          <div className='bg-gray-100'>
            <PieChart data={dataPie} angleField='count' colorField='roomStatus' />
          </div>
        </div>
        <div className=' '>
          <h1> Doanh thu (VNĐ)</h1>
          <div className='bg-gray-100'>
            <LineChart data={dataChart} xField='month' yField='totalRevenue' />
          </div>
        </div>
      </div>
      <div className=' w-full grid grid-cols-2 gap-4 mt-6'>
        <RoomAvailability />
        <OweRoomMoneyList />
      </div>
      <div className=' w-full grid grid-cols-2 gap-4 mt-6 '>
        <ContractExpiration />
      </div>
    </div>
  );
};

export default Homepage;
