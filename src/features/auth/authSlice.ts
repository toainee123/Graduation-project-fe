import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import { RootState } from '../../store/store';
import { localStorageConstants } from '../../utils/constants';
import { toast } from 'react-toastify';

interface UserState {
  body: any;
  loading: true | false;
  userRole: {} | any;
  accessToken: null | any;
  email: string | null,
  password: string | null
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchUser',
  async (payload: Partial<UserState>, { rejectWithValue }) => {
    const userLogin = { email: payload.email, password: payload.password }
    const response = await authApi.login(userLogin);
    const { data } = response;
    localStorage.setItem('access_token', JSON.stringify(data.accessToken));
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('email', JSON.stringify(data.email));
    toast.success('Đăng nhập thành công');
    return data;
  }
);



const roleLocal: any = localStorage.getItem(localStorageConstants.USER);


const initialState: Partial<UserState> = {
  loading: false,
  userRole: JSON.parse(roleLocal) || '',
  accessToken: localStorage.getItem(localStorageConstants.ACCESS_TOKEN) || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.userRole = {}
      state.accessToken = null
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        console.log(action.payload);

        state.loading = false;
        state.userRole = action.payload.role;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const AuthSliceAction = authSlice.actions

export const selectFetchUserLoading = (state: RootState) => state.auth.loading;
export const selectUserRole = (state: RootState) => state.auth.userRole.role;
export const selectUserToken = (state: RootState) => state.auth.accessToken;

const authReducer = authSlice.reducer;

export default authReducer;
