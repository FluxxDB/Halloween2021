import Rodux from "@rbxts/rodux";
import { IGameReducer, GameActions, gameReducer } from "./reducers/game-reducer";
import { ILoadingReducer, LoadingActions, loadingReducer } from "./reducers/loading-reducer";

export interface IClientStore {
    gameState: IGameReducer;
    loadingState: ILoadingReducer;
}
export type StoreActions = GameActions | LoadingActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
    gameState: gameReducer,
    loadingState: loadingReducer,
});

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {});
