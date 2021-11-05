import Rodux from "@rbxts/rodux";
import { Scene } from "types/enum/scene";
import { ActionSetCorruption } from "../actions/corruption-actions";
import { ActionSetScene } from "../actions/scene-actions";

export interface IGameReducer {
    openScene: Scene;
    corruption: number;
}

const InitialState: IGameReducer = {
    openScene: Scene.Menu,
    corruption: 99,
};

export type GameActions = ActionSetScene | ActionSetCorruption;

export const gameReducer = Rodux.createReducer<IGameReducer, GameActions>(InitialState, {
    SetScene: (state, action) => {
        return {
            ...state,
            openScene: action.scene,
        };
    },
    SetCorruption: (state, action) => {
        return {
            ...state,
            corruption: math.min(action.corruption, 99),
        };
    },
});
