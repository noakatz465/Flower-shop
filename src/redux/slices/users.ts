import { createSlice } from "@reduxjs/toolkit";
import { FlowerModel } from "../../models/flower.model";

interface User {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    itemInCart: number,
    items: FlowerModel[],
    loggedIn: boolean
}
const usersSlice = createSlice({
    initialState: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        itemInCart: 0,
        items: [],
        loggedIn: false
    },
    name: 'myUser',
    reducers: {
        addUser: (state: User, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.itemInCart = action.payload.itemInCart;
            state.items = action.payload.items;
            state.loggedIn = true
        },
        addItem: (state: User, action) => {
            state.itemInCart += 1;
            state.items.push(action.payload);
        },
        removeItem: (state: User, action) => {
            state.itemInCart -= 1;
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        disconnectUser: (state: User)=>{
            state.firstName = '';
            state.lastName = '';
            state.phone = '';
            state.email = '';
            state.password = '';
            state.itemInCart = 0;
            state.items = [];
            state.loggedIn = false
        }
    }
})

export const { addItem, removeItem, addUser, disconnectUser } = usersSlice.actions;
export default usersSlice.reducer;