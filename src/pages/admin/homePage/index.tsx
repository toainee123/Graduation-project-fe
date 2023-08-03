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
import ColumnChart from 'src/components/specific/chart/Column';

interface Props {}

const Homepage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);
  const [dataChart, setDataChart] = useState<Array<object>>([]);
  const [dataPie, setDataPie] = useState<Array<object>>([]);
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      const dataBar = TransFormToBarData(data.revenue);
      console.log(dataBar);

      setDataChart(TransFormToBarData(data.revenue));

      const dt = TransFormToPieChart(data.staticRoom);

      const dtPie = dt?.map((item: any) => {
        const roomStt = item.roomStatus === 'roomAlready' ? 'Phòng đang thuê' : 'Phòng còn trống';
        return {
          roomStatus: roomStt,
          count: item.count,
        };
      });

      setDataPie(dtPie);
    };

    getList();
  }, []);

  console.log(dataPie);

  // useEffect(() => {
  //   dispatch(fetchDataChart())
  //     .unwrap()
  //     .then((resp) => {
  //       setData(resp);
  //     })
  //     .catch();
  // }, []);

  return (
    // <div className=''>
    //   <h2>HomePage</h2>
    //   <div className=' w-full grid grid-cols-2 gap-4 '>
    //     <div className=' '>
    //       <h1>Trạng thái phòng</h1>
    //       <div className='bg-gray-100'>
    //         <PieChart data={dataPie} angleField='count' colorField='roomStatus' />
    //       </div>
    //     </div>
    //     <div className=' '>
    //       <h1> doanh thu vn đồng</h1>
    //       <div className='bg-gray-100'>
    //         <LineChart data={dataChart} xField='month' yField='totalRevenue' />
    //       </div>
    //     </div>
    //   </div>
    //   <div className=' w-full grid grid-cols-2 gap-4 '>
    //     <RoomAvailability />
    //     <OweRoomMoneyList />
    //   </div>
    //   <div className=' w-full grid grid-cols-2 gap-4 '>
    //     <ContractExpiration />
    //   </div>
    // </div>

    <div className='es-container'>
      <div className='title mb-4'>
        <div className='title--name'>
          <h2>
            <strong>Thống kê</strong>
          </h2>
        </div>
      </div>
      <div className=' w-full grid grid-cols-2 gap-4 mt-6'>
        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2'>
              <h3 className='uppercase'>
                <strong>Trạng thái phòng</strong>
              </h3>
            </div>
            <PieChart data={dataPie} angleField='count' colorField='roomStatus' />
          </div>
        </div>
        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2'>
              <h3 className='uppercase'>
                <strong>Doanh thu tháng</strong>
              </h3>
            </div>
            <ColumnChart data={dataChart} xField='month' yField='totalRevenue' />
          </div>
        </div>
      </div>
      <div className=' w-full grid grid-cols-2 gap-4 mt-6'>
        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2 '>
              <h3 className='uppercase'>
                <strong>Doanh sách phòng trống</strong>
              </h3>
            </div>
            <RoomAvailability />
          </div>
        </div>

        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2'>
              <h3 className='uppercase'>
                <strong>Danh sách khách nợ tiền phòng</strong>
              </h3>
            </div>
            <OweRoomMoneyList />
          </div>
        </div>
      </div>

      <div className=' w-full grid grid-cols-2 gap-4 mt-4 '>
        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2 mb-4'>
              <h3 className='uppercase'>
                <strong>Khách sắp hết hạn hợp đồng</strong>
              </h3>
            </div>
            <ContractExpiration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
