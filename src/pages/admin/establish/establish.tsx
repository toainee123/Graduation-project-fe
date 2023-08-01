import React, { useEffect, useState } from 'react';
import './establish.scss';
import { RedoOutlined, SaveOutlined } from '@ant-design/icons';
import { Tabs, Form } from 'antd';
import '../../../../node_modules/antd/dist/antd.css';
import Inforuser from './Inforuser';
import Samplecontract from './Samplecontract';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { ToastContainer, toast } from 'react-toastify';
import Printform from './Printform';
import { updateAstablishContract } from 'src/features/establish/establishSlice';
import axios from 'axios';
import moment from 'moment';
import { getInfoCustomer, updateInfoCustomer } from 'src/api/establish';
type Props = {};

const Establish = (props: Props) => {
  const [fields, setFields] = useState<any>([]);
  useEffect(() => {
    const getUserInfor = async () => {
      const response = await getInfoCustomer();

      console.log(response.data.result);
      const data = response.data.result;
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

        // cccd
        {
          name: ['ci_number'],
          value: data.ci_number,
        },

        // {
        //   name: ['ci_datecreate'],
        //   value: moment(data.ci_datecreate),
        // },

        // {
        //   name: ['ci_placecreate'],
        //   value: data.ci_placecreate,
        // },

        {
          name: ['phone_number'],
          value: data.phone,
        },

        {
          name: ['birthday'],
          value: data.bod === null ? '' : moment(data.bod),
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
      phone: fields[3].value,
      bod: moment(fields[4].value).format('YYYY-MM-DD'),
      // cccd: fields[5].value,
    };
    console.log(dataSave);
    try {
      await updateInfoCustomer(dataSave);
      toast.success('Cập nhật  thành công');
    } catch (error) {
      toast.error('Cập nhật không thành công');
    }

    // const { data } = await axios.put('http://localhost:3001/customer_profile/1', dataSave);
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

    // {
    //   label: 'Mẫu tin nhắn SMS',
    //   key: '2',
    //   children: <Templatesms />,
    // },

    // {
    //   label: 'Mẫu in',
    //   key: '3',
    //   children: <Printform getSelectOption={handleGetSelect} />,
    // },

    // {
    //   label: 'Hợp đồng mẫu',
    //   key: '4',
    //   children: <Samplecontract />,
    // },
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
      <ToastContainer />
    </div>
  );
};

export default Establish;
