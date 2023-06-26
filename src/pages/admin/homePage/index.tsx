import React, { useEffect, useState } from 'react';
import { fetchDataChart, selectDashboardLoading } from '../../../features/dashboard/DashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: '# of Votes',
      data: [60, 40],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1,
    },
  ],
};

export function Chart() {
  return <Pie data={data} />;
}

interface Props {}

const Homepage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Array<object>>([]);

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
      <h2>HomePage</h2>
      <div className=' w-full grid grid-cols-2 gap-4 '>
        <div className=' '>
          <h1>Trạng thái phòng</h1>
          <div className='bg-gray-100'>
            <Chart />
          </div>
        </div>
        <div className=' '>
          <h1> doanh thu vn đồng</h1>
          <div className='bg-gray-100'></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
