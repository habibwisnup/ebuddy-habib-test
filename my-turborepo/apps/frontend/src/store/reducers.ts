import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export default userSlice.reducer;
