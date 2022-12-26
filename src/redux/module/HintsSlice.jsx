import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = 'http://localhost:3001/hints';

const initialState = {
  hints: [],
  isLoading: false,
  error: null,
};

export const __getHints = createAsyncThunk(
  'GET_HINTS',
  async (_, thunkAPI) => {
    try {
      const data = await axios.get(serverUrl);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
});

export const __addHint = createAsyncThunk(
  'ADD_HINT',
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(serverUrl, payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const hintsSlice = createSlice({
  name: 'hints',
  initialState,
  reducers: {},
  extraReducers: {
    [__getHints.pending]: (state) => {
      state.isLoading = true;
    },
    [__getHints.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hints = action.payload;
    },
    [__getHints.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addHint.pending]: (state) => {
      state.isLoading = true;
    },
    [__addHint.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hints.push(action.payload);
    },
    [__addHint.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const hintsActions = hintsSlice.actions;
export default hintsSlice.reducer;
