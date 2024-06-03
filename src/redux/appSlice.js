import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        open: false,
        emails: [],
        selectedMail: null,
        searchText:"",
        user:null
    },
    reducers: {
        setOpen: (state, action) => {
            //actions
            state.open = action.payload
        },
        setEmails: (state, action) => {
            //actions
            state.emails = action.payload
        },
        setSelectedEmail: (state, action) => {
            state.selectedMail = action.payload
        },
        setSearchText:(state,action)=>{
            state.searchText=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }

    }
})

export const { setOpen, setEmails, setSelectedEmail,setSearchText, setUser } = appSlice.actions;
export default appSlice.reducer;
