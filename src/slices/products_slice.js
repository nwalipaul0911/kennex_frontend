import { createSlice } from "@reduxjs/toolkit";
const initialStateValue = {
  value : []
}
const ProductSlice = createSlice({
  name: 'product',
  initialState : initialStateValue,
  reducers: {
    setProducts : (state, action)=>{
      state.value = action.payload
    }
  }
})

export const { setProducts } = ProductSlice.actions
export default ProductSlice.reducer;