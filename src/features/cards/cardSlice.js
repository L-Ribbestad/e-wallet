import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsername = createAsyncThunk("cards/getUsername", async () => {
    let response = await axios.get("https://randomuser.me/api/");
    return response.data;
})
const cardSlice = createSlice({
    name: "cards",
    initialState: {
      cardsArr: [{
        vendor: "Amex",
        cardNumber: "1234567891011121",
        cardHolder: "",
        expireMonth: "10",
        expireYear: "25",
        ccv: "321",
        active: true
        }],
    },
    reducers: {
        addCard : (state, action) => {
            state.cardsArr.push(action.payload);
        },
        removeCard: (state, action)=>{
            if(state.cardsArr.length === 1){
                alert("Det måste finnas minst ett kort i din plånbok.")
            } else{
                state.cardsArr.splice(action.payload, 1);
            }
        },
    },
    extraReducers: {
        [getUsername.fulfilled]: (state, action) => {
            let user = action.payload;
            let {first, last} = user.results[0].name;
            state.cardsArr[0].cardHolder = `${first} ${last}`.toUpperCase();
        }
    },
  });

  export default cardSlice.reducer;

  export const { addCard, removeCard } = cardSlice.actions;
  