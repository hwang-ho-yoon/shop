import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

let cartProduct = createSlice({
    name : 'cartProduct',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, action) {
            let findProduct = state.find((element)=>element.id == action.payload);
            findProduct.count += 1
        },
        changeProduct(state, action) {
            state.push(action.payload);
        }
    }
})
export let {changeCount, changeProduct} = cartProduct.actions;

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cartProduct : cartProduct.reducer
  }
})