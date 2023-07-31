import React, { useEffect, useState } from 'react';
// import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './establish.scss';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { changeContentContract, getAstablishContract } from 'src/features/establish/establishSlice';

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
  const dt = useAppSelector((state: any) => state.establish.value);

  return (
    <div>
      <ReactQuill
        theme='snow'
        value={
          '<p class="ql-align-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p><p class="ql-align-center">Độc Lập - Tự Do - Hạnh Phúc</p><p class="ql-align-center">---oOo---&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p class="ql-align-center">&nbsp;&nbsp;&nbsp;<strong>HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ jiasdasd</strong></p><p class="ql-align-center"><strong>Số: @ContractNo&nbsp;Ngày: @ContrasctDate</strong></p><p class="ql-align-center"><br></p><p>-&nbsp;&nbsp;Căn cứ Bộ luật dân sự của nước Cộng hoà xã hội chủ nghĩa Việt nam có hiệu lực từ ngày 01/01/2006;</p><p>-&nbsp;&nbsp;Căn cứ nhu cầu và khả năng của hai bên,</p><p><em>Hôm nay, ngày @ContractDateDay</em>&nbsp;<em>tháng @ContractDateMonth</em>&nbsp;<em>&nbsp;năm @ContractDateYear</em>&nbsp;<em>tại địa chỉ @AddressCustomer, chúng tôi gồm có:</em></p><p><strong style="color: rgb(51, 51, 51);">BÊN A : BÊN CHO THUÊ</strong></p><p><strong>Ông/bà</strong>: @FullNameCustomer<span style="color: windowtext;">&nbsp;</span><strong>&nbsp;Năm sinh</strong>:&nbsp;@BirthdayCustomerConfig</p><p><strong>CMND số</strong>: @IDCARDNOCustomerConfig&nbsp;<span style="color: windowtext;">&nbsp;</span><strong>Ngày cấp:</strong>&nbsp;@DateIssueCustomerConfig<span style="color: windowtext;">&nbsp;</span><strong>Nơi cấp:</strong>&nbsp;@PlaceIssueCustomerConfig</p><p><strong>Địa chỉ thường trú:</strong>&nbsp;@AddressCustomerConfig</p><p><strong>Điện thoại:</strong>&nbsp;@TelephoneCustomer</p><p>&nbsp;</p><p><strong style="color: rgb(51, 51, 51);">BÊN B : BÊN THUÊ</strong></p><p><strong>Ông/bà:</strong>&nbsp;@CustomerNameRoomRent<span style="color: windowtext;">&nbsp;</span><strong>Năm sinh:</strong>&nbsp;@BirthdayRoomRent</p><p><strong>CMND số:</strong>&nbsp;@IDCARDNORoomRent&nbsp;<strong>Ngày cấp:</strong>&nbsp;@DateIssueRoomRent&nbsp;<strong>Nơi cấp:</strong>&nbsp;@PlaceIssueRoomRent</p><p><strong>Địa chỉ thường trú:</strong>&nbsp;@AddressRoomRentasdasd</p><p><strong>Điện thoại:</strong>&nbsp;@TelephoneRoomRent</p><p>Hai bên cùng thỏa thuận ký hợp đồng với những nội dung sau:</p><p><strong>Điều 1:</strong></p><ul><li>Bên A đồng ý cho bên B thuê phòng trọ số @RoomName&nbsp;thuộc địa chỉ: @AdressArea</li><li>Thời hạn thuê phòng trọ là 12 tháng kể từ ngày @BeginRent</li></ul><p><strong>Điều 2 :</strong></p><ul><li>Giá tiền thuê phòng trọ là @RoomAmount&nbsp;đồng/tháng</li></ul><p>(<em>Bằng chữ: @RoomAmountText</em>)</p><ul><li>Tiền thuê nhà bên B thanh toán cho bên A từ ngày @PayType Tây hàng tháng.</li><li>Bên B đặt tiền thế chân trước @DepositAmount&nbsp;đồng&nbsp;</li></ul><p>(<em>Bằng chữ : @DepositAmountText</em>)&nbsp;cho bên A.</p><p>Tiền thế chân sẽ được trả lại đầy đủ cho bên thuê (Bên B) khi hết hợp đồng thuê phòng trọ nêu trên và thanh toán đầy đủ tiền điện, nước, phí dịch vụ và các khoản khác liên quan.</p><ul><li>Bên B ngưng hợp đồng trước thời hạn thì phải chịu mất tiền thế chân.</li><li>Bên A ngưng hợp đồng (lấy lại nhà) trước thời hạn thì bồi thường gấp đôi số tiền bên B đã thế chân.</li></ul><p><strong>Điều 3 :</strong>&nbsp;Trách nhiệm bên A.</p><ul><li>Giao phòng trọ, trang thiết bị trong phòng trọ cho bên B đúng ngày ký hợp đồng.</li><li>Hướng dẫn bên B chấp hành đúng các quy định của địa phương, hoàn tất mọi thủ tục giấy tờ đăng ký tạm trú cho bên B.</li></ul><p>&nbsp;</p><p><strong>Điều 4 :</strong>&nbsp;Trách nhiệm bên B.</p><ul><li>Trả tiền thuê phòng trọ hàng tháng theo hợp đồng.</li><li>Sử dụng đúng mục đích thuê phòng trọ, khi cần sữa chữa, cải tạo theo yêu cầu sử dụng riêng phải được sự đồng ý của bên A.</li><li>Đồ đạt trang thiết bị trong phòng trọ phải có trách nhiệm bảo quản cẩn thận không làm hư hỏng mất mát.</li></ul><p><strong>Điều 5:</strong>&nbsp;Điều khoản chung.</p><ul><li>Bên A và bên B thực hiện đúng các điều khoản ghi trong hợp đồng.</li><li>Trường hợp có tranh chấp hoặc một bên vi phạm hợp đồng thì hai bên cùng nhau bàn bạc giải quyết, nếu không giải quyết được thì yêu cầu cơ quan có thẩm quyền giải quyết.</li><li>Hợp đồng được lập thành hai (02) bản có giá trị ngang nhau, mỗi bên giữ một (01) bản</li></ul><p>&nbsp;</p><p class="ql-align-right">@ProvinceName, ngày @ContractDateDay&nbsp;tháng @ContractDateMonth&nbsp;năm @ContractDateYear</p><p><strong>&nbsp;</strong></p><p class="ql-align-center"><strong>BÊN A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BÊN B</strong></p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">&nbsp;</p><p class="ql-align-center">&nbsp;<strong>@FULLNAMECUSTOMERNAME</strong><span style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><strong style="color: rgb(0, 0, 0);">@CUSTOMERNAMEROOMRENT&nbsp;</strong><span style="color: red;">&nbsp;&nbsp;&nbsp;&nbsp;</span></p><h1 class="ql-align-center"><br></h1>'
        }
        onChange={(e: any) => {
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
