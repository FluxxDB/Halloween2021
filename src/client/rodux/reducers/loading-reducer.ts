import Rodux from "@rbxts/rodux";
import { ActionSetAssetSize, ActionSetIndex } from "../actions/loading-actions";

export interface ILoadingReducer {
    assetSize: number;
    index: number;
}

const InitialState: ILoadingReducer = {
    assetSize: 1,
    index: 0,
};

export type LoadingActions = ActionSetAssetSize | ActionSetIndex;

export const loadingReducer = Rodux.createReducer<ILoadingReducer, LoadingActions>(InitialState, {
    SetAssetSize: (state, action) => {
        return { ...state, assetSize: action.assetSize };
    },
    SetIndex: (state, action) => {
        return { ...state, index: action.index };
    },
});
