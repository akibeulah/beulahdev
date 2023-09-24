import {createSlice} from "@reduxjs/toolkit";

const quotesArray = [
    {
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        quote: "Each project you complete is a brick in the foundation of your experience, and the more you build, the higher you can reach.",
        author: "Naveen Jain"
    }
];


const initialState = {
    landingPageFocus: "about",
    quotes: quotesArray,
    projects: [],
    experience: []
}

const siteDataReducer = createSlice({
    name: "siteData",
    initialState: initialState,
    reducers: {
        updateSiteData: (state, action) => {
            return {...state, [action.payload.name]: action.payload.value}
        }
    }
})

export const {
    updateSiteData
} = siteDataReducer.actions
export default siteDataReducer.reducer