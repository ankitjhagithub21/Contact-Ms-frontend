import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: [],
  },
  reducers: {
    setContacts: (state, action) => {
      state.value = action.payload;
    },
    deleteContact: (state, action) => {
      state.value = state.value.filter(contact => contact._id !== action.payload);
    },
    updateContact: (state, action) => {
      const index = state.value.findIndex(contact => contact._id === action.payload._id);
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
  },
});

export const { setContacts, deleteContact, updateContact } = contactSlice.actions;

export default contactSlice.reducer;
