import Rodux from "@rbxts/rodux";
import { CameraActions, cameraReducer, ICameraReducer } from "./reducers/camera-reducer";
import { IGameReducer, GameActions, gameReducer } from "./reducers/game-reducer";
import { ILoadingReducer, LoadingActions, loadingReducer } from "./reducers/loading-reducer";

export interface IClientStore {
    gameState: IGameReducer;
    loadingState: ILoadingReducer;
    cameraState: ICameraReducer;
}
export type StoreActions = GameActions | LoadingActions | CameraActions;

export const StoreReducer = Rodux.combineReducers<IClientStore, StoreActions>({
    gameState: gameReducer,
    loadingState: loadingReducer,
    cameraState: cameraReducer,
});

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(StoreReducer, {});
