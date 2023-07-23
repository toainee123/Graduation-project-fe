import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { getService, updateService } from 'src/api/service';
import { urlRouter } from 'src/utils/constants';

const UpdateService = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getOneService = async (id: any) => {
      const { data } = await getService(id);
      reset(data.result);
    };
    getOneService(id);
  }, []);

  const Onsubmit = async (data: any) => {
    const result = {
      name: data.name,
      type: data.type,
      code: data.code,
      price: data.price,
      note: data.note,
    };
    await updateService(Number(id), result)
      .then((res) => {
        console.log('successfull');
        console.log('res', res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div>
        <h1>Thêm dịch vụ</h1>
      </div>
      <div className='mt-8'>
        <form onSubmit={handleSubmit(Onsubmit)}>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Tên dịch vụ <b className='color-red'>*</b>
            </label>
            <div className='w-full'>
              <input
                className='w-full border-2 p-4 outline-0'
                type='text'
                {...register('name')}
                placeholder='Tên dịch vụ'
              />
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Loại <b className='color-red'>*</b>
            </label>
            <div className='w-full'>
              <input
                className='w-full border-2 p-4 outline-0'
                type='text'
                {...register('type')}
                placeholder='Loại dịch vụ'
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Đơn giá <b className='color-red'>*</b>
            </label>
            <div className='w-full'>
              <input
                className='border-2 p-4 outline-0 w-full'
                type='number'
                {...register('price')}
                placeholder='Đơn giá'
              />
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Mã dịch vụ <b className='color-red'>*</b>
            </label>
            <div className='w-full'>
              <input
                className='w-full border-2 p-4 outline-0'
                type='text'
                {...register('code')}
                placeholder='Loại dịch vụ'
              />
            </div>
          </div>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-28 text-base font-semibold'>
              Nội dung
            </label>
            <div className='w-full'>
              <textarea className='w-full border-2 p-4' {...register('note')} placeholder='Thông tin ghi chú ...' />
            </div>
          </div>

          <div className='warning-title'>
            <h3> (*) Thông tin bắt buộc</h3>
          </div>
          <div className='sticky bottom-0 py-3 mt-8 bg-gray-100 border rounded flex justify-end'>
            <div>
              <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2  '>
                <i className='fa-solid fa-check'></i> Gửi
              </button>
              <Link to={`/admin/${urlRouter.SERVICE}`}>
                <button className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 '>
                  Hủy
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateService;