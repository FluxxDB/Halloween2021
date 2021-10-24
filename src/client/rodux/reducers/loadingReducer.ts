import Rodux, { createReducer } from "@rbxts/rodux";
import { LoadingActionName, LoadingActions } from "../actions/loadActions";

export interface LoadingReducer {
	firstLoad: boolean;
	skipped: boolean;
	beingLoaded: string | unknown;
	totalAssets: Array<Instance>;
}

const initialState: LoadingReducer = {
	firstLoad: true,
	skipped: false,
	beingLoaded: undefined,
	totalAssets: [],
};

const actions: Rodux.ActionHandlers<LoadingReducer, LoadingActions> = {
	[LoadingActionName.Loaded]: (state) => {
		return { ...state, firstLoad: false };
	},
	[LoadingActionName.Skip]: (state) => {
		return { ...state, skipped: true };
	},
	[LoadingActionName.AddAssets]: (state, { assets }) => {
		return { ...state, totalAssets: [...state.totalAssets, ...assets] };
	},
};

const loadingReducer = createReducer(initialState, actions);
export default loadingReducer;
