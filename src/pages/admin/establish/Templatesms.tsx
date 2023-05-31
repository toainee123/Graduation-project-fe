import React, { useState } from 'react';

type Props = {};

const Templatesms = (props: Props) => {
  const [value, setValue] = useState(
    'Xin chao @CustomerName, thong bao tien nha cua ban thang @MonthYear la @TotalAmount, vui long thanh toan som, xin cam on.'
  );

  const handleChange = (e: string) => {
    console.log(e);
  };
  return (
    <div>
      <div className='content_template_sms'>
        <textarea
          name=''
          id=''
          rows={10}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleChange(e.target.value);
          }}
        ></textarea>
        <span>Lưu ý: Các tham số có ký hiệu @ ở trước vui lòng không đổi.</span>
      </div>
    </div>
  );
};

export default Templatesms;
