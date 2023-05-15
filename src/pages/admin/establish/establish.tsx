import React from 'react';
import './establish.scss';
import { RedoOutlined, SaveOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import '../../../../node_modules/antd/dist/antd.css';
import Inforuser from './Inforuser';
import Samplecontract from './Samplecontract';
type Props = {};

const establish = (props: Props) => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const listItem = [
    {
      label: 'Thông tin chủ trọ',
      key: '1',
      children: <Inforuser />,
    },

    {
      label: 'Thông tin gói',
      key: '2',
      children: 'Thông tin chủ trọ',
    },

    {
      label: 'Mẫu tin nhắn SMS',
      key: '3',
      children: 'Mẫu tin nhắn SMS',
    },

    {
      label: 'Mẫu in',
      key: '4',
      children: 'Mẫu tin nhắn SMS',
    },

    {
      label: 'Hợp đồng mẫu',
      key: '5',
      children: <Samplecontract />,
    },

    {
      label: 'Đơn giá điện nước bậc thang',
      key: '6',
      children: 'Mẫu tin nhắn SMS',
    },
  ];
  return (
    <div className='es-container'>
      <div className='title'>
        <div className='title--name'>
          <h2>
            <strong>Cấu hình</strong>
          </h2>
        </div>
        <div className='title--button flex items-center'>
          <button className='title-button-retype bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '>
            <RedoOutlined className='icon-btn' /> Nhập lại
          </button>
          <button className='title-button-save bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            <SaveOutlined className='icon-btn' /> Lưu
          </button>
        </div>
      </div>
      <div className='content'>
        <Tabs onChange={onChange} type='card' items={listItem} />
      </div>
    </div>
  );
};

export default establish;
