import { useEffect, useState } from 'react';
import { getListAssetsForUser } from 'src/api/assets';

const ClientAsset = () => {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    const getAssets = async () => {
      const { data } = await getListAssetsForUser();
      setAssets(data);
    };
    getAssets();
  }, []);
  return (
    <div>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Danh sách dịch vụ </strong>
          </h2>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:mx-0.5 lg:mx-0.5'>
          <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full'>
                <thead className='bg-gray-200 border-b'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      STT
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Tên dịch vụ
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Số tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assets?.map((item: any, index: number) => (
                    <tr key={index} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {Number(item?.price).toLocaleString('VND')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAsset;
