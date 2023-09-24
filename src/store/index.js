import {configureStore} from "@reduxjs/toolkit";
import siteDataReducer from "./reducers/siteDataReducer.js";

export const store = configureStore({
    reducer: {
        siteData: siteDataReducer
    }
})