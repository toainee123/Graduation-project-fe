import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './establish.scss';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { changeContentContract, getAstablishContract } from 'src/features/establish/establishSlice';
// import { changeContentContract, getAstablishContract } from 'src/features/astablish/astablishSlice';
type Props = {};

const Samplecontract = (props: Props) => {
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

  const [value, setValue] = useState('');

  // props.handleSave();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAstablishContract());
  }, []);
  const dt = useAppSelector((state) => state.establish.value);

  return (
    <div>
      <ReactQuill
        theme='snow'
        value={dt.sample_contract}
        onChange={(e) => {
          const obbj = { id: dt.id, sample_contract: e };
          console.log(obbj);

          dispatch(changeContentContract(obbj));
        }}
        modules={modules}
        className='rich-text'
      />
      <div className='note'>
        <div className='note--title'>
          <p>Lưu ý: Các tham số có kí hiệu @ ở trước vui lòng không đổi</p>
          <span>Các thông số có thể sử dụng</span>
        </div>
        <div className='note--content'>
          <table className='customers'>
            <thead>
              <tr>
                <th>Thông số</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>@ContractNo</td>
                <td>Số hợp đồng</td>
              </tr>
              <tr>
                <td>@ContractDate</td>
                <td>Ngày hợp đồng đầy đủ </td>
              </tr>
              <tr>
                <td>@ContractDateDay</td>
                <td>Ngày hợp đồng</td>
              </tr>
              <tr>
                <td>@ContractDateMonth</td>
                <td>Tháng hợp đồng</td>
              </tr>
              <tr>
                <td>@ContractDateYear</td>
                <td> Năm hợp đồng</td>
              </tr>
              <tr>
                <td>@AddressCustomer</td>
                <td> Địa chỉ nhà trọ</td>
              </tr>
              <tr>
                <td>@FullNameCustomer</td>
                <td>Tên đầy đủ chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@BirthdayCustomerConfig</td>
                <td> Ngày sinh chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@IDCARDNOCustomerConfig</td>
                <td> Số CMND/CCCD chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@DateIssueCustomerConfig</td>
                <td> Ngày cấp CMND/CCCD chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@PlaceIssueCustomerConfig</td>
                <td>Nơi cấp CMND/CCCD chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@AddressCustomerConfig</td>
                <td> Địa chỉ thường trú của chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@TelephoneCustomer</td>
                <td>Điện thoại chủ nhà trọ</td>
              </tr>
              <tr>
                <td>@CustomerNameRoomRent</td>
                <td>Họ tên người thuê</td>
              </tr>
              <tr>
                <td>@BirthdayRoomRent</td>
                <td> Ngày sinh người thuê</td>
              </tr>
              <tr>
                <td>@IDCARDNORoomRent</td>
                <td>Số CMND/ CCCD người thuê</td>
              </tr>
              <tr>
                <td>@DateIssueRoomRent</td>
                <td>Ngày cấp CMND/ CCCD người thuê</td>
              </tr>
              <tr>
                <td>@PlaceIssueRoomRent</td>
                <td> Nơi cấp CMND/ CCCD người thuê</td>
              </tr>

              <tr>
                <td>@AddressRoomRent</td>
                <td> Địa chỉ thường trú người thuê</td>
              </tr>

              <tr>
                <td>@TelephoneRoomRent</td>
                <td> Số điện thoại người thuê</td>
              </tr>

              <tr>
                <td>@RoomName</td>
                <td> Thuê phòng số</td>
              </tr>

              <tr>
                <td>@AdressArea</td>
                <td> Địa chỉ nhà trọ thuê</td>
              </tr>

              <tr>
                <td>@BeginRent</td>
                <td> Ngày bắt đầu thuê</td>
              </tr>

              <tr>
                <td>@ContractMonths</td>
                <td>Số tháng thuê</td>
              </tr>

              <tr>
                <td>@RoomAmount</td>
                <td> Số tiền phòng</td>
              </tr>
              <tr>
                <td>@RoomAmountText</td>
                <td>Số tiền phòng bằng chữ</td>
              </tr>
              <tr>
                <td>@PayType</td>
                <td> Kỳ thanh toán</td>
              </tr>
              <tr>
                <td>@PayXMonths</td>
                <td>Thanh toán mỗi lần x tháng</td>
              </tr>

              <tr>
                <td>@DepositAmount</td>
                <td>Số tiền đặt cọc</td>
              </tr>

              <tr>
                <td>@DepositAmountText</td>
                <td>Số tiền đặt cọc bằng chữ</td>
              </tr>

              <tr>
                <td>@ProvinceName</td>
                <td>Tỉnh/ thành phố địa chỉ nhà trọ</td>
              </tr>
              <tr>
                <td>@FULLNAMECUSTOMERNAME</td>
                <td> Họ tên người cho thuê viết hoa</td>
              </tr>
              <tr>
                <td>@CUSTOMERNAMEROOMRENT</td>
                <td> Họ tên người thuê viết hoa</td>
              </tr>

              <tr>
                <td>@RemarksRoomRent</td>
                <td> Ghi chú khác</td>
              </tr>

              <tr>
                <td>@PersonIntroduce</td>
                <td> Người giới thiệu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Samplecontract;
