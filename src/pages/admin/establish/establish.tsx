import React, { useEffect, useState } from 'react';
import './establish.scss';
import { RedoOutlined, SaveOutlined } from '@ant-design/icons';
import { Tabs, Form } from 'antd';
import '../../../../node_modules/antd/dist/antd.css';
import Inforuser from './Inforuser';
import Samplecontract from './Samplecontract';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { toast } from 'react-toastify';
import Printform from './Printform';
import Templatesms from './Templatesms';
import { updateAstablishContract } from 'src/features/establish/establishSlice';
import axios from 'axios';
import moment from 'moment';
type Props = {};

const Establish = (props: Props) => {
  const [fields, setFields] = useState<any>([]);
  useEffect(() => {
    const getUserInfor = async () => {
      const { data } = await axios.get('http://localhost:3001/customer_profile/1');
      setFields([
        {
          name: ['fullname'],
          value: data.name,
        },

        {
          name: ['address'],
          value: data.address,
        },

        {
          name: ['email'],
          value: data.email,
        },

        {
          name: ['ci_number'],
          value: data.ci_number,
        },

        {
          name: ['ci_datecreate'],
          value: moment(data.ci_datecreate),
        },

        {
          name: ['ci_placecreate'],
          value: data.ci_placecreate,
        },

        {
          name: ['phone_number'],
          value: data.phone_number,
        },

        {
          name: ['birthday'],
          value: moment(data.birthday),
        },
      ]);
    };
    getUserInfor();
  }, []);
  const onChange = (key: string) => {
    setTab(key);
  };

  const dispatch = useAppDispatch();

  const [tab, setTab] = useState<string>('1');
  const sample_contract = useAppSelector((state: any) => state.establish.value);
  const saveContract = () => {
    dispatch(updateAstablishContract(sample_contract));
  };

  const handleSave = () => {
    switch (tab) {
      case '1':
        handleSaveInfor();
        break;
      case '4':
        saveContract();
        break;

      default:
        break;
    }
  };

  const handleGetSelect = (e: any) => {
    console.log(e);
  };
  const handleSaveInfor = async () => {
    console.log(fields);

    const dataSave = {
      name: fields[0].value,
      address: fields[1].value,
      email: fields[2].value,
      ci_number: fields[3].value,
      ci_placecreate: fields[5].value,
      ci_datecreate: fields[4].value,
      phone_number: fields[6].value,
      birthday: fields[7].value,
    };
    const { data } = await axios.put('http://localhost:3001/customer_profile/1', dataSave);
  };
  const listItem = [
    {
      label: 'Thông tin chủ trọ',
      key: '1',
      children: (
        <Inforuser
          fields={fields}
          onChange={(newFields: any) => {
            setFields(newFields);
          }}
        />
      ),
    },

    {
      label: 'Mẫu tin nhắn SMS',
      key: '2',
      children: <Templatesms />,
    },

    {
      label: 'Mẫu in',
      key: '3',
      children: <Printform getSelectOption={handleGetSelect} />,
    },

    {
      label: 'Hợp đồng mẫu',
      key: '4',
      children: <Samplecontract />,
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
          <button
            onClick={handleSave}
            className='title-button-save bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
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

export default Establish;
