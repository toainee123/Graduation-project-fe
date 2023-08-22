import React, { useState, useEffect } from 'react';
import { getListUserDashboard } from 'src/api/user-dashboard';
import ColumnChart from 'src/components/specific/chart/Column';
import {
  TransFormToBarData,
  TransFormToElecData,
  TransFormToWaterData,
} from 'src/pages/admin/homePage/hooks/useTranformToBarData';

const DashboardUser = () => {
  const [elecDataChart, setElecDataChart] = useState<Array<object>>([]);
  const [data, setData] = useState<Array<object>>([]);
  const [dataChart, setDataChart] = useState<Array<object>>([]);
  const [waterDataChart, setWaterDataChart] = useState<Array<object>>([]);

  useEffect(() => {
    const getAll = async () => {
      const { data } = await getListUserDashboard();
      console.log(data);
      setData(data);
      const dataBar = TransFormToBarData(data);
      const date = new Date();
      const year1 = date.getFullYear();
      const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      const monthofyear = months.map((item) => item + '/' + year1);

      const dataWaterChart = TransFormToWaterData(data);
      const dataElecChart = TransFormToElecData(data);
      const elecAr = monthofyear.map((item) => {
        for (let i = 0; i < dataElecChart.length; i++) {
          if (dataElecChart[i].month == item) {
            return { month: dataElecChart[i].month, total: dataElecChart[i].total };
          }
        }
        return { month: item };
      });
      setElecDataChart(elecAr);
      console.log(elecAr);

      const waterAr = monthofyear.map((item) => {
        for (let i = 0; i < dataWaterChart.length; i++) {
          if (dataWaterChart[i].month == item) {
            return { month: dataWaterChart[i].month, total: dataWaterChart[i].total };
          }
        }
        return { month: item };
      });
      setWaterDataChart(waterAr);
    };
    getAll();
  }, []);
  return (
    <div className='es-container'>
      <div className='title mb-4'>
        <div className='title--name'>
          <h2>
            <strong>Thống kê</strong>
          </h2>
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
    </div>
  );
};

export default DashboardUser;
