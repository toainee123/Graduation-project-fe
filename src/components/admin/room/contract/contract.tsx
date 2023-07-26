import React, { useEffect, useState } from 'react';
import { getAstablishContract } from 'src/features/establish/establishSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import '../contract/contract.scss';
import { Form, Input, Button, DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import { addContract, apiGetRoomTenantDetail } from 'src/api/room';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const Contract = () => {
  const { roomId } = useParams();
  const [roomTenant, setRoomTenant] = useState<any>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAstablishContract());
    const getRoomTenant = async () => {
      const { data } = await apiGetRoomTenantDetail(roomId);

      setRoomTenant(data);
    };
    getRoomTenant();
  }, []);

  const establishData = useAppSelector((state: any) => state.establish.value);

  const sampleContract = establishData?.result?.samplecontract;
  const rvSampleContract = sampleContract?.replaceAll(/\\"/g, '"');
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      const dataPost = {
        customerId: roomTenant?.memberid,
        roomId: roomId ? +roomId : '',
        contractDate: moment(values.contractDate).format('YYYY-MM-DD'),
        contractExpir: moment(values.contractExpir).format('YYYY-MM-DD'),
        expiry: values.expiry,
      };

      const response = await addContract(values);
      if (response) {
        toast.success('Thành công');
      }
    } catch (error) {
      toast.error('Không thành công');
    }
  };
  return (
    <div>
      <span className='font-medium text-slate-500 py-2'>
        Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng.
      </span>
      <div className='ml-3 mr-3'>
        <Form action='' form={form} onFinish={onFinish}>
          <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 my-4'>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Số hợp đồng
            </label>
            <Form.Item className='lg:w-1/2 sm:w-full'>
              <Input />
            </Form.Item>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Thời gian hợp đồng
            </label>
            <Form.Item className='lg:w-1/2 sm:w-full' name='expiry'>
              <Input />
            </Form.Item>
          </div>
          <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 mb-4'>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Ngày hợp đồng
            </label>
            <Form.Item className='lg:w-1/2 sm:w-full' name='contractDate'>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Ngày kết thúc HĐ
            </label>
            <Form.Item className='lg:w-1/2 sm:w-full' name='contractExpir'>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <Form.Item>
            <Button htmlType='submit' style={{ width: '100%' }} type='primary'>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='ql-editor'>{parse(rvSampleContract ? rvSampleContract : '')}</div>
      <ToastContainer />
    </div>
  );
};

export default Contract;
