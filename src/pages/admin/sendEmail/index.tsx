import React, { useEffect, useState } from 'react';
import { Input, Button, Table } from 'antd';
import ReactQuill from 'react-quill';
import { useForm } from 'react-hook-form';
import { getHistoryEmail } from 'src/api/dashboard';
import { Link } from 'react-router-dom';
const TemplateEmail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listEmail, setListEmail] = useState([]);

  useEffect(() => {
    const getEmail = async () => {
      const { data } = await getHistoryEmail();
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
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Người nhận',
      dataIndex: 'emailto',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: any) => (status ? 'Đã gửi' : 'Chưa gửi'),
    },
  ];
  return (
    <div>
      <h1>Danh sách email</h1>
      <div className='mb-5'>
        <form action=''>
          <div style={{ display: 'flex' }}>
            <div>
              <label htmlFor='' className='text-lg my-2'>
                Người nhận
              </label>
              <div className='flex'>
                <Input placeholder='Người nhận' style={{ marginTop: 20 }} />
                <Button className='mt-5' style={{ marginLeft: 20 }}>
                  Tìm kiếm
                </Button>
              </div>
            </div>
            <div>
              <Link to={'/admin/create-email'}>
                <Button type='primary' className='mt-12' style={{ marginLeft: 20 }}>
                  Tạo email mới
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Table dataSource={listEmail} columns={columns} rowKey='name' />
    </div>
  );
};

export default TemplateEmail;
