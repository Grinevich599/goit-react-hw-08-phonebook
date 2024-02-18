import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { $authInstance } from './auth/authSlice';

export const apiGetContact = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await $authInstance.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    console.log(contactData);
    try {
      const { data } = await $authInstance.post('/contacts', contactData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRemoveContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await $authInstance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(apiGetContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(apiRemoveContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(
          apiGetContact.pending,
          apiAddContact.pending,
          apiRemoveContact.pending
        ),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiGetContact.rejected,
          apiAddContact.rejected,
          apiRemoveContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;
