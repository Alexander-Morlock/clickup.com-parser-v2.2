import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { afterDispatchMiddleware } from "./middlewares/afterDispatchMiddleware";
import reducers from "./reducers";

const rootReducer = combineReducers(reducers);

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(afterDispatchMiddleware))
);

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;