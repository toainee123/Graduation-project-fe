import React from 'react';
import { Link } from 'react-router-dom';
import ListDataPower from './listDataPower';

const DataPower = () => {
  return (
    <section>
      <div className=' flex justify-between items-center'>
        <div className='title_page'>
          <h1>Chỉ Số Điện</h1>
        </div>
        <div className='btn_action '>
          <Link to='#'>
            <button className='focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:focus:ring-yellow-900'>
              <i className='fa-solid fa-magnifying-glass'></i> Xem
            </button>
          </Link>
          <Link to='#'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              <i className='fa-solid fa-check'></i> Lưu
            </button>
          </Link>
          <Link to='#'>
            <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
              <i className='fa-regular fa-file'></i> Xuất file
            </button>
          </Link>
        </div>
      </div>
      <hr />
      <ListDataPower />
    </section>
  );
};

export default DataPower;
