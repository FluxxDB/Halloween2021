import Rodux from "@rbxts/rodux";
import { Scene } from "types/enum/scene";
import { ActionSetCorruption, ActionSetPulsing } from "../actions/corruption-actions";
import { ActionSetScene } from "../actions/scene-actions";

export interface IGameReducer {
    openScene: Scene;
    corruption: number;
    pulsing: boolean;
}

const InitialState: IGameReducer = {
    openScene: Scene.Game,
    corruption: 100,
    pulsing: false,
};

export type GameActions = ActionSetScene | ActionSetCorruption | ActionSetPulsing;

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
            corruption: action.corruption,
        };
    },
    SetPulsing: (state, action) => {
        return {
            ...state,
            pulsing: action.pulsing,
        };
    },
});
