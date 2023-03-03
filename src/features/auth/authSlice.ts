import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/auth';
import { RootState } from '../../store/store';
import { localStorageConstants } from '../../utils/constants';

interface UserState {
  body: any;
  loading: true | false;
  userRole: {} | any;
  accessToken: null | any;
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchUser',
  async (payload: Partial<UserState>, { rejectWithValue }) => {
    try {
        const response = await authApi.login(payload);
        localStorage.setItem('access_token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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
        // debugger
        state.loading = false;
        state.userRole = action.payload.user;
        state.accessToken = action.payload.token;
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
