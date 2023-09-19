import React, { useEffect, useState } from 'react';
import { getAstablishContract } from 'src/features/establish/establishSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import '../contract/contract.scss';
import { Form, Input, Button, DatePicker, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetRoomTenantDetail } from 'src/api/room';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { addContract, getContractByIdRoom, updateContract, uploadImageContract } from 'src/api/contract';
import { getInfoCustomer } from 'src/api/establish';
import { getHouseId } from 'src/api/house';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { log } from '@antv/g2plot/lib/utils';
import axios from 'axios';

const Contract = ({ houseid, setActiveTab }: any) => {
  const { roomId } = useParams();
  const [roomTenant, setRoomTenant] = useState<any>();
  const [host, setHost] = useState<any>();
  const [house, setHouse] = useState<any>();
  const [formValue, setFormValue] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [printData, setPrintData] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
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

      // setFormValue({
      //   id: data.id,
      //   expiry: data?.expiry,
      //   contractDate: moment(data?.contractdate),
      //   contractExpir: moment(data?.contractexpir),
      // });
    };
    getContract();
    getHost();
    getHouse();
    getRoomTenant();
  }, []);
  const establishData = useAppSelector((state: any) => state.establish.value);
  const renderContract = (obj: any) => {
    const sampleContract = establishData?.result?.samplecontract;
    const rvSampleContract = sampleContract?.replaceAll(/\\"/g, '"');
    const upperCaseFULLNAMECUSTOMER = host?.result?.name.toUpperCase();
    const upperCaseCUSTOMERNAMEROOMRENT = roomTenant?.name.toUpperCase();
    console.log(host?.result?.address);
    console.log(roomTenant);

    const dataContract: any = {
      '@ContrasctDate': moment(obj?.contractDate).format('DD/MM/YYYY'),
      '@ContractDateDay': moment(obj?.contractDate).format('DD'),
      '@ContractNo': '',
      '@ContractDateMonth': moment(obj?.contractDate).format('MM'),
      '@ContractDateYear': moment(obj?.contractDate).format('YYYY'),
      '@AddressCustomer': house?.result?.address,
      '@FullNameCustomer': host?.result?.name,
      '@BirthdayCustomerConfig': moment(host?.result?.bod).format('DD/MM/YYYY'),
      '@AddressHost': host?.result?.address,
      '@TelephoneCustomer': host?.result?.phone,
      '@CustomerNameRoomRent': roomTenant?.name,
      '@BirthdayRoomRent': moment(roomTenant?.bod).format('DD/MM/YYYY'),
      '@IDCARDNORoomRent': roomTenant?.cccd,
      '@DateIssueRoomRent': moment(roomTenant?.daterangecccd).format('DD/MM/YYYY'),
      '@PlaceIssueRoomRent': roomTenant?.issuedcccdby,
      '@AddressRoomRentasdasd': roomTenant?.address,
      '@TelephoneRoomRent': roomTenant?.phone,
      '@RoomName': roomTenant?.nameroom,
      '@AdressArea': house?.result?.address,
      '@ContractMonths': obj?.expiry,
      '@BeginRent': moment(obj?.contractDate).format('DD/MM/YYYY'),
      '@RoomAmount': Number(roomTenant?.price).toLocaleString('VND'),
      '@PayType': '',
      '@DepositAmount': Number(roomTenant?.deposit).toLocaleString('VND'),
      '@ProvinceName': '',
      '@FULLNAMECUSTOMER': upperCaseFULLNAMECUSTOMER,
      '@CUSTOMERNAMEROOMRENT': upperCaseCUSTOMERNAMEROOMRENT,
    };

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
  // useEffect(() => {
  //   const reRender = () => {
  //     renderContract();
  //   };

  //   const getRoomTenant = async () => {
  //     const { data } = await apiGetRoomTenantDetail(roomId);

  //     setRoomTenant(data);
  //   };

  //   const getHost = async () => {
  //     const { data } = await getInfoCustomer();
  //     setHost(data);
  //   };

  //   const getHouse = async () => {
  //     const { data } = await getHouseId(houseid);

  //     setHouse(data);
  //   };
  //   reRender();
  //   getHost();
  //   getHouse();
  //   getRoomTenant();
  // }, [formValue]);

  const onFinish = async (values: any) => {
    await renderContract(values);
    const dataPost = {
      customerId: roomTenant?.customerid,
      roomId: roomId ? +roomId : '',
      contractDate: moment(values.contractDate).format('YYYY-MM-DD'),
      contractExpir: moment(values.contractExpir).format('YYYY-MM-DD'),
      expiry: values.expiry,
    };

    const htmlInput: any = document.querySelector('.ql-editor');
    htmlInput.removeAttribute('hidden');
    const divHeight = htmlInput.clientHeight;
    const divWidth = htmlInput.clientWidth;
    console.log(divHeight, divWidth);
    const ratio = divHeight / divWidth;
    const canvas = await html2canvas(htmlInput);
    setLoading(true);
    htmlInput.setAttribute('hidden', 'true');
    const image: any = canvas.toDataURL('image/png', 1.0);

    const file = new File([image], 'image_thai.png', { type: 'image/png' });
    console.log(file);
    // const response = await uploadImageContract(file);

    const CLOUDINARY_PRESET = 'gtn4lbpo';
    const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/cokukongu/image/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
      headers: {
        'Content-Type': 'application/form-data',
      },
    });
    const imgLink = data.url;
    try {
      const response = await addContract({ ...dataPost, link: imgLink });
      if (response) {
        setLoading(false);
        toast.success('Thành công');
        setActiveTab('3');
      }
    } catch (error: any) {
      if (error?.response?.data?.message === 'Only Contract With Room') {
        const id = contract?.id;

        const response = await updateContract({ ...dataPost, link: imgLink }, id);
        if (response) {
          setLoading(false);
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
    const divHeight = htmlInput.clientHeight;
    const divWidth = htmlInput.clientWidth;
    console.log(divHeight, divWidth);

    const ratio = divHeight / divWidth;
    html2canvas(htmlInput, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a3');

      const width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();
      height = ratio * width;

      pdf.addImage(imgData, 'png', 0, 8, width, height);
      const blob = pdf.output('blob');
      console.log(blob);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
    htmlInput.setAttribute('hidden', 'true');
  };
  return (
    <Spin spinning={loading}>
      <div>
        <span className='font-medium text-slate-500 py-2'>
          Các thông tin nhập ở đây sẽ được sử dụng cho việc xuất/ in hợp đồng thuê phòng.
        </span>
        <div className='ml-3 mr-3'>
          <Form action='' form={form} onFinish={onFinish}>
            <div className='grid lg:my-4 lg:grid-cols-[150px_1fr] sm:grid-cols-1 sm:gap-y-3'>
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
            <div className='grid lg:my-4 lg:grid-cols-[120px_1fr_150px_1fr] lg:gap-8 sm:grid-cols-1 sm:gap-y-3'>
              <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
                Ngày hợp đồng
              </label>
              <Form.Item
                className='w-full'
                name='contractDate'
                rules={[{ required: true, message: 'Không để trống ngày hợp đồng' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <label htmlFor='' className='w-48 text-base font-medium text-slate-500'>
                Ngày kết thúc HĐ
              </label>

              <Form.Item
                className='w-full'
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
                  const a = form.getFieldsValue();
                  await renderContract(a);
                  await handleExportPDF();
                }}
              >
                Xem trước hợp đồng
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className='ql-editor ' hidden>
          {parse(printData ? printData : '')}
        </div>
        <ToastContainer />
      </div>
    </Spin>
  );
};

export default Contract;
