import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UsersStore {
    value: string;
}

const initialState: UsersStore = {
    value: ''
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const usersActions = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.value

export default usersSlice.reducer