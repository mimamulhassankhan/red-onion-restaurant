import { createStore } from "redux";
import { storeReducer } from "../Reducers/StoreReducer";

export const shopStore = createStore(storeReducer);