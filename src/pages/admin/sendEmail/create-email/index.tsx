import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { getListEmail, sendEmail } from 'src/api/dashboard';
import './index.scss';

const CreateTemplateEmail = () => {
  const [listEmail, setListEmail] = useState([]);
  const { register, handleSubmit, watch, setValue } = useForm();
  const [email, setEmail] = useState([]);
  useEffect(() => {
    const getEmail = async () => {
      const { data } = await getListEmail();
      setListEmail(data);
    };
    getEmail();
  }, []);
  const handleSelectChange = (value: any) => {
    console.log('value', value);
    setEmail(value);
  };
  const handleChangeText = (value: any) => {
    setValue('content', value);
  };
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };
  const Onsubmit = async (data: any) => {
    const result = {
      title: data.title,
      content: data.content,
      to: email,
    };
    await sendEmail(result)
      .then((res) => {
        console.log('success');
      })
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <h1>Tạo mới email</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(Onsubmit)} action=''>
          <div className='flex justify-between items-center gap-12 py-3'>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Email <b className='color-red'>*</b>
            </label>
            <div className='w-full'>
              <Select
                mode='multiple'
                onChange={handleSelectChange}
                allowClear
                className='w-full ant-padding'
                style={{ padding: 20 }}
                placeholder='Chọn email cần gửi'
              >
                {listEmail.map((option: any, index) => (
                  <Select.Option key={index} value={option.email}>
                    {option.email}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <label htmlFor='' className='w-64 text-base font-semibold'>
              Tiêu đề<b className='color-red'>*</b>
            </label>
            <div className='w-full'>
              <input className='border-2 p-2 outline-0 w-full' placeholder='Tiêu đề email' {...register('title')} />
            </div>
          </div>
          <div>
            <label htmlFor='' className='w-64 text-base font-semibold' style={{ marginBottom: 20 }}>
              Nội dung <b className='color-red'>*</b>
            </label>
            <ReactQuill theme='snow' onChange={handleChangeText} modules={modules} className='rich-text' />
          </div>
          <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-14 py-2.5 mr-2'>
            <i className='fa-solid fa-check'></i> Gửi
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTemplateEmail;
