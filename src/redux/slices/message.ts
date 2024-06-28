import { createSlice } from "@reduxjs/toolkit";

interface Message {
    type: 'success' | 'error' |null;
    text: string |null;
}

const initialState: Message = {
    type: null,
    text: null
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.type = action.payload.type;
            state.text = action.payload.text;
        },
        hideMessage: (state) => {
            state.type = null;
            state.text = null;
        }
    }
});

export const { showMessage, hideMessage } = messageSlice.actions;
export default messageSlice.reducer;
