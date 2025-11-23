import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'Notification',
  initialState: 'Notification',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    }
  }
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
