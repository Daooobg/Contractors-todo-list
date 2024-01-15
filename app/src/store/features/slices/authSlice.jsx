import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('userData')) || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser(state, action) {
            const user = Object.assign({}, action.payload);
            state.user = action.payload;
            localStorage.setItem('userData', JSON.stringify(user));
        },
        removeUser(state) {
            state.user = null;
            localStorage.removeItem('userData');
        },
    },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
