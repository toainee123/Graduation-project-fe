import React, { useEffect, useState } from 'react';
import { getAstablishContract } from 'src/features/establish/establishSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import '../contract/contract.scss';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { useParams } from 'react-router-dom';
import { apiGetRoomTenantDetail } from 'src/api/room';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { addContract, getContractByIdRoom, updateContract } from 'src/api/contract';
import { getInfoCustomer } from 'src/api/establish';
import { getHouseId } from 'src/api/house';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { log } from '@antv/g2plot/lib/utils';
import axios from 'axios';

const Contract = ({ houseid }: any) => {
  const { roomId } = useParams();
  const [roomTenant, setRoomTenant] = useState<any>();
  const [host, setHost] = useState<any>();
  const [house, setHouse] = useState<any>();
  const [formValue, setFormValue] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [printData, setPrintData] = useState('');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAstablishContract());
    const getRoomTenant = async () => {
      const { data } = await apiGetRoomTenantDetail(roomId);
      console.log(data);

      setRoomTenant(data);
    };

    const getHost = async () => {
      const { data } = await getInfoCustomer();
      setHost(data);
    };

    const getHouse = async () => {
      const { data } = await getHouseId(houseid);

      setHouse(data);
    };

    const getContract = async () => {
      const { data } = await getContractByIdRoom(roomId);
      console.log(roomId);

      form.setFieldsValue({
        expiry: data?.expiry,
        contractDate: moment(data?.contractdate),
        contractExpir: moment(data?.contractexpir),
      });

      setContract({
        id: data.id,
        expiry: data?.expiry,
        contractDate: moment(data?.contractdate),
        contractExpir: moment(data?.contractexpir),
      });

      setFormValue({
        id: data.id,
        expiry: data?.expiry,
        contractDate: moment(data?.contractdate),
        contractExpir: moment(data?.contractexpir),
      });
    };
    getContract();
    getHost();
    getHouse();
    getRoomTenant();
  }, []);
  const establishData = useAppSelector((state: any) => state.establish.value);
  const renderContract = () => {
    const sampleContract = establishData?.result?.samplecontract;
    const rvSampleContract = sampleContract?.replaceAll(/\\"/g, '"');
    const upperCaseFULLNAMECUSTOMER = host?.result?.name.toUpperCase();
    const upperCaseCUSTOMERNAMEROOMRENT = roomTenant?.name.toUpperCase();
    console.log(host?.result?.address);

    const dataContract: any = {
      '@ContrasctDate': moment(formValue?.contractDate).format('DD/MM/YYYY'),
      '@ContractDateDay': moment(formValue?.contractDate).format('DD'),
      '@ContractNo': '',
      '@ContractDateMonth': moment(formValue?.contractDate).format('MM'),
      '@ContractDateYear': moment(formValue?.contractDate).format('YYYY'),
      '@AddressCustomer': house?.result?.address,
      '@FullNameCustomer': host?.result?.name,
      '@BirthdayCustomerConfig': moment(host?.result?.bod).format('DD/MM/YYYY'),
      '@AddressHost': host?.result?.address,
      '@TelephoneCustomer': host?.result?.phone,
      '@CustomerNameRoomRent': roomTenant?.name,
      '@BirthdayRoomRent': moment(host?.bod).format('DD/MM/YYYY'),
      '@IDCARDNORoomRent': roomTenant?.cccd,
      '@DateIssueRoomRent': moment(roomTenant?.daterangecccd).format('DD/MM/YYYY'),
      '@PlaceIssueRoomRent': roomTenant?.issuedcccdby,
      '@AddressRoomRentasdasd': roomTenant?.address,
      '@TelephoneRoomRent': roomTenant?.phone,
      '@RoomName': roomTenant?.nameroom,
      '@AdressArea': house?.result?.address,
      '@ContractMonths': formValue?.expiry,
      '@BeginRent': moment(formValue?.contractDate).format('DD/MM/YYYY'),
      '@RoomAmount': Number(roomTenant?.price).toLocaleString('VND'),
      '@PayType': '',
      '@DepositAmount': Number(roomTenant?.deposit).toLocaleString('VND'),
      '@ProvinceName': '',
      '@FULLNAMECUSTOMER': upperCaseFULLNAMECUSTOMER,
      '@CUSTOMERNAMEROOMRENT': upperCaseCUSTOMERNAMEROOMRENT,
    };

    console.log(dataContract);

    // moment(roomTenant?.daterangecccd).format('DD/MM/YYYY')
    const newContract = rvSampleContract?.replaceAll(
      /@ContrasctDate|@ContractDateDay|@ContractDateMonth|@ContractDateYear|@AddressCustomer|@FullNameCustomer|@BirthdayCustomerConfig|@AddressHost|@ContractNo|@TelephoneCustomer|@CustomerNameRoomRent|@BirthdayRoomRent|@IDCARDNORoomRent|@DateIssueRoomRent|@PlaceIssueRoomRent|@AddressRoomRentasdasd|@TelephoneRoomRent|@RoomName|@AdressArea|@ContractMonths|@BeginRent|@RoomAmount|@PayType|@DepositAmount|@ProvinceName|@FULLNAMECUSTOMERNAME /gi,
      (matched: any) => {
        return dataContract[matched];
      }
    );
    setPrintData(newContract);
  };

  const CLOUDINARY_PRESET = 'gtn4lbpo';
  const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/cokukongu/auto/upload';
  useEffect(() => {
    const reRender = () => {
      renderContract();
    };
    reRender();
  }, [formValue]);

  const onFinish = async (values: any) => {
    setFormValue(values);
    const dataPost = {
      customerId: roomTenant?.customerid,
      roomId: roomId ? +roomId : '',
      contractDate: moment(values.contractDate).format('YYYY-MM-DD'),
      contractExpir: moment(values.contractExpir).format('YYYY-MM-DD'),
      expiry: values.expiry,
    };

    const htmlInput: any = document.querySelector('.ql-editor');
    htmlInput.removeAttribute('hidden');

    const canvas = await html2canvas(htmlInput);
    htmlInput.setAttribute('hidden', 'true');
    const image = canvas.toDataURL('image/png', 1.0);
    const pdf: any = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 208;
    const imgHeight = pdf.internal.pageSize.getHeight();
    pdf.margin = {
      horiz: 15,
      vert: 20,
    };
    pdf.addImage(image, 'PNG', 0, 0, imgWidth, imgHeight);
    const blob = pdf.output('blob');
    console.log(blob);
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
      headers: {
        'Content-Type': 'application/form-data',
      },
    });
    const imgUrl = data.url;
    try {
      const response = await addContract({ ...dataPost, link: imgUrl });
      if (response) {
        toast.success('Thành công');
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'Only Contract With Room') {
        const id = contract?.id;

        const response = await updateContract({ ...dataPost, link: imgUrl }, id);
        if (response) {
          toast.success('Câp nhật thành công');
        }
      }
    }

    // html2canvas(htmlInput, { logging: true, useCORS: true }).then(async (canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    // });
  };

  const handleExportPDF = () => {
    const htmlInput: any = document.querySelector('.ql-editor');
    htmlInput.removeAttribute('hidden');

    html2canvas(htmlInput, { logging: true, useCORS: true }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'png', 0, 8, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });

    htmlInput.setAttribute('hidden', 'true');
  };
  return (
    <div>
      <span className='font-medium text-slate-500 py-2'>
        Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng.
      </span>
      <div className='ml-3 mr-3'>
        <Form action='' form={form} onFinish={onFinish}>
          <div className='lg:flex  justify-start items-center  md:justify-start  my-4'>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Thời gian hợp đồng
            </label>
            <Form.Item
              className='lg:w-full sm:w-full'
              name='expiry'
              rules={[{ required: true, message: 'Không để trống thời gian hợp đồng' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className='lg:flex gap-12 justify-between items-center gap-8 md:justify-start gap-8 mb-4'>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Ngày hợp đồng
            </label>
            <Form.Item
              className='lg:w-1/2 sm:w-full'
              name='contractDate'
              rules={[{ required: true, message: 'Không để trống ngày hợp đồng' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
              Ngày kết thúc HĐ
            </label>

            <Form.Item
              className='lg:w-1/2 sm:w-full'
              rules={[{ required: true, message: 'Không để trống ngày kết thúc hợp đồng' }]}
              name='contractExpir'
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <Form.Item>
            <Button htmlType='submit' style={{ width: '100%' }} type='primary'>
              Lưu
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              className='mt-4'
              style={{ width: '100%' }}
              onClick={async () => {
                await renderContract();
                await handleExportPDF();
              }}
            >
              Xuất file PDF
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className='ql-editor ' hidden>
        {parse(printData ? printData : '')}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contract;
