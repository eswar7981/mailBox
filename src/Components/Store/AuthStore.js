const { createSlice } = require("@reduxjs/toolkit")

const initialAuthState={mode:'login'}


const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        setLogin(state){
    
            state.mode='login'
        },
        setSignUp(state){
            state.mode='signUp'
        }

    }
})

export const authActions=authSlice.actions
export default authSlice.reducer
