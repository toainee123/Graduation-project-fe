import { useEffect, useState } from 'react';
import { getDashboard } from 'src/api/dashboard';
import ColumnChart from 'src/components/specific/chart/Column';
import PieChart from 'src/components/specific/chart/Pie';
import { useAppDispatch } from '../../../store/hooks';
import {
  TransFormToBarData,
  TransFormToElecData,
  TransFormToPieChart,
  TransFormToWaterData,
} from './hooks/useTranformToBarData';
import ContractExpiration from './sections/ContractExpirationTable';
import OweRoomMoneyList from './sections/OweRoomMoneyList';
import { RoomAvailability } from './sections/RoomAvailability';

interface Props {}

const Homepage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);
  const [dataChart, setDataChart] = useState<Array<object>>([]);
  const [elecDataChart, setElecDataChart] = useState<Array<object>>([]);
  const [waterDataChart, setWaterDataChart] = useState<Array<object>>([]);
  const [dataPie, setDataPie] = useState<Array<object>>([]);
  useEffect(() => {
    const getList = async () => {
      const { data } = await getDashboard();
      const dataBar = TransFormToBarData(data.revenue);
      const date = new Date();
      const year1 = date.getFullYear();
      const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      const monthofyear = months.map((item) => item + '/' + year1);

      const ar = monthofyear.map((item) => {
        for (let i = 0; i < dataBar.length; i++) {
          if (dataBar[i].month == item) {
            return { month: dataBar[i].month, totalRevenue: dataBar[i].totalRevenue };
          }
        }
        return { month: item };
      });
      setDataChart(ar);

      const dataWaterChart = TransFormToWaterData(data.indexWater);
      const dataElecChart = TransFormToElecData(data.indexElectric);
      const elecAr = monthofyear.map((item) => {
        for (let i = 0; i < dataElecChart.length; i++) {
          if (dataBar[i].month == item) {
            return { month: dataElecChart[i].month, total: dataElecChart[i].total };
          }
        }
        return { month: item };
      });
      setElecDataChart(elecAr);

      const waterAr = monthofyear.map((item) => {
        for (let i = 0; i < dataWaterChart.length; i++) {
          if (dataBar[i].month == item) {
            return { month: dataWaterChart[i].month, total: dataWaterChart[i].total };
          }
        }
        return { month: item };
      });
      setWaterDataChart(waterAr);
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

  return (
    <div className='es-container'>
      <div className='title mb-4'>
        <div className='title--name'>
          <h2>
            <strong>Thống kê</strong>
          </h2>
        </div>
      </div>
      <div className=' w-full grid lg:grid-cols-2 gap-4 mt-6 md:grid-cols-1'>
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

      <div className='w-full grid lg:grid-cols-2 gap-4 mt-6 md:grid-cols-1'>
        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2 '>
              <h3 className='uppercase'>
                <strong>Chỉ số lượng điện tiêu thụ hàng tháng</strong>
              </h3>
            </div>
            <ColumnChart data={elecDataChart} xField='month' yField='total' />
          </div>
        </div>
        <div className=' '>
          <div className='bg-white-100 rounded-lg p-6 shadow-[0px_0px_3px_rgba(3,102,214,0.3)]'>
            <div className='titlee py-2 border-b-2'>
              <h3 className='uppercase'>
                <strong>Chỉ số lượng nước tiêu thụ hàng tháng</strong>
              </h3>
            </div>
            <ColumnChart data={waterDataChart} xField='month' yField='total' />
          </div>
        </div>
      </div>

      <div className='w-full grid lg:grid-cols-2 gap-4 mt-6 md:grid-cols-1'>
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

      <div className='w-full grid lg:grid-cols-2 gap-4 mt-6 md:grid-cols-1'>
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
