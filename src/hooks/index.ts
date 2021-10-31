import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IAppDispatch, IRootState } from "../redux";

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<IAppDispatch>();
