import React from 'react';
import { selectComponentDialog, selectShowDialog } from '../../../features/dialog/dialogSlice';
import { useAppSelector } from '../../../store/hooks';
import ResponseModal from '../responseModal/ResponseModal';

import './dialog.scss';

type Props = {};

const Dialog = (props: Props) => {
  const show = useAppSelector(selectShowDialog);
  const component = useAppSelector(selectComponentDialog);

  const dialogComponent: any = {
    MODAL: <ResponseModal />
  };

  return <> {show && <div className='containerDialog'>{dialogComponent[component]}</div>} </>;
};

export default Dialog;
