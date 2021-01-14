import { combineReducers } from "redux";
import storeNameReducer from "./storeNameReducer";
import themeReducer from "./themeReducer";

export default combineReducers({ 
    theme : themeReducer, 
    storeName :storeNameReducer 
});