import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './establish.scss';
type Props = {};

const Samplecontract = (props: Props) => {
  const [value, setValue] = useState('');
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
  return (
    <div>
      <ReactQuill theme='snow' value={value} onChange={setValue} modules={modules} className='rich-text' />
      <div className='note'>
        <div className='note--title'>
          <p>Lưu ý: Các tham số có kí hiệu @ ở trước vui lòng không đổi</p>
          <span>Các thông số có thể sử dụng</span>
        </div>
        <div className='note--content'>
          <table className='customers'>
            <tr>
              <th>Thông số</th>
              <th>Mô tả</th>
            </tr>
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
              <td>@DateIssueCustomerConfig</td>
              <td> Ngày cấp CMND/CCCD chủ nhà trọ</td>
            </tr>
            <tr>
              <td>@DateIssueCustomerConfig</td>
              <td> Ngày cấp CMND/CCCD chủ nhà trọ</td>
            </tr>
            <tr>
              <td>@DateIssueCustomerConfig</td>
              <td> Ngày cấp CMND/CCCD chủ nhà trọ</td>
            </tr>
            <tr>
              <td>@DateIssueCustomerConfig</td>
              <td> Ngày cấp CMND/CCCD chủ nhà trọ</td>
            </tr>
            <tr>
              <td>@DateIssueCustomerConfig</td>
              <td> Ngày cấp CMND/CCCD chủ nhà trọ</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Samplecontract;
