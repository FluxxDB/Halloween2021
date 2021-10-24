import Rodux from "@rbxts/rodux";
import { LoadingActions } from "./actions/loadActions";
import loadingReducer, { LoadingReducer } from "./reducers/loadingReducer";

export interface RoduxStore {
	Loading: LoadingReducer;
}

export type StoreActions = LoadingActions;

const reducers = Rodux.combineReducers<RoduxStore, StoreActions>({
	Loading: loadingReducer,
});

type RoduxStoreThunk = Rodux.ThunkDispatcher<Rodux.Store<RoduxStore, StoreActions>, StoreActions>;
const store = new Rodux.Store<RoduxStore, StoreActions, RoduxStoreThunk>(reducers, undefined, [Rodux.thunkMiddleware]);

export type RoduxStoreType = typeof store;
export default store;
