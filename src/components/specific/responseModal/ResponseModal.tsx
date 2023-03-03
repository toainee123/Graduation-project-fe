import React from 'react';
import {
  dialogActions,
  selectBtnNameDialog,
  selectFunctionHandleDialog,
  selectTitleDialog,
} from '../../../features/dialog/dialogSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import './responseModal.scss';

type Props = {};

const ResponseModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitleDialog);
  const btnName = useAppSelector(selectBtnNameDialog);
  const functionHandle = useAppSelector(selectFunctionHandleDialog);

  const handleClose = () => {
    functionHandle && functionHandle();
    dispatch(dialogActions.hideDialog());
  };

  return (
    <div id='responseModal'>
      <h2 className=''>{title || 'Success'}</h2>
      <div className=''>
        <button className='response_btn' onClick={handleClose}>
          {/* {btnName || btnNameDialog || 'Xác nhận'} */}
          {btnName || 'Ok'}
        </button>
      </div>
    </div>
  );
};

export default ResponseModal;
