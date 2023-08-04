import React, { useEffect, useState } from 'react';
import { Input, Button, Table, Form } from 'antd';
import ReactQuill from 'react-quill';
import { useForm } from 'react-hook-form';
import { getHistoryEmail } from 'src/api/dashboard';
import { Link } from 'react-router-dom';
const TemplateEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listEmail, setListEmail] = useState([]);

  useEffect(() => {
    const getEmail = async () => {
      const { data } = await getHistoryEmail({});
      setListEmail(data.responses);
    };
    getEmail();
  }, []);

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

  const onSubmit = (data: any) => {
    const result = {
      search: data.search,
    };
    if (result) {
      const getDeposit = async () => {
        const { data } = await getHistoryEmail(result);
        setListEmail(data.responses);
      };
      getDeposit();
    } else {
      const getDeposit = async () => {
        const { data } = await getHistoryEmail({});
        setListEmail(data.responses);
      };
      getDeposit();
    }
  };

  return (
    <div>
      <div className='title_page'>
        <h1>Danh sách email</h1>
      </div>
      <div className='mb-5'>
        <div className='flex'>
          <Form onFinish={onSubmit}>
            <div className='flex'>
              <Form.Item name='search'>
                <Input placeholder='Email' style={{ marginTop: 20 }} />
              </Form.Item>
              <Form.Item>
                <Button className='mt-5' style={{ marginLeft: 20 }} htmlType='submit'>
                  Tìm kiếm
                </Button>
              </Form.Item>
            </div>
          </Form>
          <div style={{ marginTop: -28 }}>
            <Link to={'/admin/create-email'}>
              <Button type='primary' className='mt-12' style={{ marginLeft: 20 }}>
                Tạo email mới
              </Button>
            </Link>
          </div>
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
                      Email người nhận
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Tiêu đề
                    </th>
                    <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                      Nội dung
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listEmail?.map((item: any, index: number) => (
                    <tr key={index} className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.emailto}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.title}</td>
                      <td
                        className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      ></td>
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

export default TemplateEmail;
