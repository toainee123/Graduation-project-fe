import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface initialType {
  show: true | false;
  component: any;
  functionHandle: any;
  title: string;
  btnName: string;
}

const initialState: Required<initialType> = {
  show: false,
  component: null,
  functionHandle: null,
  title: '',
  btnName: '',
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    resetState(state) {
      state = initialState;
    },
    showDialog(state) {
      state.show = true;
    },
    hideDialog(state) {
      state.show = false;
      state.component = null;
      state.functionHandle = null;
      state.title = '';
      state.btnName = '';
    },

    changeDialogContentAndHandle(state, action) {      
      state.component = action.payload.component;
      state.functionHandle = action.payload.functionHandle;
      state.title = action.payload.title;
      state.btnName = action.payload.btnName;
    },
  },
});

export const dialogActions = dialogSlice.actions;

export const selectShowDialog = (state: RootState) => state.dialog.show;
export const selectComponentDialog = (state: RootState) => state.dialog.component;
export const selectFunctionHandleDialog = (state: RootState) => state.dialog.functionHandle;
export const selectTitleDialog = (state: RootState) => state.dialog.title;
export const selectBtnNameDialog = (state: RootState) => state.dialog.btnName;

const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
